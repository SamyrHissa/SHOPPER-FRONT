import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GlobalContext from "../../global/GlobalContext";
export const CreateOrderForm = () => {
    const history = useHistory()
    const {states, requests} = useContext(GlobalContext)
    
    const [nome, setNome] = useState("")
    const [data, setData] = useState()
    const changeNome = (e) => {
        setNome(e.target.value)
    }
    const changeData = (e) => {
        setData(e.target.value)
    }
    const clear = () => {
        setNome("")
        setData("")
    }
    const onSubmitForm = (event) => {
        event.preventDefault()
        const newOrder = { "name_client": nome,
                           "delivery_date": data
                        }
        requests.createOrder(history, newOrder, clear)
    } 
    return (
        <form onSubmit={onSubmitForm}>
            <div className="container-fluid">
                <div className="form-group">
                    <label for="client_name">Nome do Cliente</label>
                    <input type="text" className="form-control" id="client_name" aria-describedby="clientName_help" placeholder="Nome" 
                        value={nome}
                        onChange={changeNome}
                    />
                    <small id="clientName_help" className="form-text text-muted">Insira o nome do cliente</small>
                </div>
                <div className="form-group">
                    <label for="delivery_date">Data de entrega</label>
                    <input type="date" className="form-control" id="delivery_date" placeholder="data" 
                        value={data}
                        onChange={changeData}
                    />
                </div>
                { (nome !== '') && data ?
                <div className="alert alert-info h5 " role="alert" >
                        <div className="text-center">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                        </div>
                </div> : <></>}
            </div>
            
        </form>
    )
}