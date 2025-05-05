import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Cargar mensajes al inicio
  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  // Enviar nuevo mensaje
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newMessage }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del backend:", data);
        setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
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
