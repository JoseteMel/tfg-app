import React, { useState } from 'react';
import './Notas.css';

const TextField = () => {
  const [nota, setNota] = useState('');

  const handleChange = (e) => {
    setNota(e.target.value);
  };

  const handleBlur = async (e) => {
    e.preventDefault();

    try {
      // Realiza una llamada a la API de Spring Boot para guardar el contenido del campo de texto en la base de datos
      const response = await fetch('http://localhost:8080/nota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: nota }),
      });

      if (response.ok) {
        // Los datos se guardaron exitosamente
        console.log('Contenido guardado en la base de datos');
      } else {
        // Ocurrió un error al guardar los datos
        console.error('Error al guardar el contenido en la base de datos');
      }
    } catch (error) {
      console.error('Error al realizar la llamada a la API', error);
    }
  };

  return (
      <form>
        <textarea value={nota} placeholder='Escribe tus notas aquí...' onChange={handleChange} onBlur={handleBlur} className='caja-notas'/> <br />
        {/* <button type="submit">Guardar</button> */}
      </form>
  );
};

export default TextField;
