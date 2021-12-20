import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { CapturaQuantidade } from "../../components/capturaQuantidade/CapturaQuantidade";
import ItensProducts from "../../components/itensProducts/ItensProducts";
import GlobalContext from "../../global/GlobalContext";
import { formatCurrency, formatDate } from "../../utils/function";
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

    const getTotal = () => {
        let result = 0
        for(let item of states.itensOrder){
            result = result + (item.qty_requested * getProduct(item.product_id)[0].price)
        }
        return result
    }

    const onClickIncluir = () => {
        setters.setAcaoDetailPage('Incluir')
    }
    const getProduct = (id) => {
        const result = states.products.filter((product)=>{
          return id === product.id          
        })
        return result
    }
    const onClickAlterar = (item) => {
        const produtoItem = {
            "id": item.product_id,
            "item_id": item.id,
            "qty_requested": item.qty_requested
        }
        setters.setProductSelected(produtoItem)
        setters.setAcaoDetailPage('Alterar')
    }
    const ListaItensPedido = states.itensOrder ? states.itensOrder.map((item)=>{
        return (
            <tr key={item.id} >
                <td className="text-center">
                    <button  type="button" className="btn btn-danger btn-sm" onClick={()=>requests.deleteItemOrder(history, item.id)}>Excluir</button>
                    <button  type="button" className="btn btn-primary btn-sm ml-2" onClick={()=>onClickAlterar(item)}>Alterar</button>
                </td>
                <td 
                >{getProduct(item.product_id)[0].name}</td>
                <td  className="text-right">{formatCurrency(getProduct(item.product_id)[0].price, 2)}</td>
                <td  className="text-right">{formatCurrency(item.qty_requested, 2)}</td>
                <td  className="text-right">{formatCurrency(item.qty_requested * getProduct(item.product_id)[0].price, 2)}</td>
            </tr>
        )
    }) : <></>
    return(
        
        <div className="container-fluid">
            <div className=" border border-primary rounded p-2">
                <div className="alert alert-info h5 " role="alert" >
                    <div className="clearfix ">
                    <div className="float-left">
                        Itens do pedido de {states.orderSelected.Cliente}, para entregar em {formatDate(states.orderSelected.Data_Entrega)}
                    </div>
                    <div className="float-right">
                        Total R$ {formatCurrency(getTotal(), 2)}
                    </div>
                    </div>
                </div>
                <table className="table table-bordered table-hover table-sm">
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
                <div className="mx-auto " style={{textAlign: "center"}}>
                    {states.acaoDetailPage === 'Incluir' ? <ItensProducts /> :
                        states.acaoDetailPage === 'Alterar' ? <CapturaQuantidade />
                        : <></>}
                </div>
                {states.acaoDetailPage !== 'Incluir' ?
                <div className="alert alert-info h5 " role="alert" >
                        <div className="text-center">
                            <button  type="button" className="btn btn-primary " onClick={()=>onClickIncluir()}>Incluir</button>
                        </div>
                </div> : <></>}
            </div>
        </div>
        
        
    )
}