import React, { useState } from 'react';
import { Link } from "react-router-dom";
import mago from '../../imgs/mago.jpeg';
import guerreiro from '../../imgs/guerreiro.jpeg';
import ladrao from '../../imgs/ladrao.jpeg';
import clerigo from '../../imgs/clerigo.jpeg';
import arqueiro from '../../imgs/arqueiro.jpeg';

export default function EscolhaPersonagem() {
    const [classe, setClasse] = useState('');
    const [atributos, setAtributos] = useState('');

    const classEscolhar = (event) => {
        setClasse(event.target.value);
        setAtributos(getAtributos(event.target.value));
    };

    const getAtributos = (classe) => {
        switch (classe) {
            case 'mago':
                return 'Mago:\n Força: 5, Magia: 15, Resistência: 8';
            case 'guerreiro':
                return 'Guerreiro:\n Força: 12, Magia: 3, Resistência: 10';
            case 'ladrao':
                return 'Ladrao:\n Força: 8, Magia: 5, Resistência: 7';
            case 'clerigo':
                return 'Clerigo:\n Força: 10, Magia: 12, Resistência: 9';
            case 'arqueiro':
                return 'Arqueiro:\n Força: 9, Magia: 7, Resistência: 8';
            default:
                return 'Selecione uma classe para ver os atributos.';
        }
    };

    function escolherPersonagem() {
        console.log(`Sua classe escolhida é:\n${classe}`);
        localStorage.setItem("classe", classe);
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
        <div>
            <Link to={"/"}>Ir para escolha de personagem</Link>
            <h2>Escolha sua classe:</h2>
            <select value={classe} onChange={classEscolhar}>
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
