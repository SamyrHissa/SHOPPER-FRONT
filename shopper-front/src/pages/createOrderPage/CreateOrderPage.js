import React from "react";
import { CreateOrderForm } from "./createOrderForm";
export const CreateOrderPage = () => {
    return(
        <div class="container-fluid">
            <div class="alert alert-light h3" role="alert">
                Novo Pedido
            </div>
            <CreateOrderForm />
        </div>
    )
}