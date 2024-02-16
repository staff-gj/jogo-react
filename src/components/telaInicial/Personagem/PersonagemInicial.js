import mago from '../../../imgs/mago.jpeg'
import guerreiro from '../../../imgs/guerreiro.jpeg';
import ladrao from '../../../imgs/ladrao.jpeg';
import clerigo from '../../../imgs/clerigo.jpeg';
import arqueiro from '../../../imgs/arqueiro.jpeg';
import React, { useState, useEffect } from 'react'; 
import styles from '../Personagem/PersonagemInicial.modules.css'
import monstrosData from './monstros.json';

export default function PersonagemInicial(){
  const [imagemPersonagem, setImagemPersonagem] = useState(null);
  const [dadosClasse, setDadosClasse] = useState('');
  const [monstros, setMonstros] = useState([]);
  const [resultadoBatalha, setResultadoBatalha] = useState('');
  const [batalhando, setBatalhando] = useState(false);

  const nivelRecuperado = parseInt(localStorage.getItem("nivelRecuperado")) || 1;
  const forcaRecuperado = parseInt(localStorage.getItem("forcaRecuperado")) || 5;
  const magiaRecuperado = parseInt(localStorage.getItem("magiaRecuperado")) || 5;
  const resistenciaRecuperado = parseInt(localStorage.getItem("resistenciaRecuperado")) || 5;

  const [personagem, setPersonagem] = useState({
    classe: '',
    nivel: nivelRecuperado,
    forca: forcaRecuperado,
    magia: magiaRecuperado,
    resistencia: resistenciaRecuperado
});

const aumentarNivel = () => {
  const novoNivel = personagem.nivel + 1;
  const novaForca = personagem.forca + 2;
  const novaMagia = personagem.magia + 5;
  const novaResistencia = personagem.resistencia + 0.5;
  const novosAtributos = {
      ...personagem,
      nivel: novoNivel,
      forca: novaForca,
      magia: novaMagia,
      resistencia: novaResistencia
  };
  setPersonagem(novosAtributos);
  localStorage.setItem("nivelRecuperado", novosAtributos.nivel);
  localStorage.setItem("forcaRecuperado", novosAtributos.forca);
  localStorage.setItem("magiaRecuperado", novosAtributos.magia);
  localStorage.setItem("resistenciaRecuperado", novosAtributos.resistencia);
  alert("Parabéns por subir de nível! Classe secreta desbloqueada no nível 100!!! Nível atual: " + novoNivel)
};

useEffect(() => {
const classeArmazenada = localStorage.getItem('classe');
setDadosClasse(classeArmazenada);
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

setMonstros(monstrosData);
}, []);

let vidaJogador = personagem.resistencia + personagem.nivel * 20;

const iniciarLuta = async () => {
setBatalhando(true);

const indiceMonstro = Math.floor(Math.random() * monstros.length);
const monstroSelecionado = monstros[indiceMonstro];
let vidaMonstro = monstroSelecionado.pontosDeVida;

while (vidaJogador > 0 && vidaMonstro > 0) {
  // Cálculo do dano do jogador com base na força e na magia
  const danoJogador = calcularDanoAtaque(personagem.forca, personagem.magia, personagem.nivel, personagem.classe, monstroSelecionado.classe, personagem.resistencia);
  vidaMonstro -= danoJogador;

  if (vidaMonstro <= 0) {
    break;
  }

  const danoMonstro = calcularDanoAtaque(monstroSelecionado.forca, monstroSelecionado.magia, monstroSelecionado.nivel, monstroSelecionado.classe, personagem.classe);
  vidaJogador -= danoMonstro;

  await delay(100);
}

if (vidaJogador > 0) {
  setResultadoBatalha(`Você venceu a batalha contra o ${monstroSelecionado.nome}!`);
  aumentarNivel();
  localStorage.setItem("classe", personagem);
} else if (vidaMonstro > 0) {
  setResultadoBatalha(`Você foi derrotado pelo ${monstroSelecionado.nome}.`);
} else {
  setResultadoBatalha('A batalha terminou em empate.');
}

setBatalhando(false);
};

const calcularDanoAtaque = (forca, magia, nivel, classeJogador, classeMonstro, resistencia) => {
let dano = forca + magia + resistencia;
if (nivelRecuperado <= 4) {
    dano *= 10;
}else if(classeMonstro == 'iniciante'){
    dano *= 50
} else {
  dano *= 0.5;
}
return Math.floor(dano);
};


const delay = (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
};
return (
  <div className={'container'}>
    <div>
        <p className={'paraPersonagem'}>Personagens: </p>
        {resultadoBatalha && <p>{resultadoBatalha}</p>}
        <button className={'buttonLuta'} onClick={iniciarLuta} disabled={batalhando}>
        {batalhando ? 'Lutando...' : 'Iniciar Luta'}
        </button>
        <p>Nível: {nivelRecuperado}</p>
        <p>Classe: {dadosClasse}</p>
        <p>Atributos:</p>
        <p>Magia: {personagem.magia}</p>
        <p>Força: {personagem.forca}</p>
        <p>Resistencia: {personagem.resistencia}</p>
        <p>Vida: {vidaJogador}</p>
        {imagemPersonagem && (
        <img className={'imagemPersonagem'} src={imagemPersonagem} alt="Personagem" />
        )}

    </div>
    <div>
      <h3>Monstros:</h3>
      <ul className="monstros-list">
        {monstros.map((monstro, index) => (
          <li key={index} className="monstros-item">
            <p className="monstros-nome">Nome: {monstro.nome}</p>
            <div className="monstros-info">
              <p>Pontos de Vida: {monstro.pontosDeVida}</p>
              <p>Ataque: {monstro.ataque}</p>
              <p>Defesa: {monstro.defesa}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

