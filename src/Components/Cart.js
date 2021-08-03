import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CartItem from "./CartItem";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        if (!Array.isArray(res.data)) return;
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart.length]);

  return (
    <React.Fragment>
      <Container>
        <Header title="Creator's Cross" sections={sections} />
        <Typography variant="h4" component="h1">
          Cart
        </Typography>
        {!cart.length && (
          <Typography>There are no items in your cart.</Typography>
        )}
        {cart.map((elem, i) => {
          return <CartItem cartItem={elem} key={i} />;
        })}
      </Container>
    </React.Fragment>
  );
}
