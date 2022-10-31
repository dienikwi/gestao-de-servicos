import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import cadastro from "../images/cadastro.png";


function FormArea() {

    const [servico, setServico] = useState({ nomeCliente: '', dataInicio: '', dataTermino: '', descricaoServico: '', valorServico: '', valorPago: '', dataPagamento: '' });
    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/api/servico/").then(result => {
            setServicos(result.data);
        });
    }, [atualizar]);

    function handleChange(event) {
        setServico({ ...servico, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/api/servico/", servico).then((result) => {
            setAtualizar(result);
        });
    }

    return (
        <>
            <div className="container">
                <div className="dividir">
                    <figure>
                        <img src={cadastro} alt="Ilustração" />
                    </figure>
                    <div>
                        <h1>Cadastro de Serviços</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="todos-campos">
                                <div className="campos nome">
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
                            </div>
                            <div className="campos bt">
                                <input type="submit" value="Cadastrar"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <h1>Serviços cadastrados</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Status</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map(serv =>
                            <tr>
                                <td><span>{serv.nomeCliente}</span></td>
                                <td>{serv.descricaoServico}</td>
                                <td>{serv.valorServico}</td>
                                <td>{serv.status}</td>
                                <td className="botoes">
                                    <button className="btn btn-primary">Alterar</button>
                                    <button className="btn btn-danger">Excluir</button>
                                    <button className="btn btn-warning">Cancelar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FormArea;