import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";
import { goToDetailOrderPage } from "../../routers/coordinator";
export const OrdersPage = () => {
    const history = useHistory()

    // const pedidos = [
    //     {
    //         "id": "1",
    //         "name_client": "Samyr",
    //         "delivery_date": "10/12/2021",
    //         "valor": 5000
    //     },
    //     {
    //         "id": "2",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "3",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "4",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "5",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "6",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "7",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "8",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "9",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "10",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "11",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "12",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "13",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "14",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "15",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "16",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "17",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "18",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     },
    //     {
    //         "id": "19",
    //         "name_client": "Carla",
    //         "delivery_date": "15/12/2021",
    //         "valor": 2500
    //     }
    // ]
    const {states, requests} = useContext(GlobalContext)
    useEffect(()=>{
        requests.getOrders()
    },[])
    
    const ListaPedidos = states.orders.map((pedido)=>{
        return (
            
            <tr key={pedido.Order_id} onClick={() => goToDetailOrderPage(history, pedido.Order_id)}>
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
      </div>
        
    )
}