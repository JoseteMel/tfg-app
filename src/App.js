import React from 'react';
import TextInput from './components/TextInput';
import MostrarTexto from './components/MostrarTexto';

function App() {
  return (
    <div className="App">
      <TextInput />
      <MostrarTexto />
    </div>
  );
}

// function guardarTexto(texto) {
//   fetch('/texto', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({texto: texto})
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
// }


export default App;
