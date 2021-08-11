import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import FavoritedItem from "./FavoritedItem";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles(() => ({
  title: {
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

export default function Favorite() {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/favorites")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFavorites(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/cart")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCart(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [favorites.length, cart.length]);

  function favoriteToCart(favorite, index) {
    axios
      .post("/api/favorites-to-cart", { favorite, index })
      .then((res) => {
        setFavorites(res.data.favorites);
        setCart(res.data.cart);
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
          Favorites
        </Typography>
        {!favorites.length && (
          <Typography component="p">
            You do not have any items favorited.
          </Typography>
        )}

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {favorites.map((favorite, index) => {
            return (
              <FavoritedItem
                key={index}
                favorite={favorite}
                index={index}
                favoriteToCart={favoriteToCart}
              />
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
