import { useEffect, useState } from 'react';

function MostrarTexto() {
  const [textos, setTextos] = useState([]);
  const [textoEditadoId, setEditandoTextoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [tituloEditado, setTituloEditado] = useState('');
  const [message, setMessage] = useState("");
  const [tituloOriginal, setTituloOriginal] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');

  // Obtener la lista de textos
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

  // Obtener la lista de textos al cargar el componente
  useEffect(() => {
    obtenerTextos();
  }, []);

  // Cargar el texto seleccionado para editarlo
  function cargarTexto(textoId) {
    fetch(`http://localhost:8080/text/${textoId}`)
      .then(response => response.json())
      .then(data => {
        setTituloOriginal(data.titulo);
        setTextoOriginal(data.texto);
        setTituloEditado(data.titulo);
        setTextoEditado(data.texto);
        setEditandoTextoId(textoId);
      })
      .catch(error => {
        console.error('Error al recibir el texto:', error);
      });
  }

  // Guardar el texto editado
  function guardarTextoEditado() {

    // Validar el título y el texto
    if (tituloEditado.length > 50) {
      setMessage("El título no puede tener más de 50 caracteres");
      return;
    }

    if (textoEditado.trim() === "") {
      setMessage("No puedes guardar un texto vacío.");
      return;
    }
  
    // Enviar el texto editado al servidor
    fetch(`http://localhost:8080/text/${textoEditadoId}`, {
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
        setTituloOriginal('');
        setTextoOriginal('');
        setTextoEditado('');
        setTituloEditado('');
        setEditandoTextoId(null);
      })
      .catch(error => {
        console.error('Error al actualizar el texto:', error);
      });
  }
  
  // Elimitar el texto seleccionado
  function eliminarTexto(textoId) {
    if (window.confirm('¿Estás seguro de que deseas eliminar este texto?')) {
      fetch(`http://localhost:8080/text/${textoId}`, {
        method: 'DELETE'
      })
        .then(() => {
          // Actualizar la lista de textos
          obtenerTextos();
          // Restablecer los valores de edición
          setTituloOriginal('');
          setTextoOriginal('');
          setTextoEditado('');
          setTituloEditado('');
          setEditandoTextoId(null);
        })
        .catch(error => {
          console.error('Error al eliminar el texto:', error);
        });
    }
  }

  // Eliminar el texto al pulsar la tecla "Supr"
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Delete') {
        eliminarTexto(textoEditadoId);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [textoEditadoId]);
  
  // Cancelar la edición
  function cancelarEdicion() {
    if (textoOriginal !== textoEditado || tituloOriginal !== tituloEditado) {
      if (window.confirm('¿Estás seguro de que deseas cancelar la edición? Perderás los cambios no guardados.')) {
        setTituloEditado(tituloOriginal);
        setTextoEditado(textoOriginal);
        setEditandoTextoId(null); // cerrar bloque de edición de texto
      }
    } else {
      setTituloEditado('');
      setTextoEditado('');
      setEditandoTextoId(null);
    }
  }

  // Cancelar la edición al pulsar la tecla "Esc"
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        cancelarEdicion();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [textoEditado, tituloEditado]);
  
  // Mostrar la lista de textos
  return (
    <div>
      <h2>Textos guardados en la base de datos:</h2>
      <ul>
        {Array.isArray(textos) && textos.map(texto => (
          <li key={texto.id}>
            <div>
              {textoEditadoId === texto.id ? (
                <div>
                  <input type="text" value={tituloEditado} onChange={event => setTituloEditado(event.target.value)} /><span>{tituloEditado.length}/50</span> <br />
                  <textarea value={textoEditado} onChange={event => setTextoEditado(event.target.value)} /><span>{textoEditado.length}</span>  <br />
                  <p>{message}</p>
                  <button onClick={guardarTextoEditado}>Guardar cambios</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                  <button onClick={() => eliminarTexto(texto.id)}>Eliminar</button>
                </div>
              ) : (
                <span onClick={() => cargarTexto(texto.id)}>
                  {texto.titulo ? (
                    <h3>{texto.titulo}</h3>
                  ) : (
                    <h3><i>(Sin título)</i></h3>
                  )}
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
