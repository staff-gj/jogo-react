import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import PersonagemInicial from './components/telaInicial/Personagem/PersonagemInicial';

function App() {

  return (
    <div>
      <Link to="/escolhapersonagem">Ir para escolha de personagem</Link>
      <h1>Tela inicial</h1>
      <PersonagemInicial/>
    </div>
  );
}

export default App;