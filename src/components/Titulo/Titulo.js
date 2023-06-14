import React from 'react';
import StoryCraftLogo from '../../img/StoryCraftLogo.png';
import './Titulo.css';

function TituloApp() {
  return (
    <div className='logo-container'>
      <img src={StoryCraftLogo} alt='Story Craft Logo' className='logo-image' />
      {/* <h1 className='app-title'>StoryCraft</h1> */}
    </div>
  );
}

export default TituloApp;