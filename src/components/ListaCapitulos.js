import { useEffect, useState } from 'react';

function ListaCapitulos() {
  const [capitulos, setCapitulos] = useState([]);
  const [capituloEditadoId, setEditandoCapituloId] = useState(null);
  const [capituloEditado, setCapituloEditado] = useState('');
  const [tituloEditado, setTituloEditado] = useState('');
  const [mensaje, setMensaje] = useState("");
  const [tituloOriginal, setTituloOriginal] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaModificacion, setFechaModificacion] = useState('');

  // Obtener la lista de capítulo
  function obtenerCapitulos() {
    fetch('http://localhost:8080/text')
      .then(response => response.json())
      .then(data => {
        setCapitulos(data);
      })
      .catch(error => {
        console.error('Error al recibir los capítulos:', error);
      });
  }

  // Obtener la lista de capítulos al cargar el componente
  useEffect(() => {
    obtenerCapitulos();
  }, []);

  // Cargar el capítulo seleccionado para editarlo
  function cargarTexto(capituloId) {
    fetch(`http://localhost:8080/text/${capituloId}`)
      .then(response => response.json())
      .then(data => {
        setTituloOriginal(data.titulo);
        setTextoOriginal(data.texto);
        setTituloEditado(data.titulo);
        setCapituloEditado(data.texto);
        setEditandoCapituloId(capituloId);
        setFechaCreacion(data.fechaCreacion);
        setFechaModificacion(data.fechaModificacion);
      })
      .catch(error => {
        console.error('Error al recibir el capítulo:', error);
      });
  }

  // Guardar el capítulo editado
  function guardarCapituloEditado() {

    // Validar el título y el texto
    if (tituloEditado.length > 50) {
      setMensaje("El título no puede tener más de 50 caracteres");
      return;
    }

    if (capituloEditado.trim() === "") {
      setMensaje("No puedes guardar un capítulo vacío.");
      return;
    }
  
    // Enviar el capítulo editado al servidor
    const fechaActual = new Date();
    const fechaModificacionFormateada = capituloEditadoId ? fechaActual.toISOString() : '';

    fetch(`http://localhost:8080/text/${capituloEditadoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        titulo: tituloEditado, 
        texto: capituloEditado,
        fechaModificacion: fechaModificacionFormateada
       })
    })
      .then(response => response.json())
      .then(() => {
        // Actualizar la lista de capítulos
        obtenerCapitulos();
        // Restablecer los valores de edición
        setTituloOriginal('');
        setTextoOriginal('');
        setCapituloEditado('');
        setTituloEditado('');
        setEditandoCapituloId(null);
      })
      .catch(error => {
        console.error('Error al actualizar el capítulo:', error);
      });
    document.getElementById("title-input").focus();
  }
  
  // Eliminar el capítulo seleccionado
  function eliminarCapitulo(caapituloId) {
    if (capituloEditadoId !== null && window.confirm('¿Estás seguro de que deseas eliminar este capítulo?')) {
      fetch(`http://localhost:8080/text/${caapituloId}`, {
        method: 'DELETE'
      })
        .then(() => {
          // Actualizar la lista de capítulos
          obtenerCapitulos();
          // Restablecer los valores de edición
          setTituloOriginal('');
          setTextoOriginal('');
          setCapituloEditado('');
          setTituloEditado('');
          setEditandoCapituloId(null);
        })
        .catch(error => {
          console.error('Error al eliminar el capítulo:', error);
        });
    }
    document.getElementById("title-input").focus();
  }
  
  // Cancelar la edición
  function cancelarEdicion() {
    if (textoOriginal !== capituloEditado || tituloOriginal !== tituloEditado) {
      if (window.confirm('¿Estás seguro de que deseas cancelar la edición? Perderás los cambios no guardados.')) {
        setTituloEditado(tituloOriginal);
        setCapituloEditado(textoOriginal);
        setEditandoCapituloId(null); // cerrar bloque de edición de texto
        document.getElementById("title-input").focus();
      }
    } else {
      setTituloEditado('');
      setCapituloEditado('');
      setEditandoCapituloId(null);
    }
  }

    // Atajos de teclado para eliminar y cancelar la edición
    useEffect(() => {
      function handleEscape(event) {
        
        // Eliminar el capítulo con la tecla Delete
        if (capituloEditadoId !== null && event.key === 'Delete') {
          eliminarCapitulo(capituloEditadoId);
        }

        // Cancelar la edición con la tecla Escape
        if (capituloEditadoId !== null && event.key === 'Escape') {
          cancelarEdicion();
        }
      }

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [capituloEditadoId, capituloEditado, tituloEditado]);
  
  // Mostrar la lista de capítulos
  return (
    <div>
      <h2>Capítulos guardados en la base de datos:</h2>
      <ul>
        {Array.isArray(capitulos) && capitulos.map(capitulo => (
          <li key={capitulo.id}>
            <div>
              {capituloEditadoId === capitulo.id ? (
                <div>
                  <input type="text" value={tituloEditado} onChange={event => setTituloEditado(event.target.value)} autoFocus /><span>{tituloEditado.length}/50</span> <br />
                  <textarea value={capituloEditado} onChange={event => setCapituloEditado(event.target.value)} /><span>{capituloEditado.length}</span>  <br />
                  <p>
                    <span>Creado: {capitulo.fechaCreacion}</span><br />
                    {capitulo.fechaCreacion !== capitulo.fechaModificacion && <span>Modificado: {capitulo.fechaModificacion}</span>}
                  </p>
                  <p>{mensaje}</p>
                  <button onClick={guardarCapituloEditado}>Guardar cambios</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                  <button onClick={() => eliminarCapitulo(capitulo.id)}>Eliminar</button>
                </div>
              ) : (
                <span onClick={() => cargarTexto(capitulo.id)}>
                  {capitulo.titulo ? (
                    <h3>{capitulo.titulo}</h3>
                  ) : (
                    <h3><i>(Sin título)</i></h3>
                  )}
                  <p>{capitulo.texto.length > 50 ? `${capitulo.texto.slice(0, 50)}...` : capitulo.texto}</p>
                  <p>
                    <span>Creado: {capitulo.fechaCreacion}</span><br />
                    {capitulo.fechaCreacion !== capitulo.fechaModificacion && <span>Modificado: {capitulo.fechaModificacion}</span>}
                  </p>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCapitulos;
