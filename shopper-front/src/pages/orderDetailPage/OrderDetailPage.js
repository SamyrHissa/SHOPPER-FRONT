import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ItensProducts from "../../components/itensProducts/ItensProducts";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency, formatDate } from "../../utils/function.ts";
export const OrderDetailPage = () => {
    const {states, setters, requests} = useContext(GlobalContext)
    const params = useParams();
    const history = useHistory()
    useEffect(()=>{
        requests.getProducts()
    }, [])   
    useEffect(()=>{
        requests.getItensOrder(params.orderId)
    }, [])

    // const [acaoItem, setAcaoItem] = useState('')
    const [itemSelecionado, setItemSelecionado] = useState({})
    const [inputQty, setInputQty] = useState()

    const getTotal = () => {
        let result = 0
        for(let item of states.itensOrder){
            result = result + (item.qty_requested * getProduct(item.product_id)[0].price)
        }
        return result
    }
    const onChangeInputQty = (e) => {
        setInputQty(e.target.value)
        const newItemSelecioando = {...itemSelecionado,qty_requested: Number(e.target.value)}
        setItemSelecionado(newItemSelecioando)
    }
    const alterarQtyItem = (item) => {
        setItemSelecionado(item)
        setInputQty(item.qty_requested)
        setters.setAcaoDetailPage('Alterar')
    }
    const onClickEnviar = () => {
        const alterItem = {"item_id": itemSelecionado.id,
                            "qty_alter": itemSelecionado.qty_requested
                            }
        requests.alterItemOrder(history, alterItem)
        
        setters.setsetAcaoDetailPage('')
    }
    const onClickCancelar = () => {
        setters.setAcaoDetailPage('')
    }
    const onClickIncluir = () => {
        setters.setAcaoDetailPage('Incluir')
        console.log('incluir');
    }
    const getProduct = (id) => {
        const result = states.products.filter((product)=>{
          return id === product.id          
        })
        return result
    } 
    const ListaItensPedido = states.itensOrder ? states.itensOrder.map((item)=>{
        console.log('item - ', item)
        return (
            <tr key={item.id} >
                <td class="text-center">
                    <button  type="button" class="btn btn-danger btn-sm" onClick={()=>requests.deleteItemOrder(history, item.id)}>Excluir</button>
                    <button  type="button" class="btn btn-primary btn-sm ml-2" onClick={()=>onClickIncluir()}>Incluir</button>
                </td>
                <td onClick={()=>alterarQtyItem(item)}>{getProduct(item.product_id)[0].name}</td>
                <td onClick={()=>alterarQtyItem(item)} class="text-right">{formatCurrency(getProduct(item.product_id)[0].price, 2)}</td>
                <td onClick={()=>alterarQtyItem(item)} class="text-right">{formatCurrency(item.qty_requested, 2)}</td>
                <td onClick={()=>alterarQtyItem(item)} class="text-right">{formatCurrency(item.qty_requested * getProduct(item.product_id)[0].price, 2)}</td>
            </tr>
        )
    }) : <></>
    return(
        
        <div class="container-fluid">
            <div className=" border border-primary rounded p-2">
                <div className="alert alert-info h5 " role="alert" >
                    <div class="clearfix ">
                    <div class="float-left">
                        Itens do pedido de {states.orderSelected.Cliente}, para entregar em {formatDate(states.orderSelected.Data_Entrega)}
                    </div>
                    <div class="float-right">
                        Total R$ {formatCurrency(getTotal(), 2)}
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
                    {states.acaoDetailPage === 'Alterar' ? 
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
                                        {formatCurrency(itemSelecionado.qty_requested * getProduct(itemSelecionado.product_id)[0].price, 2)}
                                    </span>
                                </div>

                            </div>
                            <button type="button " class="btn btn-primary mt-4 mb-1" 
                                onClick={()=>onClickEnviar()}
                                >Enviar
                            </button>
                            <button type="button " class="btn btn-secondary mt-4 mb-1 ml-4" 
                                onClick={()=>onClickCancelar()}
                                >Cancel
                            </button>
                            {getProduct(itemSelecionado.product_id)[0].qty_stock < itemSelecionado.qty_requested ? <div class="alert alert-danger" role="alert">
                                Quantidade maior que o estoque ({getProduct(itemSelecionado.product_id)[0].qty_stock})!
                            </div> : <></> }
                        </div> : states.acaoDetailPage === 'Incluir' ? <ItensProducts />
                        : <></>}
                </div>
                
            </div>
        </div>
        
        
    )
}