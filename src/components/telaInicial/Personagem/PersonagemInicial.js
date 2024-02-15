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
    const [atributos, setAtributos] = useState('');
    const [monstros, setMonstros] = useState([]);
    const [resultadoBatalha, setResultadoBatalha] = useState('');
    const [batalhando, setBatalhando] = useState(false);

    const nivelRecuperado = parseInt(localStorage.getItem("nivelRecuperado")) || 1;
    const forcaRecuperado = parseInt(localStorage.getItem("forcaRecuperado")) || 5;
    const magiaRecuperado = parseInt(localStorage.getItem("magiaRecuperado")) || 5;
    const resistenciaRecuperado = parseInt(localStorage.getItem("resistenciaRecuperado")) || 5;
    
    


    const [personagem, setPersonagem] = useState({
      classe: '',
      nivel: nivelRecuperado || 1,
      forca: forcaRecuperado || 5,
      magia: magiaRecuperado || 5,
      resistencia: resistenciaRecuperado || 5
  });

  const aumentarNivel = () => {
    let novoNivel = personagem.nivel + 1;
    let novaForca = personagem.forca + 2
    let novaMagia = personagem.magia + 5
    let novaResistencia = personagem.resistencia + 0.5
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
    console.log("força: " + novosAtributos.forca)
    alert("parabens por subir de nivel! Classe secreta desbloqueada no nivel 100!!! Nivel atual: " + novoNivel)

};
  
    useEffect(() => {
      const classeArmazenada = localStorage.getItem('classe');
      setDadosClasse(classeArmazenada);
      setAtributos(personagem[classeArmazenada] || '');
  
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
  
    let vidaJogador = personagem.resistencia + personagem.nivel * 2000;
    const iniciarLuta = async () => {
      setBatalhando(true);
    
      const indiceMonstro = Math.floor(Math.random() * monstros.length);
      const monstroSelecionado = monstros[indiceMonstro];
      let vidaMonstro = monstroSelecionado.pontosDeVida;
    
      while (vidaJogador > 0 && vidaMonstro > 0) {
        // Cálculo do dano do jogador com base na força e na magia
        const danoJogador = calcularDanoAtaque(personagem.forca, personagem.magia, personagem.nivel);
        vidaMonstro -= danoJogador;
    
        if (vidaMonstro <= 0) {
          break;
        }
    
        // Cálculo do dano do monstro com base na força e na magia do monstro
        const danoMonstro = calcularDanoAtaque(monstroSelecionado.forca, monstroSelecionado.magia, monstroSelecionado.nivel);
        vidaJogador -= danoMonstro;
    
        await delay(1000); // Aguardar 1 segundo antes do próximo ataque
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
    
    const calcularDanoAtaque = (forca, magia, nivel) => {
      // O dano é calculado como a soma da força e da magia, multiplicado pelo nível do personagem ou do monstro
      const dano = 1000;
      if(nivelRecuperado <= 4){
        return Math.floor(dano * 500);
      }else{
        return Math.floor(dano * 0.5);
      }
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
            <p>Nivel: {nivelRecuperado}</p>
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
  
        {/* Exibindo os monstros */}
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
