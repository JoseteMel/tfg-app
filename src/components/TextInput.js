import React, { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo: title, texto: text }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("¡Texto enviado con éxito!");
        } else {
          setMessage("Hubo un error al enviar el texto.");
        }
      })
      .catch((error) => {
        setMessage("Hubo un error al enviar el texto.");
      });

    console.log("Objeto JSON enviado:", JSON.stringify({ title, text }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Texto:
          <textarea value={text} onChange={handleTextChange} />
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default TextInput;
