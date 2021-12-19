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
                // console.log('produtos', res.data)
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const createOrder = (body, clear) => {
        axios
            .post(`${BASE_URL}/orders`, body)
            .then((res) => {
                console.log(res.data)
                clear()
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
                // clear({})
                goToOrdersPage(history)
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
                // clear("")
                goToOrdersPage(history)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const states = { products, orders, itensOrder, orderSelected }
    const setters = { setProducts, 
                      setOrders, 
                      setItensOrder
                    }
    const requests = { getOrders, getItensOrder, getProducts, createOrder, alterItemOrder, deleteItemOrder }

    const functions = { changeOrderSelected }
    return (
        <GlobalContext.Provider value={{states, setters, requests, functions}}>
            {props.children}
        </GlobalContext.Provider>
    )

}
export default GlobalStatesContext