import React, { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useSnackbar from "../hooks/useSnackbar";
import Snackbar from "./Snackbar";

const useStyles = makeStyles({
  box: {
    maxWidth: 150,
    marginLeft: 20,
    marginBottom: 20,
  },
  grid: {},
  favorite: {},
  addToCart: {
    width: "100%",
    background: "",
    color: "",
  },
});

export default function AddToCart(props) {
  const [newFavorites, setNewFavorites] = useState([]);
  const favorites = useFavorites(newFavorites);
  const [isFavorited, setIsFavorited] = useState(false);
  const { isOpen, message, severity, openSnackbar } = useSnackbar();
  const classes = useStyles();

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
      <Box className={classes.box}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.grid}
        >
          <Typography variant="h4" component="p" display="inline">
            ${props.product.price}
          </Typography>
          <IconButton
            className={classes.favorite}
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
          className={classes.addToCart}
        >
          Add To Cart
        </Button>
      </Box>
    </React.Fragment>
  );
}
