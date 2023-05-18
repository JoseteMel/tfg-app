import React, { useState } from "react";

// Componente para crear un personaje
function NuevoPersonaje() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [lugarNacimiento, setLugarNacimiento] = useState("")
  const [altura, setAltura] = useState("");
  const [complexion, setComplexion] = useState("");
  const [longitudPelo, setLongitudPelo] = useState("");
  const [colorPelo, setColorPelo] = useState("")
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [personalidad, setPersonalidad] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [religion, setReligion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [otros, setOtros] = useState("");
  const [mensaje, setMensaje] = useState("");
  
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidosChange = (event) => {
    setApellidos(event.target.value);
  };

  const handleFechaNacimientoChange = (event) => {
    setFechaNacimiento(event.target.value);
  };

  const handleLugarNacimientoChange = (event) => {
    setLugarNacimiento(event.target.value);
  };

  const handleAlturaChange = (event) => {
    setAltura(event.target.value);
  };

  const handleComplexionChange = (event) => {
    setComplexion(event.target.value);
  };

  const handleLongitudPeloChange = (event) => {
    setLongitudPelo(event.target.value);
  };

  const handleColorPeloChange = (event) => {
    setColorPelo(event.target.value);
  };

  const handleRazaChange = (event) => {
    setRaza(event.target.value);
  };

  const handleSexoChange = (event) => {
    setSexo(event.target.value);
  };

  const handlePersonalidadChange = (event) => {
    setPersonalidad(event.target.value);
  };

  const handleOcupacionChange = (event) => {
    setOcupacion(event.target.value);
  };

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleOtrosChange = (event) => {
    setOtros(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    if (nombre.length > 50) {
      setMensaje("El nombre no debe tener más de 50 caracteres.");
      return;
    }

    if (nombre.trim() === "") {
      setMensaje("No puedes dejar el nombre vacío.");
      return;
    }

    if (apellidos.length > 50) {
      setMensaje("Los apellidos no deben tener más de 50 caracteres.");
      return;
    }

    if (fechaNacimiento.length > 50) {
      setMensaje("La fecha de nacimiento no debe tener más de 50 caracteres.");
      return;
    }

    if (lugarNacimiento.length > 50) {
      setMensaje("El lugar de nacimiento no debe tener más de 50 caracteres.");
      return;
    }

    if (altura.length > 20) {
      setMensaje("La altura no debe tener más de 20 caracteres.");
      return;
    }

    if (complexion.length > 20) {
      setMensaje("La complexión no debe tener más de 20 caracteres.");
      return;
    }

    if (longitudPelo.length > 20) {
      setMensaje("La longitud del pelo no debe tener más de 20 caracteres.");
      return;
    }

    if (colorPelo.length > 20) {
      setMensaje("El color de pelo no debe tener más de 20 caracteres.");
      return;
    }

    if (raza.length > 50) {
      setMensaje("El nombre no debe tener más de 50 caracteres.");
      return;
    }

    if (sexo.length > 50) {
      setMensaje("El sexo no debe tener más de 50 caracteres.");
      return;
    }

    if (personalidad.length > 50) {
      setMensaje("La personalidad no debe tener más de 100 caracteres.");
      return;
    }

    if (ocupacion.length > 50) {
      setMensaje("La ocupación no debe tener más de 100 caracteres.");
      return;
    }

    if (religion.length > 100) {
      setMensaje("La religión no debe tener más de 100 caracteres.");
      return;
    }

    // Enviar datos al servidor
    fetch("http://localhost:8080/personaje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, apellidos, fechaNacimiento, lugarNacimiento, altura, complexion, longitudPelo, colorPelo, raza, sexo, personalidad, ocupacion, religion, descripcion, otros }),
    })
      .then((response) => {
        if (response.ok) {
          setMensaje("¡Personaje registrado con éxito!");
          setNombre("");
          setApellidos("");
          setFechaNacimiento("");
          setLugarNacimiento("");
          setAltura("");
          setComplexion("");
          setLongitudPelo("");
          setColorPelo("");
          setRaza("");
          setSexo("");
          setPersonalidad("");
          setOcupacion("");
          setReligion("");
          setDescripcion("");
          setOtros("");
          // Colocar el cursor en el campo de nombre
          document.getElementById("name-input").focus();
        } else {
          setMensaje("Hubo un error al registrar el personaje.");
        }
      })
      .catch((error) => {
        setMensaje("Hubo un error al registrar el personaje.");
      });

    console.log("Objeto JSON enviado:", JSON.stringify({ nombre, apellidos, fechaNacimiento, lugarNacimiento, altura, complexion, longitudPelo, colorPelo, raza, sexo, personalidad, ocupacion, religion, descripcion, otros }));
  };

  // Enviar el texto al pulsar Ctrl + Intro
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      handleSubmit(event);
    }
  };

  // Renderizar el componente
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={handleNombreChange} autoFocus id="name-input" />
          <span>{nombre.length}/50</span>
        </label>
        <br />
        <label>
          Apellidos:
          <input type="text" value={apellidos} onChange={handleApellidosChange} />
          <span>{apellidos.length}/50</span>
        </label>
        <br />
        <label>
          Fecha de nacimiento:
          <input type="text" value={fechaNacimiento} onChange={handleFechaNacimientoChange} />
          <span>{fechaNacimiento.length}/50</span>
        </label>
        <br />
        <label>
          Lugar de nacimiento:
          <input type="text" value={lugarNacimiento} onChange={handleLugarNacimientoChange} />
          <span>{lugarNacimiento.length}/50</span>
        </label>
        <br />
        <label>
          Altura:
          <input type="text" value={altura} onChange={handleAlturaChange} />
          <span>{altura.length}/10</span>
        </label>
        <br />
        <label>
          Complexión:
          <input type="text" value={complexion} onChange={handleComplexionChange} />
          <span>{complexion.length}/20</span>
        </label>
        <br />
        <label>
          Longitud de pelo:
          <input type="text" value={longitudPelo} onChange={handleLongitudPeloChange} />
          <span>{longitudPelo.length}/20</span>
        </label>
        <br />
        <label>
          Color del pelo:
          <input type="text" value={colorPelo} onChange={handleColorPeloChange} />
          <span>{colorPelo.length}/20</span>
        </label>
        <br />
        <label>
          Raza:
          <input type="text" value={raza} onChange={handleRazaChange} />
          <span>{raza.length}/50</span>
        </label>
        <br />
        <label>
          Sexo:
          <input type="text" value={sexo} onChange={handleSexoChange} />
          <span>{sexo.length}/50</span>
        </label>
        <br />
        <label>
          Personalidad:
          <input type="text" value={personalidad} onChange={handlePersonalidadChange} />
          <span>{personalidad.length}/100</span>
        </label>
        <br />
        <label>
          Ocupación:
          <input type="text" value={ocupacion} onChange={handleOcupacionChange} />
          <span>{ocupacion.length}/100</span>
        </label>
        <br />
        <label>
          Religión:
          <input type="text" value={religion} onChange={handleReligionChange} />
          <span>{religion.length}/100</span>
        </label>
        <br />
        <label>
          Descripción:
          <textarea value={descripcion} onChange={handleDescripcionChange} onKeyDown={handleKeyDown} />
          <span>{descripcion.length}</span>
        </label>
        <br />
        <label>
          Otros...:
          <textarea value={otros} onChange={handleOtrosChange} onKeyDown={handleKeyDown} />
          <span>{otros.length}</span>
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default NuevoPersonaje;
