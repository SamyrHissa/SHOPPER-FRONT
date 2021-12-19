import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency, formatDate } from "../../utils/function.ts";
export const OrderDetailPage = () => {
    const {states, requests} = useContext(GlobalContext)
    const params = useParams();
    const history = useHistory()
    
    useEffect(()=>{
        requests.getItensOrder(params.orderId)
        // requests.getProducts()
    })
    const [alterarItem, setAlterarItem] = useState(false)
    const [itemSelecionado, setItemSelecionado] = useState({})
    const [inputQty, setInputQty] = useState()
    const onChangeInputQty = (e) => {
        setInputQty(e.target.value)
        const newItemSelecioando = {...itemSelecionado,qty_requested: Number(e.target.value)}

        setItemSelecionado(newItemSelecioando)
    }
    const mudarQtyItem = (item) => {
        setItemSelecionado(item)
        setInputQty(item.qty_requested)
        setAlterarItem(true)
    }
    const onClickEnviar = () => {
        requests.alterItemOrder(history, itemSelecionado)
    }
    const getProduct = (id) => {
        const result = states.products.filter((product)=>{
          return id === product.id          
        })
        return result
    } 
    const ListaItensPedido = states.itensOrder.map((item)=>{
        console.log('item', item);
        return (
            <tr key={item.id} >
                <td><button  type="button" class="btn btn-danger btn-sm"
                    onClick={()=>requests.deleteItemOrder(history, item.id)}
                >Excluir</button></td>
                <td onClick={()=>mudarQtyItem(item)}>{getProduct(item.product_id)[0].name}</td>
                <td onClick={()=>mudarQtyItem(item)} class="text-right">{formatCurrency(getProduct(item.product_id)[0].price)}</td>
                <td onClick={()=>mudarQtyItem(item)} class="text-right">{formatCurrency(item.qty_requested)}</td>
                <td onClick={()=>mudarQtyItem(item)} class="text-right">{formatCurrency(item.qty_requested * getProduct(item.product_id)[0].price)}</td>
            </tr>
        )
    })
    //  : <></>
    return(
        
        <div class="container-fluid">
            <div className=" border border-primary rounded p-2">
                <div className="alert alert-info h5 " role="alert" >
                    <div class="clearfix ">
                    <div class="float-left">
                        Itens do pedido de {states.orderSelected.Cliente}, para entregar em {formatDate(states.orderSelected.Data_Entrega)}
                    </div>
                    <div class="float-right">
                        Total R$ {formatCurrency(states.orderSelected.Valor,2)}
                    </div>
                    </div>
                    
                </div>
                <table class="table table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Excluir</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Preço Unitário</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListaItensPedido}
                    </tbody>
                    
                </table>
                <div class="mx-auto " style={{textAlign: "center"}}>
                    {alterarItem ? 
                        <div className=" border border-primary rounded p-2" >
                            <div class="input-group" >
                                <input type="text" class="form-control" 
                                    value={inputQty}
                                    onChange={onChangeInputQty}
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text">R$</span>
                                    <span class="input-group-text">
                                        {/* {getProduct(itemSelecionado.product_id)[0].price} */}
                                        {formatCurrency(itemSelecionado.qty_requested * getProduct(itemSelecionado.product_id)[0].price)}
                                    </span>
                                </div>

                            </div>
                            <button type="button " class="btn btn-primary mt-4 mb-1" 
                                onClick={()=>onClickEnviar()}
                            >Enviar</button>
                            {getProduct(itemSelecionado.product_id)[0].qty_stock < itemSelecionado.qty_requested ? <div class="alert alert-danger" role="alert">
                                Quantidade maior que o estoque ({getProduct(itemSelecionado.product_id)[0].qty_stock})!
                            </div> : <></> }
                        </div> : <></>}
                </div>
                
            </div>
        </div>
        
        
    )
}