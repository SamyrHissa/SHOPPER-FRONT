import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import GlobalContext from "../../global/GlobalContext";
export const OrderDetailCard = (props) => {
    const {states, requests} = useContext(GlobalContext)
    const history = useHistory()
    useEffect(()=>{
        console.log('aqui')
        requests.getItensOrder(props.orderId)
        requests.getProducts()
    }, [props.orderId]
    )
    
    const getProduct = (id) => {
        
        const result = states.products.filter((product)=>{
          return id === product.id          
        })
        return result
    } 
    const ListaItensPedido = states.itensOrder.map((item)=>{
        console.log('produto',item.product_id, getProduct(item.product_id)[0].name)
        return (
            
            <tr key={item.id} 
            // onClick={() => goToDetailOrderPage(history, pedido.Order_id)}
            >
                
                <td>{getProduct(item.product_id)[0].name}</td>
                <td>{getProduct(item.product_id)[0].price}</td>
                <td>{item.qty_requested}</td>
                <td>{item.qty_requested * getProduct(item.product_id)[0].price}</td>

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
                    <th scope="col">Preço Unitário</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                   {ListaItensPedido}
                </tbody>
                
            </table>
        </div>
        
    )
}