import React, { useState } from 'react';
import { Link } from "react-router-dom";
import mago from '../../imgs/mago.jpeg';
import guerreiro from '../../imgs/guerreiro.jpeg';
import ladrao from '../../imgs/ladrao.jpeg';
import clerigo from '../../imgs/clerigo.jpeg';
import arqueiro from '../../imgs/arqueiro.jpeg';
import styles from '../telaInicial/EscolhaPersonagem.modules.css'
import personagensData from './Personagem/personagem.json'

export default function EscolhaPersonagem() {
    const [classe, setClasse] = useState('');
    const [atributos, setAtributos] = useState('');

    const classEscolhar = (event) => {
        const classeSelecionada = event.target.value;
        setClasse(classeSelecionada);
        setAtributos(getAtributos(classeSelecionada));
    };

    const getAtributos = (classe) => {
        const atributosClasse = personagensData[classe];
        return `Força: ${atributosClasse.forca}, Magia: ${atributosClasse.magia}, Resistência: ${atributosClasse.resistencia}`;
    };

    function escolherPersonagem() {
        console.log(`Sua classe escolhida é:\n${classe}`);
        localStorage.setItem("classe", classe);
        window.location = '/'
    }

    let imagem;
    if (classe === 'mago') {
        imagem = <img src={mago} alt="Mago" />;
    } else if (classe === 'guerreiro') {
        imagem = <img src={guerreiro} alt="Guerreiro" />;
    } else if (classe === 'ladrao') {
        imagem = <img src={ladrao} alt="Ladrão" />;
    } else if (classe === 'clerigo') {
        imagem = <img src={clerigo} alt="Clérigo" />;
    } else if (classe === 'arqueiro') {
        imagem = <img src={arqueiro} alt="Arqueiro" />;
    } else {
        imagem = null;
    }

    return (
            <div className={'container'}>
                <Link className={'link'} to={"/"}>Ir para tela</Link>
                <h2>Escolha sua classe:</h2>
                <select className={'select'} value={classe} onChange={classEscolhar}>
                    <option value="mago">Mago</option>
                    <option value="guerreiro">Guerreiro</option>
                    <option value="ladrao">Ladrão</option>
                    <option value="clerigo">Clérigo</option>
                    <option value="arqueiro">Arqueiro</option>
                </select>
                <div>
                    <h3>Atributos:</h3>
                    <p>{atributos}</p>
                    {imagem}
                    <button type="submit" onClick={escolherPersonagem}>Escolher</button>
                </div>
            </div>
    );
}
