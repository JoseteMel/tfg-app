import { useEffect, useState } from 'react';
import moment from 'moment'; // Importar moment

import './ListaCapitulos.css';

function ListaCapitulos() {
  const [capitulos, setCapitulos] = useState([]);
  const [capituloEditadoId, setEditandoCapituloId] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');
  const [tituloEditado, setTituloEditado] = useState('');
  const [tituloOriginal, setTituloOriginal] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaModificacion, setFechaModificacion] = useState('');
  const [mensaje, setMensaje] = useState("");

  // Obtener la lista de capítulos
  function obtenerCapitulos() {
    fetch('http://localhost:8080/capitulos')
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

  // Función para formatear la fecha
  function formatearFecha(fecha) {
    return moment(fecha).format('HH:mm DD/MM/YYYY'); // Aplicar el formato deseado
  }

  // Cargar el capítulo seleccionado para editarlo
  function cargarTexto(capituloId) {
    fetch(`http://localhost:8080/capitulo/${capituloId}`)
      .then(response => response.json())
      .then(data => {
        setTituloOriginal(data.titulo);
        setTextoOriginal(data.texto);
        setTituloEditado(data.titulo);
        setTextoEditado(data.texto);
        setEditandoCapituloId(capituloId);
        setFechaCreacion(data.fechaCreacion);
        setFechaModificacion(data.fechaModificacion);
      })
      .catch(error => {
        console.error('Error al recibir el capítulo:', error);
      });
  }

  // Restablecer los campos de edición
  function reestablecerCampos() {
    // Actualizar la lista de capítulos
    obtenerCapitulos();
    // Restablecer los valores de edición
    setTituloOriginal('');
    setTextoOriginal('');
    setTextoEditado('');
    setTituloEditado('');
    setEditandoCapituloId(null);
  }

  // Guardar el capítulo editado
  function guardarCapituloEditado() {

    // Validar el título y el texto
    if (tituloEditado.length > 50) {
      setMensaje("El título no puede tener más de 50 caracteres");
      return;
    }

    if (textoEditado.trim() === "") {
      setMensaje("No puedes guardar un capítulo vacío.");
      return;
    }
  
    // Enviar el capítulo editado al servidor
    const fechaActual = new Date();
    const fechaModificacionFormateada = capituloEditadoId ? fechaActual.toISOString() : '';

    fetch(`http://localhost:8080/capitulo/${capituloEditadoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        titulo: tituloEditado, 
        texto: textoEditado,
        fechaModificacion: fechaModificacionFormateada
       })
    })
      .then(response => response.json())
      .then(() => {
        reestablecerCampos();
      })
      .catch(error => {
        console.error('Error al actualizar el capítulo:', error);
      });
  }
  
  // Eliminar el capítulo seleccionado
  function eliminarCapitulo(capituloId) {
    if (capituloEditadoId !== null && window.confirm('¿Estás seguro de que deseas eliminar este capítulo?')) {
      fetch(`http://localhost:8080/capitulo/${capituloId}`, {
        method: 'DELETE'
      })
        .then(() => {
          reestablecerCampos();
        })
        .catch(error => {
          console.error('Error al eliminar el capítulo:', error);
        });
    }
  }
  
  // Cancelar la edición
  function cancelarEdicion() {
    if (textoOriginal !== textoEditado || tituloOriginal !== tituloEditado) {
      if (window.confirm('¿Estás seguro de que deseas cancelar la edición? Perderás los cambios no guardados.')) {
        setTituloEditado(tituloOriginal);
        setTextoEditado(textoOriginal);
        setEditandoCapituloId(null); // cerrar bloque de edición de texto
      }
    } else {
      setTituloEditado('');
      setTextoEditado('');
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
    }, [capituloEditadoId, textoEditado, tituloEditado]);

  // Mostrar la lista de capítulos
  return (
    <div>
      <div className='section-title'>
        <h2>{capitulos.length > 0 ? 'Capítulos:' : 'No hay capítulos'}</h2>
      </div>
      <ul>
        {Array.isArray(capitulos) &&
          capitulos.map((capitulo) => (
            <li key={capitulo.id}>
              <div>
                {capituloEditadoId === capitulo.id ? (
                  <form
                    className="edit-form"
                    onSubmit={(event) => {
                      event.preventDefault(); // Evitar recarga de página
                      guardarCapituloEditado();
                    }}
                    onKeyDown={(event) => {
                      if (event.ctrlKey && event.key === 'Enter') {
                        event.preventDefault(); // Evitar salto de línea
                        guardarCapituloEditado();
                      }
                    }}
                  >
                    <input
                      type="text"
                      value={tituloEditado}
                      onChange={(event) => setTituloEditado(event.target.value)}
                      autoFocus
                    />
                    <span>{tituloEditado.length}/50</span> <br />
                    <textarea
                      value={textoEditado}
                      onChange={(event) => setTextoEditado(event.target.value)}
                    />
                    <span>{textoEditado.length}</span> <br />
                    <p>
                      <span>Creado: {capitulo.fechaCreacion}</span>
                      <br />
                      {capitulo.fechaCreacion !== capitulo.fechaModificacion && (
                        <span>Modificado: {capitulo.fechaModificacion}</span>
                      )}
                    </p>
                    <p>{mensaje}</p>
                    <div>
                      <button type="submit">Guardar cambios</button>
                      <button onClick={cancelarEdicion}>Cancelar</button>
                      <button onClick={() => eliminarCapitulo(capitulo.id)}>
                        Eliminar
                      </button>
                    </div>
                  </form>
                ) : (
                  <span onClick={() => cargarTexto(capitulo.id)}>
                    {capitulo.titulo ? (
                      <h3>{capitulo.titulo}</h3>
                    ) : (
                      <h3>
                        <i>(Sin título)</i>
                      </h3>
                    )}
                    <p>
                      {capitulo.texto.length > 50
                        ? `${capitulo.texto.slice(0, 50)}...`
                        : capitulo.texto}
                    </p>
                    <p>
                      <span>Creado: {formatearFecha(capitulo.fechaCreacion)}</span>
                      <br />
                      {capitulo.fechaCreacion !== capitulo.fechaModificacion && (
                        <span>Modificado: {formatearFecha(capitulo.fechaModificacion)}</span>
                      )}
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
