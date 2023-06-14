import React, { useState } from "react";
import './NuevoCapitulo.css';

// Componente para crear un capítulo
function NuevoCapitulo() {
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  
  const handleTextChange = (event) => {
    setTexto(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar el título y el texto
    if (titulo.length > 50) {
      setMensaje("El título no debe tener más de 50 caracteres.");
      return;
    }

    if (texto.trim() === "") {
      setMensaje("No puedes guardar un texto vacío.");
      return;
    }

    // Enviar el texto al servidor
    fetch("http://localhost:8080/capitulo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo: titulo, texto: texto }),
    })
      .then((response) => {
        if (response.ok) {
          setMensaje("¡Texto enviado con éxito!");
          setTitulo("");
          setTexto("");
          // Colocar el cursor en el campo de título
          document.getElementById("title-input").focus();
        } else {
          setMensaje("Hubo un error al enviar el texto.");
        }
      })
      .catch((error) => {
        setMensaje("Hubo un error al enviar el texto.");
      });

    console.log("Objeto JSON enviado:", JSON.stringify({ title: titulo, text: texto }));
  };

  // Enviar el texto al pulsar Ctrl + Intro
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      handleSubmit(event);
    }
  };

  // Renderizar el componente
  return (
<div className="container">
  <form onSubmit={handleSubmit}>
    <label>
      Título:
      <input className="input-field" type="text" value={titulo} onChange={handleTitleChange} autoFocus id="title-input" />
      <span className="character-count">{titulo.length}/50</span>
    </label>
    <br />
    <label>
      Texto:
      <textarea className="textarea-field" value={texto} onChange={handleTextChange} onKeyDown={handleKeyDown} />
      <span className="character-count">{texto.length}</span>
    </label>
    <br />
    <button className="submit-button" type="submit">Guardar</button>
  </form>
  <p className="message"><strong>{mensaje}</strong></p>
</div>

  );
}

export default NuevoCapitulo;
