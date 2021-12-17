import GlobalContext from "./GlobalContext"
import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { useState } from "react"


const GlobalStatesContext = (props) => {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [itensOrder, setItensOrder] = useState([])

    const getOrders = () => {
        axios
            .get(`${BASE_URL}/orders`)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err)=>{
                console.log(err.response)
            })
    }
    const getItensOrder = (order_id) => {
        axios
            .get(`${BASE_URL}/orders/itens/${order_id}`)
            .then((res) => {
                setItensOrder(res.data)
            })
            .catch((err) => {
                console.log('erro', err)
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
                console.log('erro', err.response)
            })
    }

    const createOrder = (body, clear) => {
        console.log('create', `${BASE_URL}/orders`)
        axios
            .post(`${BASE_URL}/orders`, body)
            .then((res) => {
                console.log('create order', res.data)
                alert(res.data)
                clear()
            })
            .catch((err) => {
                console.log('erro', err)
            })
    }
    // const getGenres = ()=>{
        
    //     axios
    //         .get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    //         .then((res)=>{
    //             setGenres(res.data.genres)
    //         })
    //         .catch((err)=>{
    //             console.log('erro generos', err.response)
    //         })
    // }
    // const resetMoviesFiltered = () => {
    //     setMoviesFiltered(popularMovies)
    // }
    // const setFilterMoviesByGenres = (genres)=>{
    //     const newMoviesFiltered = popularMovies.filter((movie)=>{
    //         let achei = false
    //         let index = 0
    //         while((index < genres.length) && !achei){
    //             for(let genre2 of movie.genre_ids){
    //                 if(genres[index].id === genre2){
    //                     achei = true
    //                 }
    //             }
    //             index++
    //         }
            
    //         return achei
            
    //     })
    //     setMoviesFiltered(newMoviesFiltered)
        
    // }

    const states = { products, orders, itensOrder }
    const setters = { setProducts, 
                      setOrders, 
                      setItensOrder
                    }
    const requests = { getOrders, getItensOrder, getProducts, createOrder }

    return (
        <GlobalContext.Provider value={{states, setters, requests}}>
            {props.children}
        </GlobalContext.Provider>
    )

}
export default GlobalStatesContext