import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency, formatDate } from "../../utils/function.ts";



const ItensProducts = () => {
    const history = useHistory()
    const {states, requests} = useContext(GlobalContext)
    useEffect(()=>{
        // requests.getProducts()
    }, [])
    const [itensOrder, setItensOrder] = useState([])
    const addItemOrder = (item) => {
        
    }
    
    const ListaProdutos = states.products.map((product)=>{
        return(
            <tr key={product.id} value={product.id} 
            
            >
                <th scope="row">{product.name}</th>
                <td>{product.price}</td>
                <td class="text-right">{formatCurrency(product.qty_stock, 2)}</td>
            </tr>
        )
    })
    return (
        <div class="container-fluid " >
            <div class="alert alert-light h4" role="alert">
                Produtos
            </div>
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">preço</th>
                    <th scope="col">estoque</th>
                    </tr>
                </thead>
                <tbody>
                {ListaProdutos}
                </tbody>
            </table>
        </div>
    )
}

export default ItensProducts