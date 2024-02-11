import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import mago from './imgs/mago.jpeg'
import guerreiro from './imgs/guerreiro.jpeg';
import ladrao from './imgs/ladrao.jpeg';
import clerigo from './imgs/clerigo.jpeg';
import arqueiro from './imgs/arqueiro.jpeg';

function App() {
  const [imagemPersonagem, setImagemPersonagem] = useState(null);
  const [dadosClasse, setDadosClasse] = useState('');
  const [atributos, setAtributos] = useState('');

  // Objeto que mapeia as classes aos seus atributos
  const atributosPorClasse = {
    mago: 'Força: 5, Magia: 15, Resistência: 8',
    guerreiro: 'Força: 12, Magia: 3, Resistência: 10',
    ladrao: 'Força: 8, Magia: 5, Resistência: 7',
    clerigo: 'Força: 10, Magia: 12, Resistência: 9',
    arqueiro: 'Força: 9, Magia: 7, Resistência: 8'
  };

  useEffect(() => {
    const classeArmazenada = localStorage.getItem('classe');
    setDadosClasse(classeArmazenada);
    setAtributos(atributosPorClasse[classeArmazenada] || '');
    switch (classeArmazenada) {
      case 'mago':
        setImagemPersonagem(mago);
        break;
      case 'guerreiro':
        setImagemPersonagem(guerreiro);
        break;
      case 'ladrao':
        setImagemPersonagem(ladrao);
        break;
      case 'clerigo':
        setImagemPersonagem(clerigo);
        break;
      case 'arqueiro':
        setImagemPersonagem(arqueiro);
        break;
      default:
        setImagemPersonagem(null);
    }
  }, []);

  return (
    <div>
      <Link to="/escolhapersonagem">Ir para escolha de personagem</Link>
      <h1>Tela inicial</h1>
      <p>Personagens: </p>
      <p>Classe: {dadosClasse}</p>
      <p>Atributos: {atributos}</p>
      {imagemPersonagem && <img src={imagemPersonagem} alt="Personagem" />}
    </div>
  );
}

export default App;