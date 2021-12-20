import React from "react";
import { useHistory } from "react-router-dom";
import { goToOrdersPage } from "../../routers/coordinator";

export const HomePage =() => {
    const history = useHistory()
    return (
        <div>
            {goToOrdersPage(history)}
        </div>
    )
}