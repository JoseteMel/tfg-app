import { useEffect, useState } from 'react';
import moment from 'moment'; // Importar moment

import './ListaPersonajes.css';

function ListaPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [personajeEditadoId, setEditandoPersonajeId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [nombreOriginal, setNombreOriginal] = useState('');
  const [apellidosEditado, setApellidosEditado] = useState('');
  const [apellidosOriginal, setApellidosOriginal] = useState('');
  const [fechaNacimientoEditado, setFechaNacimientoEditado] = useState('');
  const [fechaNacimientoOriginal, setFechaNacimientoOriginal] = useState('');
  const [lugarNacimientoEditado, setLugarNacimientoEditado] = useState('');
  const [lugarNacimientoOriginal, setLugarNacimientoOriginal] = useState('');
  const [alturaEditado, setAlturaEditado] = useState('');
  const [alturaOriginal, setAlturaOriginal] = useState('');
  const [complexionEditado, setComplexionEditado] = useState('');
  const [complexionOriginal, setComplexionOriginal] = useState('');
  const [longitudPeloEditado, setLongitudPeloEditado] = useState('');
  const [longitudPeloOriginal, setLongitudPeloOriginal] = useState('');
  const [colorPeloEditado, setColorPeloEditado] = useState('');
  const [colorPeloOriginal, setColorPeloOriginal] = useState('');
  const [razaEditado, setRazaEditado] = useState('');
  const [razaOriginal, setRazaOriginal] = useState('');
  const [sexoEditado, setSexoEditado] = useState('');
  const [sexoOriginal, setSexoOriginal] = useState('');
  const [personalidadEditado, setPersonalidadEditado] = useState('');
  const [personalidadOriginal, setPersonalidadOriginal] = useState('');
  const [ocupacionEditado, setOcupacionEditado] = useState('');
  const [ocupacionOriginal, setOcupacionOriginal] = useState('');
  const [religionEditado, setReligionEditado] = useState('');
  const [religionOriginal, setReligionOriginal] = useState('');
  const [descripcionEditado, setDescripcionEditado] = useState('');
  const [descripcionOriginal, setDescripcionOriginal] = useState('');
  const [otrosEditado, setOtrosEditado] = useState('');
  const [otrosOriginal, setOtrosOriginal] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaModificacion, setFechaModificacion] = useState('');
  const [mensaje, setMensaje] = useState("");

  // Obtener la lista de personajes
  function obtenerPersonajes() {
    fetch('http://localhost:8080/personajes')
      .then(response => response.json())
      .then(data => {
        setPersonajes(data);
      })
      .catch(error => {
        console.error('Error al recibir los personajes:', error);
      });
  }

  // Obtener la lista de personajes al cargar el componente
  useEffect(() => {
    obtenerPersonajes();
  }, []);

  // Función para formatear la fecha
  function formatearFecha(fecha) {
    return moment(fecha).format('HH:mm:ss DD/MM/YYYY'); // Aplicar el formato deseado
  }

  // Cargar el personaje seleccionado para editarlo
  function cargarPersonaje(personajeId) {
    fetch(`http://localhost:8080/personaje/${personajeId}`)
      .then(response => response.json())
      .then(data => {
        setEditandoPersonajeId(personajeId);
        setNombreOriginal(data.nombre);
        setNombreEditado(data.nombre);
        setApellidosOriginal(data.apellidos);
        setApellidosEditado(data.apellidos);
        setFechaNacimientoOriginal(data.fechaNacimiento);
        setFechaNacimientoEditado(data.fechaNacimiento);
        setLugarNacimientoOriginal(data.lugarNacimiento);
        setLugarNacimientoEditado(data.lugarNacimiento);
        setAlturaOriginal(data.altura);
        setAlturaEditado(data.altura);
        setComplexionOriginal(data.complexion);
        setComplexionEditado(data.complexion);
        setLongitudPeloOriginal(data.longitudPelo);
        setLongitudPeloEditado(data.longitudPelo);
        setColorPeloOriginal(data.colorPelo);
        setColorPeloEditado(data.colorPelo);
        setRazaOriginal(data.raza);
        setRazaEditado(data.raza);
        setSexoOriginal(data.sexo);
        setSexoEditado(data.sexo);
        setPersonalidadOriginal(data.personalidad);
        setPersonalidadEditado(data.personalidad);
        setOcupacionOriginal(data.ocupacion);
        setOcupacionEditado(data.ocupacion);
        setReligionOriginal(data.religion);
        setReligionEditado(data.religion);
        setDescripcionOriginal(data.descripcion);
        setDescripcionEditado(data.descripcion);
        setOtrosOriginal(data.otros);
        setOtrosEditado(data.otros);
        setFechaCreacion(data.fechaCreacion);
        setFechaModificacion(data.fechaModificacion);
      })
      .catch(error => {
        console.error('Error al recibir el personaje:', error);
      });
  }

  // Reestablecer los campos del personaje
  function reestablecerCampos(){
    // Obtener la lista de personajes
    obtenerPersonajes();
    // Reestablecer los campos
    setEditandoPersonajeId('');
    setNombreOriginal('');
    setNombreEditado('');
    setApellidosOriginal('');
    setApellidosEditado('');
    setFechaNacimientoOriginal('');
    setFechaNacimientoEditado('');
    setLugarNacimientoOriginal('');
    setLugarNacimientoEditado('');
    setAlturaOriginal('');
    setAlturaEditado('');
    setComplexionOriginal('');
    setComplexionEditado('');
    setLongitudPeloOriginal('');
    setLongitudPeloEditado('');
    setColorPeloOriginal('');
    setColorPeloEditado('');
    setRazaOriginal('');
    setRazaEditado('');
    setSexoOriginal('');
    setSexoEditado('');
    setPersonalidadOriginal('');
    setPersonalidadEditado('');
    setOcupacionOriginal('');
    setOcupacionEditado('');
    setReligionOriginal('');
    setReligionEditado('');
    setDescripcionOriginal('');
    setDescripcionEditado('');
    setOtrosOriginal('');
    setOtrosEditado('');
}

  // Guardar el personaje editado
  function guardarPersonajeEditado() {

    // Validaciones
    if (nombreEditado.length > 50) {
        setMensaje("El nombre no debe tener más de 50 caracteres.");
        return;
      }
  
      if (nombreEditado.trim() === "") {
        setMensaje("No puedes dejar el nombre vacío.");
        return;
      }
  
      if (apellidosEditado.length > 50) {
        setMensaje("Los apellidos no deben tener más de 50 caracteres.");
        return;
      }
  
      if (fechaNacimientoEditado.length > 50) {
        setMensaje("La fecha de nacimiento no debe tener más de 50 caracteres.");
        return;
      }
  
      if (lugarNacimientoEditado.length > 50) {
        setMensaje("El lugar de nacimiento no debe tener más de 50 caracteres.");
        return;
      }
  
      if (alturaEditado.length > 30) {
        setMensaje("La altura no debe tener más de 30 caracteres.");
        return;
      }
  
      if (complexionEditado.length > 20) {
        setMensaje("La complexión no debe tener más de 20 caracteres.");
        return;
      }
  
      if (longitudPeloEditado.length > 20) {
        setMensaje("La longitud del pelo no debe tener más de 20 caracteres.");
        return;
      }
  
      if (colorPeloEditado.length > 20) {
        setMensaje("El color de pelo no debe tener más de 20 caracteres.");
        return;
      }
  
      if (razaEditado.length > 50) {
        setMensaje("El nombre no debe tener más de 50 caracteres.");
        return;
      }
  
      if (sexoEditado.length > 50) {
        setMensaje("El sexo no debe tener más de 50 caracteres.");
        return;
      }
  
      if (personalidadEditado.length > 50) {
        setMensaje("La personalidad no debe tener más de 100 caracteres.");
        return;
      }
  
      if (ocupacionEditado.length > 50) {
        setMensaje("La ocupación no debe tener más de 100 caracteres.");
        return;
      }
  
      if (religionEditado.length > 100) {
        setMensaje("La religión no debe tener más de 100 caracteres.");
        return;
      }
  
    // Enviar el personaje editado al servidor
    const fechaActual = new Date();
    const fechaModificacionFormateada = personajeEditadoId ? fechaActual.toISOString() : '';

    fetch(`http://localhost:8080/personaje/${personajeEditadoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        nombre: nombreEditado,
        apellidos: apellidosEditado,
        fechaNacimiento: fechaNacimientoEditado,
        lugarNacimiento: lugarNacimientoEditado,
        altura: alturaEditado,
        complexion: complexionEditado,
        longitudPelo: longitudPeloEditado,
        colorPelo: colorPeloEditado,
        raza: razaEditado,
        sexo: sexoEditado,
        personalidad: personalidadEditado,
        ocupacion: ocupacionEditado,
        religion: religionEditado,
        descripcion: descripcionEditado,
        otros: otrosEditado,
        fechaModificacion: fechaModificacionFormateada
       })
    })
      .then(response => response.json())
      .then(() => {
        reestablecerCampos();
      })
      .catch(error => {
        console.error('Error al actualizar el personaje:', error);
      });
  }
  
  // Eliminar el personaje seleccionado
  function eliminarPersonaje(personajeId) {
    if (personajeEditadoId !== null && window.confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
      fetch(`http://localhost:8080/personaje/${personajeId}`, {
        method: 'DELETE'
      })
        .then(() => {
          reestablecerCampos();
        })
        .catch(error => {
          console.error('Error al eliminar el personaje:', error);
        });
    }
  }
  
  // Cancelar la edición
  function cancelarEdicion() {
    if (nombreOriginal !== nombreEditado || apellidosOriginal !== apellidosEditado || fechaNacimientoOriginal !== fechaNacimientoEditado || lugarNacimientoOriginal !== lugarNacimientoEditado || alturaOriginal !== alturaEditado 
        || complexionOriginal !== complexionEditado || longitudPeloOriginal !== longitudPeloEditado || colorPeloOriginal !== colorPeloEditado || razaOriginal !== razaEditado || sexoOriginal !== sexoEditado || 
        personalidadOriginal !== personalidadEditado || ocupacionOriginal !== ocupacionEditado || religionOriginal !== religionEditado || descripcionOriginal !== descripcionEditado || otrosOriginal !== otrosEditado) {
      if (window.confirm('¿Estás seguro de que deseas cancelar la edición? Perderás los cambios no guardados.')) {
        setNombreEditado(nombreOriginal);
        setApellidosEditado(apellidosOriginal);
        setFechaNacimientoEditado(fechaNacimientoOriginal);
        setLugarNacimientoEditado(lugarNacimientoOriginal);
        setAlturaEditado(alturaOriginal);
        setComplexionEditado(complexionOriginal);
        setLongitudPeloEditado(longitudPeloOriginal);
        setColorPeloEditado(colorPeloOriginal);
        setRazaEditado(razaOriginal);
        setSexoEditado(sexoOriginal);
        setPersonalidadEditado(personalidadOriginal);
        setOcupacionEditado(ocupacionOriginal);
        setReligionEditado(religionOriginal);
        setDescripcionEditado(descripcionOriginal);
        setOtrosEditado(otrosOriginal);
        setEditandoPersonajeId(null); // cerrar bloque de edición de texto
      }
    } else {
      setNombreOriginal('');
      setNombreEditado('');
      setApellidosOriginal('');
      setApellidosEditado('');
      setFechaNacimientoOriginal('');
      setFechaNacimientoEditado('');
      setLugarNacimientoOriginal('');
      setLugarNacimientoEditado('');
      setAlturaOriginal('');
      setAlturaEditado('');
      setComplexionOriginal('');
      setComplexionEditado('');
      setLongitudPeloOriginal('');
      setLongitudPeloEditado('');
      setColorPeloOriginal('');
      setColorPeloEditado('');
      setRazaOriginal('');
      setRazaEditado('');
      setSexoOriginal('');
      setSexoEditado('');
      setPersonalidadOriginal('');
      setPersonalidadEditado('');
      setOcupacionOriginal('');
      setOcupacionEditado('');
      setReligionOriginal('');
      setReligionEditado('');
      setDescripcionOriginal('');
      setDescripcionEditado('');
      setOtrosOriginal('');
      setOtrosEditado('');
      setEditandoPersonajeId(null);
    }
  }

    // Atajos de teclado para eliminar y cancelar la edición
    useEffect(() => {
      function handleEscape(event) {
        
        // Eliminar el personaje con la tecla Delete
        if (personajeEditadoId !== null && event.key === 'Delete') {
          eliminarPersonaje(personajeEditadoId);
        }

        // Cancelar la edición con la tecla Escape
        if (personajeEditadoId !== null && event.key === 'Escape') {
          cancelarEdicion();
        }
      }

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [personajeEditadoId, nombreEditado, apellidosEditado, fechaNacimientoEditado, lugarNacimientoEditado, alturaEditado, complexionEditado, longitudPeloEditado, colorPeloEditado, 
      razaEditado, sexoEditado, personalidadEditado, ocupacionEditado, religionEditado, descripcionEditado, otrosEditado]);

  // Mostrar la lista de personajes
  return (
    <div>
      <div className='section-title'>
        <h2>{personajes.length > 0 ? 'Personajes' : 'No hay personajes'}</h2>
      </div>
      <ul>
        {Array.isArray(personajes) &&
          personajes.map((personaje) => (
            <li key={personaje.id}>
              <div>
                {personajeEditadoId === personaje.id ? (
                  <form
                    className="personaje-form"
                    onSubmit={(event) => {
                      event.preventDefault(); // Evitar recarga de página
                      guardarPersonajeEditado();
                    }}
                    onKeyDown={(event) => {
                      if (event.ctrlKey && event.key === 'Enter') {
                        event.preventDefault(); // Evitar salto de línea
                        guardarPersonajeEditado();
                      }
                    }}
                  >
                    <label>
                      Nombre:
                      <input
                        type="text"
                        value={nombreEditado}
                        onChange={(event) => setNombreEditado(event.target.value)}
                        autoFocus
                      />
                      <span>{nombreEditado.length}/50</span>
                    </label>
                    <br />
                    <label>
                      Apellidos:
                      <input
                        type="text"
                        value={apellidosEditado}
                        onChange={(event) => setApellidosEditado(event.target.value)}
                      />
                      <span>{apellidosEditado.length}/50</span>
                    </label>
                    <br />
                    <label>
                      Fecha de nacimiento:
                      <input
                        type="text"
                        value={fechaNacimientoEditado}
                        onChange={(event) => setFechaNacimientoEditado(event.target.value)}
                      />
                      <span>{fechaNacimientoEditado.length}/50</span>
                    </label>
                    <br />
                    <label>
                      Lugar de nacimiento:
                      <input
                        type="text"
                        value={lugarNacimientoEditado}
                        onChange={(event) => setLugarNacimientoEditado(event.target.value)}
                      />
                      <span>{lugarNacimientoEditado.length}/50</span>
                    </label>
                    <br />
                    <label>
                      Altura:
                      <input
                        type="text"
                        value={alturaEditado}
                        onChange={(event) => setAlturaEditado(event.target.value)}
                      />
                      <span>{alturaEditado.length}/30</span>
                    </label>
                    <br />
                    <label>
                      Complexión:
                      <input
                        type="text"
                        value={complexionEditado}
                        onChange={(event) => setComplexionEditado(event.target.value)}
                      />
                      <span>{complexionEditado.length}/20</span>
                    </label>
                    <br />
                    <label>
                      Longitud de pelo:
                      <input
                        type="text"
                        value={longitudPeloEditado}
                        onChange={(event) => setLongitudPeloEditado(event.target.value)}
                      />
                      <span>{longitudPeloEditado.length}/20</span>
                    </label>
                    <br />
                    <label>
                      Color del pelo:
                      <input
                        type="text"
                        value={colorPeloEditado}
                        onChange={(event) => setColorPeloEditado(event.target.value)}
                      />
                      <span>{colorPeloEditado.length}/20</span>
                    </label>
                    <br />
                    <label>
                      Raza:
                      <input
                        type="text"
                        value={razaEditado}
                        onChange={(event) => setRazaEditado(event.target.value)}
                      />
                      <span>{razaEditado.length}/50</span>
                    </label>
                    <br />
                    <label>
                      Sexo:
                      <input
                        type="text"
                        value={sexoEditado}
                        onChange={(event) => setSexoEditado(event.target.value)}
                      />
                      <span>{sexoEditado.length}/50</span>
                    </label>
                    <br />
                    <label>
                      Personalidad:
                      <input
                        type="text"
                        value={personalidadEditado}
                        onChange={(event) => setPersonalidadEditado(event.target.value)}
                      />
                      <span>{personalidadEditado.length}/100</span>
                    </label>
                    <br />
                    <label>
                      Ocupación:
                      <input
                        type="text"
                        value={ocupacionEditado}
                        onChange={(event) => setOcupacionEditado(event.target.value)}
                      />
                      <span>{ocupacionEditado.length}/100</span>
                    </label>
                    <br />
                    <label>
                      Religión:
                      <input
                        type="text"
                        value={religionEditado}
                        onChange={(event) => setReligionEditado(event.target.value)}
                      />
                      <span>{religionEditado.length}/100</span>
                    </label>
                    <br />
                    <label>
                      Descripción:
                      <textarea
                        value={descripcionEditado}
                        onChange={(event) => setDescripcionEditado(event.target.value)}
                      />
                      <span>{descripcionEditado.length}</span>
                    </label>
                    <br />
                    <label>
                      Otros...:
                      <textarea
                        value={otrosEditado}
                        onChange={(event) => setOtrosEditado(event.target.value)}
                      />
                      <span>{otrosEditado.length}</span>
                    </label>
                    <br />
                    <p>
                      <span>Creado: {formatearFecha(personaje.fechaCreacion)}</span>
                      <br />
                      {personaje.fechaCreacion !== personaje.fechaModificacion && (
                        <span>Última modificación: {formatearFecha(personaje.fechaModificacion)}</span>
                      )}
                    </p>
                    <p className='message'><strong>{mensaje}</strong></p>
                    <div>
                      <button type="submit">Guardar cambios</button>
                      <button type='button' onClick={cancelarEdicion}>Cancelar</button>
                      <button type='button' onClick={() => eliminarPersonaje(personaje.id)}>Eliminar</button>
                    </div>
                  </form>
                ) : (
                  <span onClick={() => cargarPersonaje(personaje.id)}>
                    <h3>{personaje.nombre} {personaje.apellidos}</h3>
                    <p>
                      {personaje.descripcion.length > 200
                        ? `${personaje.descripcion.slice(0, 200)}...`
                        : personaje.descripcion}
                    </p>
                    <p>
                      <span className='date-info'>
                        {personaje.fechaCreacion !== personaje.fechaModificacion
                          ? `Última modificación: ${formatearFecha(personaje.fechaModificacion)}`
                          : `Creado: ${formatearFecha(personaje.fechaCreacion)}`}
                      </span>
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

export default ListaPersonajes;
