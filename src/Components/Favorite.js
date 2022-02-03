import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useSnackbar from "../hooks/useSnackbar";
import Header from "./Header";
import Snackbar from "./Snackbar";
import FavoritedItem from "./FavoritedItem";
import AttributeSelector from "./AttributeSelector";

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
  const [favorite, setFavorite] = useState(null);
  const [cart, setCart] = useState([]);
  const { isOpen, message, openSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false); // for attribute selector

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
        if (Array.isArray(res.data.cart)) {
          setCart(res.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function favoriteToCart(favorite) {
    if (favorite.value && favorite.value.length > 1) {
      setFavorite(favorite);
      togglAttributeSelector();
    } else {
      axios
        .post("/api/favorites-to-cart", { favorite })
        .then((res) => {
          openSnackbar("Added To Cart.");
          setFavorites(res.data.favorites);
          setCart(res.data.cart);
        })
        .catch((err) => {
          console.log(err.response);
          openSnackbar(err.response.data);
        });
    }
  }

  function removeFavorite(id) {
    axios
      .delete(`/api/remove-favorite/${id[0]}`)
      .then((res) => {
        openSnackbar("Favorite Removed.");
        setFavorites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const togglAttributeSelector = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <AttributeSelector
        open={open}
        close={togglAttributeSelector}
        favorite={favorite}
        setFavorites={setFavorites}
        setCart={setCart}
      />
      <Snackbar open={isOpen} message={message} />
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

        <Grid container spacing={5} justifyContent="center" alignItems="center">
          {favorites.map((favorite, index) => {
            return (
              <FavoritedItem
                key={index}
                favorite={favorite}
                favoriteToCart={favoriteToCart}
                removeFavorite={removeFavorite}
              />
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
