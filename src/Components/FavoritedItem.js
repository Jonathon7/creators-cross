import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  outerGrid: {
    marginBottom: 20,
  },
  cardMedia: {
    height: 300,
    width: 400,
  },
  innerGrid: {
    marginTop: 10,
  },
  category: {
    opacity: 0.5,
  },
  button: {
    marginTop: 5,
  },
  imageBox: {
    width: "100%",
    height: 400,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function FavoritedItem(props) {
  const classes = useStyles();

  return (
    <Grid item xs={10} sm={4} className={classes.outerGrid}>
      <Paper className={classes.card} variant="outlined">
        <Box className={classes.imageBox}>
          <img src={props.favorite.url} alt={props.favorite.name} />
        </Box>
      </Paper>
      <Grid
        container
        justifyContent="space-between"
        className={classes.innerGrid}
      >
        <Box>
          <Typography>{props.favorite.name}</Typography>
          <Typography className={classes.category}>
            {props.favorite.category}
          </Typography>
        </Box>
        <Typography>${props.favorite.price}</Typography>
      </Grid>
      <Grid container justifyContent="space-between">
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => props.favoriteToCart(props.favorite)}
        >
          Add to Cart
        </Button>
        <Button
          className={classes.button}
          onClick={() => props.removeFavorite(props.favorite.product_id)}
        >
          Remove Favorite
        </Button>
      </Grid>
    </Grid>
  );
}
