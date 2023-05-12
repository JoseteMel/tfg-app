import { useEffect, useState } from 'react';

function MostrarTexto() {
  const [textos, setTextos] = useState([]);
  const [editandoTextoId, setEditandoTextoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [tituloEditado, setTituloEditado] = useState('');

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
        setTituloEditado(data.titulo);
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
      body: JSON.stringify({ titulo: tituloEditado, texto: textoEditado })
    })
      .then(response => response.json())
      .then(() => {
        // Actualizar la lista de textos
        obtenerTextos();
        // Restablecer los valores de edición
        setTextoEditado('');
        setTituloEditado('');
        setEditandoTextoId(null);
      })
      .catch(error => {
        console.error('Error al actualizar el texto:', error);
      });
  }

  function eliminarTexto(textoId) {
    fetch(`http://localhost:8080/text/${textoId}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Actualizar la lista de textos
        obtenerTextos();
        // Restablecer los valores de edición
        setTextoEditado('');
        setTituloEditado('');
        setEditandoTextoId(null);
      })
      .catch(error => {
        console.error('Error al eliminar el texto:', error);
      });
  }

  function cancelarEdicion() {
    setTextoEditado('');
    setTituloEditado('');
    setEditandoTextoId(null);
  }

  return (
    <div>
      <h2>Textos guardados en la base de datos:</h2>
      <ul>
        {Array.isArray(textos) && textos.map(texto => (
          <li key={texto.id}>
            <div>
              {editandoTextoId === texto.id ? (
                <div>
                  <input type="text" value={tituloEditado} onChange={event => setTituloEditado(event.target.value)} /> <br />
                  <textarea value={textoEditado} onChange={event => setTextoEditado(event.target.value)} />  <br />
                  <button onClick={guardarTextoEditado}>Guardar cambios</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                  <button onClick={() => eliminarTexto(texto.id)}>Eliminar</button>
                </div>
              ) : (
                <span onClick={() => cargarTexto(texto.id)}>
                  <h3>{texto.titulo}</h3>
                  {texto.texto.length > 50 ? `${texto.texto.slice(0, 50)}...` : texto.texto}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostrarTexto;
