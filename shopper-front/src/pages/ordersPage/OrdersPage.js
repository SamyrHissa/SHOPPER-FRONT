import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrderDetailCard } from "../../components/orderDetailCard/OrderDetailCard";
import GlobalContext from "../../global/GlobalContext";
export const OrdersPage = () => {
    const history = useHistory()
    const {states, requests} = useContext(GlobalContext)
    useEffect(()=>{
        requests.getOrders()
        setPedidoSelecionado(states.orders[0])
    },[])
    const [pedidoSelecionado, setPedidoSelecionado] = useState();
    const changePedidoSelecionado = (pedido) => {
        setPedidoSelecionado(pedido)
    }
    const ListaPedidos =  states.orders.map((pedido)=>{
        return (
            
            <tr key={pedido.Order_id} value={pedido.Order_id} onClick={()=>changePedidoSelecionado(pedido)}>
                <th scope="row">{pedido.Cliente}</th>
                <td>{pedido.Data_Entrega}</td>
                <td>{pedido.Valor}</td>
            </tr>
        )
    })
    return (
        
        <div class="container-fluid">
            <div class="alert alert-light h3" role="alert">
                Pedidos
            </div>
            <table class="table table-bordered table-hover table-sm">
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
            {pedidoSelecionado ? <div>
                                    <div className="alert alert-info h5" role="alert">
                                        Itens do pedido de {pedidoSelecionado ? pedidoSelecionado.Cliente : ""}
                                    </div>
                                    <OrderDetailCard orderId={pedidoSelecionado.Order_id} />
                                </div> : <></>}
            
      </div>
        
    )
}