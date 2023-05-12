import { useEffect, useState } from 'react';

function MostrarTexto() {
  const [textos, setTextos] = useState([]);
  const [editandoTextoId, setEditandoTextoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  function obtenerTextos() {
    fetch('http://localhost:8080/text')
      .then(response => response.json())
      .then(data => {
        setTextos(data);
      })
      .catch(error => {
        console.error('Error al recibir los textos:', error);
      });
  }

  useEffect(() => {
    obtenerTextos();
  }, []);

  function cargarTexto(textoId) {
    fetch(`http://localhost:8080/text/${textoId}`)
      .then(response => response.json())
      .then(data => {
        setTextoEditado(data.texto);
        setEditandoTextoId(textoId);
      })
      .catch(error => {
        console.error('Error al recibir el texto:', error);
      });
  }

  function guardarTextoEditado() {
    fetch(`http://localhost:8080/text/${editandoTextoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ texto: textoEditado })
    })
      .then(response => response.json())
      .then(() => {
        // Actualizar la lista de textos
        obtenerTextos();
        // Restablecer los valores de edición
        setTextoEditado('');
        setEditandoTextoId(null);
      })
      .catch(error => {
        console.error('Error al actualizar el texto:', error);
      });
  }

  return (
    <div>
      <h2>Textos guardados en la base de datos:</h2>
      <ul>
        {Array.isArray(textos) && textos.map(texto => (
          <li key={texto.id}>
            {editandoTextoId === texto.id ? (
              <div>
                <textarea value={textoEditado} onChange={event => setTextoEditado(event.target.value)} />
                <button onClick={guardarTextoEditado}>Guardar cambios</button>
              </div>
            ) : (
              <div>
                <span onClick={() => cargarTexto(texto.id)}>{texto.texto}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default MostrarTexto;
