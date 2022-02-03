import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CartItem from "./CartItem";
import useSnackbar from "../hooks/useSnackbar";
import Snackbar from "./Snackbar";

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
  const [subtotal, setSubtotal] = useState(0);
  const { isOpen, message, openSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        if (!Array.isArray(res.data.cart)) return;
        setCart(res.data.cart);
        setSubtotal(res.data.subtotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cart.length]);

  function removeCartItem(id) {
    axios
      .delete(`/api/remove-cart-item/${id}`)
      .then((res) => {
        openSnackbar("Cart Item Removed.");
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cartToFavorites(cartItem) {
    axios
      .post("/api/cart-to-favorites", { cartItem })
      .then((res) => {
        openSnackbar("Added To Favorites.");
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <Snackbar open={isOpen} message={message} />
      <Container>
        <Header title="Creator's Cross" sections={sections} cart={cart} />
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={3}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5" component="h1" className={classes.title}>
              Cart
            </Typography>
          </Grid>
          {!cart.length && (
            <Typography component="p" style={{ marginLeft: 30 }}>
              There are no items in your cart.
            </Typography>
          )}

          {cart.length ? (
            <Grid item>
              <Button
                variant="outlined"
                className={classes.button}
                href="/checkout"
              >
                Checkout (${subtotal})
              </Button>
            </Grid>
          ) : null}
        </Grid>
        <Grid>
          {cart.map((elem, i) => {
            return (
              <CartItem
                cartItem={elem}
                key={i}
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
