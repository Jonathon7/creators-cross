import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useSnackbar from "../hooks/useSnackbar";
import Header from "./Header";
import Snackbar from "./Snackbar";
import FavoritedItem from "./FavoritedItem";
import AttributeSelector from "./AttributeSelector";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelet" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState(null);
  const [cart, setCart] = useState([]);
  const { isOpen, message, severity, openSnackbar } = useSnackbar();
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
          openSnackbar(err.response.data, "error");
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
      <Snackbar open={isOpen} message={message} severity={severity} />
      <Container>
        <Header title="Creator's Cross" sections={sections} cart={cart} />
        <Typography variant="h5" component="h1" sx={{ mt: 2, mb: 2 }}>
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
