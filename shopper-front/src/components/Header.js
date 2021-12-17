import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { goToCreateOrderPage, goToOrdersPage } from "../routers/coordinator";
export const Header = () => {
    const history = useHistory()
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="">Shopper</a>
                <button class="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#conteudoNavbarSuportado" 
                        aria-controls="conteudoNavbarSuportado" 
                        aria-expanded="false" 
                        aria-label="Alterna navegação">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" onClick={()=>goToOrdersPage(history)} href="">Pedidos<span class="sr-only">(página atual)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=>goToCreateOrderPage(history)} href="">Novo Pedido</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Pesquisar</button>
                    </form>
                </div>
            </nav>
    )
}