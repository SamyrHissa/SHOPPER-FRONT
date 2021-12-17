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
    // const getMovieDatails = (move_id) => {
    //     axios
    //         .get(`${BASE_URL}/movie/${move_id}?api_key=${API_KEY}`)
    //         .then((res) => {
    //             setMovieDetails(res.data)
    //         })
    //         .catch((err) => {
    //             console.log('erro', err.response)
    //         })
    // }

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
    const requests = { getOrders }

    return (
        <GlobalContext.Provider value={{states, setters, requests}}>
            {props.children}
        </GlobalContext.Provider>
    )

}
export default GlobalStatesContext