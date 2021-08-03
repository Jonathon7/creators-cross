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
    width: "50vw",
    marginBottom: 10,
  },
  cardMedia: { height: 200, width: 200 },
  box: {
    display: "flex",
    justifyContent: "space-between",
    width: 230,
  },
}));

export default function CartItem(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Grid container direction="row" alignItems="center">
          <CardMedia
            image={props.cartItem.image}
            className={classes.cardMedia}
          />
          <Box>
            <Typography variant="subtitle1">{props.cartItem.name}</Typography>
            <Typography variant="subtitle1">${props.cartItem.price}</Typography>
            <Box className={classes.box}>
              <Button size="small">Move to Favorites</Button>
              <Button size="small">Remove</Button>
            </Box>
          </Box>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
