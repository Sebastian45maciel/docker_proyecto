# Usa la imagen oficial de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu backend
COPY ./ /app

# Instala las dependencias
RUN apt-get update && apt-get install -y default-mysql-client && apt-get clean

RUN pip install -r requirements.txt

# Expone el puerto de la aplicación Flask
EXPOSE 5000

# Comando para iniciar la app
# Copiar el script de espera al contenedor
COPY wait-for-db.sh /wait-for-db.sh

# Hacer que el script sea ejecutable dentro del contenedor (sin usar chmod en Windows)
RUN sed -i 's/\r$//' /wait-for-db.sh
  # Convierte los saltos de línea de Windows a Unix

# Usar el script de espera como comando de inicio
CMD ["/wait-for-db.sh"]

RUN adduser --disabled-password appuser
USER appuser
