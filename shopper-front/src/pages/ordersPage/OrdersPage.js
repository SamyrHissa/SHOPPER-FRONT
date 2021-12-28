import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency, formatDate } from "../../utils/function";

export const OrdersPage = () => {
    const history = useHistory()
    const {states, requests, functions} = useContext(GlobalContext)
    useEffect(()=>{
        requests.getOrders()
        requests.getProducts()
    }, [])

    const ListaPedidos =  states.orders.map((pedido)=>{
        
        return (
            <tr key={pedido.Order_id} value={pedido.Order_id} onClick={()=>functions.changeOrderSelected(history, pedido)}>
                <th scope="row">{pedido.Cliente}</th>
                <td>{formatDate(pedido.Data_Entrega)}</td>
                <td className="text-right">{formatCurrency(pedido.Valor, 2)}</td>
            </tr>
        )
    })
    return (
        <div className="container-fluid ">
            <div className=" border border-primary rounded p-2">
                <div className="alert alert-light h3 " role="alert">
                    Pedidos
                </div>
                <table className="table table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Data de Entrega</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ListaPedidos}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}