import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Category from "./Components/Category";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import Favorite from "./Components/Favorite";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/category/:category" component={Category} />
    <Route path="/product/:name" component={Product} />
    <Route path="/cart" component={Cart} />
    <Route path="/favorite" component={Favorite} />
  </Switch>
);
