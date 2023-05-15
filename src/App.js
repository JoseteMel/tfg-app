import React from 'react';
import ListaCapitulos from './components/ListaCapitulos';
import NuevoCapitulo from './components/NuevoCapitulo';

function App() {
  return (
    <div className="App">
      <NuevoCapitulo />
      <ListaCapitulos />
    </div>
  );
}

export default App;
