import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { goToCreateOrderPage, goToOrdersPage } from "../../routers/coordinator";
export const Header = () => {
    const history = useHistory()
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="">Shopper</a>
                <button className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#conteudoNavbarSuportado" 
                        aria-controls="conteudoNavbarSuportado" 
                        aria-expanded="false" 
                        aria-label="Alterna navegação">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={()=>goToOrdersPage(history)} href="">Pedidos<span className="sr-only">(página atual)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={()=>goToCreateOrderPage(history)} href="">Novo Pedido</a>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}