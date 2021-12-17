import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import GlobalContext from "../../global/GlobalContext";
export const DetailOrderPage = () => {
    const {states, requests} = useContext(GlobalContext)
    const params = useParams();
    useEffect(()=>{
        requests.getOrders()
        console.log('pedidos', states.orders)
    }
    )
    return(
        <div>
            Detail Order Page  {params.orderId}
        </div>
    )
}