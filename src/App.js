import React, { useState, useEffect } from 'react';
import NuevoCapitulo from './components/Capitulos/NuevoCapitulo';
import ListaCapitulos from './components/Capitulos/ListaCapitulos';
import NuevoPersonaje from './components/Personajes/NuevoPersonaje';
import ListaPersonajes from './components/Personajes/ListaPersonajes';
import Notas from './components/Notas/Notas';
import TituloApp from './components/Titulo/Titulo';

import './App.css';

const PantallaInicio = ({ cambiarPantallaCapitulo, cambiarPantallaPersonaje }) => {
  return (
    <div className='inicio-container'>
      <div><TituloApp /></div>
      <button onClick={cambiarPantallaCapitulo}>Crear un capítulo</button>
      <button onClick={cambiarPantallaPersonaje}>Crear un personaje</button>
      <div className="column-container">
        <div className="lista-capitulos"><ListaCapitulos /></div>
        <div className="lista-personajes"><ListaPersonajes /></div>
        <div className="notas"><Notas /></div>
      </div>
    </div>  
  );
};

const PantallaNuevoCapitulo = ({ goBack }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        goBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goBack]);

  return (
    <div>
      <TituloApp />
      <h2 className='section-titles'>Crear nuevo capítulo</h2>
      <NuevoCapitulo />
      <button onClick={goBack}>Volver</button>
    </div>
  );
};

const PantallaNuevoPersonaje = ({ goBack }) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        goBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goBack]);

  return (
    <div>
      <TituloApp />
      <h2 className='section-titles'>Crear nuevo personaje</h2>
      <NuevoPersonaje />
      <button onClick={goBack}>Volver</button>
    </div>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('inicio');

  const pantallaCrearCapitulo = () => {
    setCurrentScreen('nuevo-capitulo');
  };

  const pantallaCrearPersonaje = () => {
    setCurrentScreen('nuevo-personaje');
  };

  const goBack = () => {
    setCurrentScreen('inicio');
  };

  return (
    <div>
      {currentScreen === 'inicio' && (
        <PantallaInicio
          cambiarPantallaCapitulo={pantallaCrearCapitulo}
          cambiarPantallaPersonaje={pantallaCrearPersonaje}
        />
      )}
      {currentScreen === 'nuevo-capitulo' && <PantallaNuevoCapitulo goBack={goBack} />}
      {currentScreen === 'nuevo-personaje' && <PantallaNuevoPersonaje goBack={goBack} />}
    </div>
  );
};

export default App;
