import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/header/Header";
import { CreateOrderPage } from "../pages/createOrderPage/CreateOrderPage";
import { OrderDetailPage } from "../pages/orderDetailPage/OrderDetailPage";
import { HomePage } from "../pages/homePage/HomePage";
import { OrdersPage } from "../pages/ordersPage/OrdersPage";

const Router = () => {
    return(
        <BrowserRouter>
            <link rel="stylesheet" 
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" 
              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
              crossorigin="anonymous"></link>
              <Header />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/orders">
                    <OrdersPage />
                </Route>
                <Route exact path="/orders/detail/:orderId">
                    <OrderDetailPage />
                </Route>
                <Route exact path="/orders/create">
                    <CreateOrderPage />
                </Route>
                <Router>
                    <HomePage />
                </Router>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;