import React, { useState } from 'react';
import NuevoCapitulo from './components/Capitulos/NuevoCapitulo';
import ListaCapitulos from './components/Capitulos/ListaCapitulos';
import NuevoPersonaje from './components/Personajes/NuevoPersonaje';
import ListaPersonajes from './components/Personajes/ListaPersonajes';
import './App.css';

const PantallaInicio = ({ cambiarPantallaCapitulo, cambiarPantallaPersonaje }) => {
  return (
    <div>
      <h1>Inicio</h1>
      <button onClick={cambiarPantallaCapitulo}>Crear un nuevo capítulo</button>
      <button onClick={cambiarPantallaPersonaje}>Crear un nuevo personaje</button>
      <div className="container">
        <div className="lista-capitulos"><ListaCapitulos /></div>
        <div className="lista-personajes"><ListaPersonajes /></div>
      </div>
    </div>  
  );
};

const PantallaNuevoCapitulo = ({ goBack }) => {
  return (
    <div>
      <h2>Crear nuevo capítulo</h2>
      <NuevoCapitulo />
      <button onClick={goBack}>Volver</button>
    </div>
  );
};

const PantallaNuevoPersonaje = ({ goBack }) => {
  return (
    <div>
      <h2>Crear nuevo personaje</h2>
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
