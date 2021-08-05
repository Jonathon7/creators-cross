import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
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
    // width: 300,
    marginTop: 10,
  },
  category: {
    opacity: 0.5,
  },
  button: {
    marginTop: 5,
  },
}));

export default function FavoritedItem(props) {
  const classes = useStyles();
  return (
    <Grid item xs={10} sm={4} className={classes.outerGrid}>
      <Paper className={classes.card} variant="outlined">
        <Image src={props.favorite.image} />
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
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.favoriteToCart(props.favorite, props.index)}
      >
        Add to Cart
      </Button>
    </Grid>
  );
}
