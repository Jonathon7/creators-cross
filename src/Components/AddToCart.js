import React, { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useSnackbar from "../hooks/useSnackbar";
import Snackbar from "./Snackbar";

export default function AddToCart(props) {
  const [newFavorites, setNewFavorites] = useState([]);
  const favorites = useFavorites(newFavorites);
  const [isFavorited, setIsFavorited] = useState(false);
  const { isOpen, message, severity, openSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      favorites.findIndex((elem) => elem.name === props.product.name) !== -1
    ) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [favorites, props.product.product_id, props.product.name, isFavorited]);

  function addCartItem(cartItem) {
    if (cartItem.category_id === 2 && !props.value) {
      openSnackbar("Ring size is a required field.", "error");
      return;
    }

    let idx = cartItem.value.findIndex(
      (elem) => props.value && elem === props.value.toString()
    );

    if (idx === -1) {
      idx = 0;
    }

    axios
      .post("/api/add-cart-item", {
        name: cartItem.name,
        price: cartItem.price,
        url: cartItem.url,
        category_id: cartItem.category_id,
        product_id: [cartItem.product_id[idx]],
        value: props.value,
      })
      .then((res) => {
        props.setCart(res.data.cart);
        props.toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addToFavorites() {
    axios
      .post("/api/add-favorite", props.product)
      .then((res) => {
        openSnackbar("Favorite Added.");
        setNewFavorites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeFavorite() {
    axios
      .delete(`/api/remove-favorite/${props.product.product_id[0]}`)
      .then((res) => {
        openSnackbar("Favorite Removed.");
        setNewFavorites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <Snackbar open={isOpen} message={message} severity={severity} />
      <Box sx={{ maxWidth: [140, 150, 150], ml: [2, 3, 3], mb: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="p" display="inline">
            ${props.product.price}
          </Typography>
          <IconButton
            onClick={() => (isFavorited ? removeFavorite() : addToFavorites())}
          >
            {isFavorited ? (
              <FavoriteIcon fontSize="large" />
            ) : (
              <FavoriteBorderIcon fontSize="large" />
            )}
          </IconButton>
        </Grid>
        <Button
          variant="outlined"
          onClick={() => addCartItem(props.product)}
          sx={{ width: "100%" }}
        >
          Add To Cart
        </Button>
      </Box>
    </React.Fragment>
  );
}
