import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';


function FormArea() {

    const [servico, setServico] = useState({ nomeCliente: '', dataInicio: '', dataTermino: '', descricaoServico: '', valorServico:'', valorPago: '', dataPagamento: '' });
    const [servicos, setServicos] = useState([]);

    function handleChange(event) {
        setServico({ ...servico, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/api/servico/", servico).then((result => {
            console.log(result);
        }));
    }

    return (
        <div className="container">
            <h1>Cadastro de Serviços</h1>
            <form onSubmit={handleSubmit}>
                <div className="campos">
                    <label>Nome do cliente: </label>
                    <input onChange={handleChange} value={servico.nomeCliente} name="nomeCliente" type="text" placeholder="Digite seu nome..." ></input>
                </div>
                <div className="campos">
                    <label>Data de início: </label>
                    <input onChange={handleChange} value={servico.dataInicio} name="dataInicio" type="date"></input>
                </div>
                <div className="campos">
                    <label>Data de termino: </label>
                    <input onChange={handleChange} value={servico.dataTermino} name="dataTermino" type="date"></input>
                </div>
                <div className="campos">
                    <label>Descrição do serviço: </label>
                    <input onChange={handleChange} value={servico.descricaoServico} name="descricaoServico" type="text" placeholder="O que você está oferencendo..."></input>
                </div>
                <div className="campos">
                    <label>Valor do serviço: </label>
                    <input onChange={handleChange} value={servico.valorServico} name="valorServico" type="number" placeholder="Valor do seu serviço..."></input>
                </div>
                <div className="campos">
                    <label>Valor pago: </label>
                    <input onChange={handleChange} value={servico.valorPago} name="valorPago" type="number" placeholder="O que você está oferencendo..."></input>
                </div>
                <div className="campos">
                    <label>Data de pagamento: </label>
                    <input onChange={handleChange} value={servico.dataPagamento} name="dataPagamento" type="date"></input>
                </div>
                <div className="campos">
                    <input className="bt" type="submit" value="Cadastrar"></input>
                </div>
            </form>
        </div>
    );
}

export default FormArea;