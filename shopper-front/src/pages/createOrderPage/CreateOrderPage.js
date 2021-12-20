import React from "react";
import { CreateOrderForm } from "./createOrderForm";
export const CreateOrderPage = () => {
    return(
        <div className="container-fluid">
            <div className="alert alert-light h3" role="alert">
                Novo Pedido
            </div>
            <CreateOrderForm />
        </div>
    )
}