import React from "react";
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
  grid: {
    // border: "solid 1px red",
  },
  favorite: {},
  addToCart: {
    width: "100%",
    background: "",
    color: "",
  },
});

export default function AddToCart(props) {
  const classes = useStyles();
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
            {props.price}
          </Typography>
          <IconButton className={classes.favorite}>
            <FavoriteBorderIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Button variant="outlined" className={classes.addToCart}>
          Add To Cart
        </Button>
      </Box>
    </React.Fragment>
  );
}
