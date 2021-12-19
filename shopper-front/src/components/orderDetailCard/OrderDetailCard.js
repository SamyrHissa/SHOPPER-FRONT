import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency } from "../../utils/function.ts";
export const OrderDetailCard = () => {
    const {states, requests} = useContext(GlobalContext)
    const history = useHistory()
    
    const getProduct = (id) => {
        const result = states.products.filter((product)=>{
          return id === product.id          
        })
        return result
    } 
    
    const ListaItensPedido =  states.itensOrder.map((item)=>{
        
        return (
            <tr key={item.id} >
                <td>{getProduct(item.product_id)[0].name}</td>
                <td class="text-right">{formatCurrency(getProduct(item.product_id)[0].price, 2)}</td>
                <td class="text-right">{formatCurrency(item.qty_requested, 3)}</td>
                <td class="text-right">{formatCurrency(item.qty_requested * getProduct(item.product_id)[0].price, 2)}</td>

                

                {/* <td>{pedido.Data_Entrega}</td> */}
                {/* <td>{pedido.Valor}</td> */}
            </tr>
        )
    })
    return(
        <div>
            <div class="container-fluid">
                <p class="text-center text-white bg-secondary">Detalhe do pedido</p>
            </div>
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                    <th scope="col">Produto</th>
                    <th scope="col" class="text-center">Preço Unitário</th>
                    <th scope="col" class="text-center">Quantidade</th>
                    <th scope="col" class="text-center">Total</th>
                    </tr>
                </thead>
                <tbody>
                   {ListaItensPedido}
                </tbody>
                
            </table>
        </div>
        
    )
}