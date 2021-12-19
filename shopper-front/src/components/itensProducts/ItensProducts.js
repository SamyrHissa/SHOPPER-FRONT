import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency } from "../../utils/function.ts";
import { CapturaQuantidade } from "./capturaQuantidade/CapturaQuantidade";



const ItensProducts = () => {
    const history = useHistory()
    const {states, setters, requests} = useContext(GlobalContext)
    useEffect(()=>{
        requests.getProducts()
    }, [])
    const [quantidade, setQuantidade] = useState(1)
    const [productSelected, setProductSeleted] = useState({})
    const selectionProduct = (item) => {
        setProductSeleted(item)
    }
    // const onChangeQuantidade = (e) => {
    //     setQuantidade(e.target.value)
    // }
    // const onClickIncluir = () => {
    //     const newItem = {
    //         "order_id": states.orderSelected.Order_id,
    //         "product_id": productSelected.id,
    //         "qty_requested": quantidade
    //     }
    //     requests.addItemOrder(history, newItem)
    // }
    // const steepQty = (operacao = "+") => {
        
    //         switch(operacao){
    //             case '+':
    //                 setQuantidade(quantidade + 1)
    //                 break
    //             case '-':
    //                 if(quantidade > 1){
    //                     setQuantidade(quantidade - 1)
    //                 }
    //                 break
    //         }
        
    // }
    // const CapturarQty = () => {
    //     return(
    //         <div class="input-group">
    //             <input type="text" class="form-control" placeholder={productSelected.name} aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" />
    //             <input className="text-right" style={{width: "100px", fontSize: "0.7em"}} placeholder="Quantidade"
    //                 value={quantidade}
    //                 onChange={onChangeQuantidade}
    //             />

    //             <div class="input-group-append" id="button-addon4">
    //                 <button class="btn btn-outline-secondary" type="button" onClick={()=>steepQty('+')}>+</button>
    //                 <button class="btn btn-outline-secondary" type="button" onClick={()=>steepQty('-')}>-</button>
    //                 <button class="btn btn-outline-primary ml-3 mr-2" type="button" onClick={()=>onClickIncluir()}>Incluir</button>
    //                 <button class="btn btn-outline-danger" onClick={()=>setters.setAcaoDetailPage('')} type="button">Cancelar</button>
    //             </div>
    //         </div>
    //     )
    // }
    
    const ListaProdutos = states.products.map((product)=>{
        return(
            <tr key={product.id} value={product.id} 
              onClick={()=>selectionProduct(product)}
            >
                <th class="text-left" scope="row">{product.name}</th>
                <td class="text-right">{product.price}</td>
                <td class="text-right">{formatCurrency(product.qty_stock, 2)}</td>
            </tr>
        )
    })
    return (
        <div class="container-fluid " >
            <div class="alert alert-light h4" role="alert">
                <div>
                    Produtos
                </div>
                <CapturaQuantidade productSelected={productSelected}/>
            </div>
            <table class="table table-bordered table-hover table-sm">
                <thead>
                    <tr>
                    <th class="text-left" scope="col">Nome</th>
                    <th class="text-center" scope="col">preço</th>
                    <th class="text-center" scope="col">estoque</th>
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