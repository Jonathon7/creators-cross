import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AllProducts from "./Components/AllProducts";
import Category from "./Components/Category";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import Favorite from "./Components/Favorite";
import Checkout from "./Components/Checkout";
import Confirmation from "./Components/Confirmation";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import About from "./Components/About";
import Blog from "./Components/Blog";

export default (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about-us" element={<About />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/all-products" element={<AllProducts />} />
    <Route path="/category/:category" element={<Category />} />
    <Route path="/product/:name" element={<Product />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/favorite" element={<Favorite />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);
