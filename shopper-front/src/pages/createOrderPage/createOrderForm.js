import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ItensProdutos from "../../components/itensProducts/ItensProducts";
import GlobalContext from "../../global/GlobalContext";
import useForm from "../../hooks/useForm";
import { formatDate } from "../../utils/function.ts";
export const CreateOrderForm = () => {
    const {states, requests} = useContext(GlobalContext)
    
    const [nome, setNome] = useState("")
    const [data, setData] = useState(new Date())
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
        console.log('aqui')
        requests.createOrder({ name_client: nome,
                               delivery_date: formatDate(data) }, clear)
      } 
    return (
        <form onSubmit={onSubmitForm}>
            <div class="container-fluid">
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
                <ItensProdutos />
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
            
        </form>
    )
}