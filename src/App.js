import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Cargar mensajes al inicio
  useEffect(() => {
    fetch(`${API_URL}/api/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando mensaje:", newMessage);

    fetch(`${API_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newMessage }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del backend:", data);
        fetch(`${API_URL}/api/messages`)
          .then((res) => res.json())
          .then((data) => setMessages(data))
          .catch((err) => console.error("Error al obtener mensajes:", err));
        setNewMessage("");
      })
      .catch((err) => console.error("Error al enviar mensaje:", err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mensajes desde Flask</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje"
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.text}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
