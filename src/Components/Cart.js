import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CartItem from "./CartItem";
import useSnackbar from "../hooks/useSnackbar";
import Snackbar from "./Snackbar";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Cart() {
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
            <Typography variant="h5" component="h1" sx={{ mt: 2, mb: 2 }}>
              Cart
            </Typography>
          </Grid>
          {!cart.length && (
            <Typography component="p" sx={{ ml: 3, width: "100%" }}>
              There are no items in your cart.
            </Typography>
          )}
          {cart.length ? (
            <Grid item>
              <Button variant="outlined" sx={{ mt: 3, mb: 3 }} href="/checkout">
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
