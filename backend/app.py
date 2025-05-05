from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import requests
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")

# Configuración Flask
app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")])


# Configuración base de datos
DB_URL = "mysql+pymysql://flaskuser:flaskpass@db/flaskdb"
engine = create_engine(DB_URL, echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    text = Column(String(255))

Base.metadata.create_all(engine)

# Ruta principal con vista HTML
@app.route('/')
def index():
    return render_template('index.html')

# API: obtener mensajes
@app.route('/api/messages', methods=['GET'])
def get_messages():
    session = Session()
    messages = session.query(Message).all()
    result = [{"id": m.id, "text": m.text} for m in messages]
    session.close()
    return jsonify(result)

# API: crear mensaje
@app.route('/api/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    new_msg = Message(text=data['text'])
    session = Session()
    session.add(new_msg)
    session.commit()
    session.close()
    return jsonify({"message": "Mensaje guardado"}), 201

# API: saludo
@app.route('/api/echo', methods=['GET'])
def echo():
    name = request.args.get("name", "anónimo")
    return jsonify({"message": f"Hola, {name}!"})

# API: clima
@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get("city", "London")
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "city": city,
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
        })
    else:
        return jsonify({"error": "Ciudad no encontrada"}), 400

# Iniciar app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

