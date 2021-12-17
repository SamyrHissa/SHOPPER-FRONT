import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrderDetailCard } from "../../components/orderDetailCard/OrderDetailCard";
import GlobalContext from "../../global/GlobalContext";
import { goToDetailOrderPage } from "../../routers/coordinator";
export const OrdersPage = () => {
    const history = useHistory()
    const {states, requests} = useContext(GlobalContext)
    useEffect(()=>{
        requests.getOrders()
    },[])
    const [pedidoSelecionado, setPedidoSelecionado] = useState();
    const changePedidoSelecionado = (pedido) => {
        setPedidoSelecionado(pedido)
        console.log('passei aqui', pedido)
    }
    const ListaPedidos = states.orders.map((pedido)=>{
        // console.log('pedido.Order_id', pedido.Order_id)
        return (
            
            <tr key={pedido.Order_id} value={pedido.Order_id}
                // onClick={() => goToDetailOrderPage(history, pedido.Order_id)}
                onClick={()=>changePedidoSelecionado(pedido)}
                >
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
            <div class="alert alert-info h5" role="alert">
                Itens do pedido de 
                {/* {pedidoSelecionado.Cliente} */}
            </div>
            <OrderDetailCard orderId={pedidoSelecionado.Order_id} />
      </div>
        
    )
}