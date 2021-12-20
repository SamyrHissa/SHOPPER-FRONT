import GlobalContext from "./GlobalContext"
import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { useState } from "react"
import { goToOrderDetailPage, goToOrdersPage } from "../routers/coordinator"


const GlobalStatesContext = (props) => {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [itensOrder, setItensOrder] = useState([])
    const [orderSelected, setOrderSelected] = useState({})
    const [productSelected, setProductSelected] = useState()
    const [acaoDetailPage, setAcaoDetailPage] = useState("")

    const changeOrderSelected = (history, order) => {
        setOrderSelected(order)
        goToOrderDetailPage(history, order.Order_id)
    }
    const getOrders = () => {
        axios
            .get(`${BASE_URL}/orders`)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    const getItensOrder = (order_id) => {
        axios
            .get(`${BASE_URL}/orders/itens/${order_id}`)
            .then((res) => {
                setItensOrder(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProducts = () => {
        axios
            .get(`${BASE_URL}/products`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const createOrder = (history, body, clear) => {
        
        axios
            .post(`${BASE_URL}/orders`, body)
            .then((res) => {
                console.log(res.data)
                clear()
                const newOrder = {
                    "Order_id": res.data.id,
                    "Cliente": body.name_client,
                    "Data_Entrega": body.delivery_date,
                    "Valor": 0
                }
                setOrderSelected(newOrder)
                goToOrderDetailPage(history, res.data.id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addItemOrder = (history, body) => {
        axios
            .post(`${BASE_URL}/orders/itens`, body)
            .then((res) => {
                console.log(res.data)
                const newItensOrder = [...itensOrder, body]
                setItensOrder(newItensOrder)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const alterItemOrder = (history, body) => {
        axios
            .put(`${BASE_URL}/orders/itens`, body)
            .then((res) => {
                console.log(res.data)
                const newItensOrder = [...itensOrder]
                for(let item of newItensOrder){
                    if(item.id === body.item_id){
                        item.qty_requested = body.qty_alter
                    }
                }
                setItensOrder(newItensOrder)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteItemOrder = (history, itemId) => {
        axios
            .delete(`${BASE_URL}/orders/itens/${itemId}`)
            .then((res) => {
                console.log(res.data)
                const newItensOrder = itensOrder.filter((item)=>{
                    if(!(item.id === itemId)){
                        return item
                    }
                })
                setItensOrder(newItensOrder)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const states = { products, orders, itensOrder, orderSelected, productSelected, acaoDetailPage }
    const setters = { setProducts, 
                      setOrders, 
                      setItensOrder,
                      setProductSelected,
                      setAcaoDetailPage
                    }
    const requests = { getOrders, 
                       getItensOrder, 
                       getProducts, 
                       createOrder, 
                       alterItemOrder, 
                       deleteItemOrder,
                       addItemOrder }

    const functions = { changeOrderSelected }
    return (
        <GlobalContext.Provider value={{states, setters, requests, functions}}>
            {props.children}
        </GlobalContext.Provider>
    )

}
export default GlobalStatesContext