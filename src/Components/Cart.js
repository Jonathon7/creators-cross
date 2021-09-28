import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CartItem from "./CartItem";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

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
  const classes = useStyles();
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

  function removeCartItem(index) {
    axios
      .delete(`/api/remove-cart-item/${index}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cartToFavorites(cartItem, index) {
    axios
      .post("/api/cart-to-favorites", { cartItem, index })
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <Container>
        <Header title="Creator's Cross" sections={sections} cart={cart} />
        <Typography variant="h5" component="h1" className={classes.title}>
          Cart
        </Typography>
        {!cart.length && (
          <Typography>There are no items in your cart.</Typography>
        )}

        {cart.length ? (
          <Button
            variant="contained"
            className={classes.button}
            href="/checkout"
          >
            Checkout
          </Button>
        ) : null}
        <Grid>
          {cart.map((elem, i) => {
            return (
              <CartItem
                cartItem={elem}
                key={i}
                index={i}
                cartToFavorites={cartToFavorites}
                removeCartItem={removeCartItem}
              />
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
