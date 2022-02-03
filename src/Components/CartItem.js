import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: 10,
    paddingRight: 100,
    padding: 10,
    width: "fit-content",
  },
  cardMedia: { height: 100, width: 100 },
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function CartItem(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.outerGrid}
        >
          <CardMedia image={props.cartItem.url} className={classes.cardMedia} />
          <Box>
            <Typography variant="subtitle1">{props.cartItem.name}</Typography>
            {props.cartItem.value && (
              <Typography variant="subtitle1">
                {props.cartItem.category_id === 2 && "Size"}{" "}
                {props.cartItem.value}
              </Typography>
            )}
            <Typography variant="subtitle1">
              Qty {props.cartItem.quantity}
            </Typography>
            <Typography variant="subtitle1">${props.cartItem.price}</Typography>
            <Box className={classes.box}>
              <Button
                size="small"
                onClick={() => props.cartToFavorites(props.cartItem)}
              >
                Move to Favorites
              </Button>
              <Button
                size="small"
                onClick={() => props.removeCartItem(props.cartItem.product_id)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
