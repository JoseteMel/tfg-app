import React, { useState, useEffect } from "react";

function TextInput() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto: text }),
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

      console.log("Objeto JSON enviado:", JSON.stringify({ text }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea value={text} onChange={handleChange} />
        </label>
        <button type="submit">Guardar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default TextInput;
