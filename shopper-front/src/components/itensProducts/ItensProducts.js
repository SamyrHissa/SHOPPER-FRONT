import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency } from "../../utils/function";
import { CapturaQuantidade } from "../capturaQuantidade/CapturaQuantidade";



const ItensProducts = () => {
    const history = useHistory()
    const {states, setters, requests} = useContext(GlobalContext)
    useEffect(()=>{
        requests.getProducts()
    }, [])
    const [quantidade, setQuantidade] = useState(1)
    const [productSelected, setProductSeleted] = useState({})
    const selectionProduct = (produto) => {
        setters.setProductSelected(produto)
    }
    
    
    const ListaProdutos = states.products.map((product)=>{
        return(
            <tr key={product.id} value={product.id} 
              onClick={()=>selectionProduct(product)}
            >
                <th className="text-left" scope="row">{product.name}</th>
                <td className="text-right">{formatCurrency(product.price, 2)}</td>
                <td className="text-right">{formatCurrency(product.qty_stock, 2)}</td>
            </tr>
        )
    })
    return (
        <div className="container-fluid " >
            <div className="alert alert-light h4" role="alert">
                <div>
                    Produtos
                </div>
                <CapturaQuantidade />
            </div>
            <table className="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                    <th className="text-left" scope="col">Nome</th>
                    <th className="text-center" scope="col">preço</th>
                    <th className="text-center" scope="col">estoque</th>
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