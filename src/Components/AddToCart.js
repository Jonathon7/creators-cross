import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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

function addToFavorites(favorite) {
  axios.post("/api/add-favorite", favorite).catch((err) => {
    console.log(err);
  });
}

export default function AddToCart(props) {
  const classes = useStyles();

  function addCartItem(cartItem) {
    axios
      .post("/api/add-cart-item", {
        name: cartItem.name,
        price: cartItem.price,
        url: cartItem.url,
        category: cartItem.category,
      })
      .then((res) => {
        props.setCart(res.data.cart);
        props.toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
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
            onClick={() => addToFavorites(props.product)}
          >
            <FavoriteBorderIcon fontSize="large" />
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
