import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  boxSummary: {
    position: "absolute",
    top: 0,
    right: 10,
    background: "#fff",
    width: 400,
    padding: 10,
  },
  cardMedia: {
    height: 100,
    width: 100,
  },
}));

export default function CartItemSummary(props) {
  const classes = useStyles();
  return (
    <Modal
      open={props.open}
      style={{ overflowY: "scroll" }}
      onClose={props.toggleModal}
    >
      <Box className={classes.boxSummary}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" display="inline">
            Item Added to Cart
          </Typography>
          <IconButton onClick={props.toggleModal}>
            <CloseIcon />
          </IconButton>
        </Grid>

        {props.cart.map((elem, index) => {
          return (
            <Grid key={index} container direction="row" alignItems="center">
              <Box>
                <CardMedia image={elem.image} className={classes.cardMedia} />
              </Box>
              <Grid>
                <Typography variant="h6">{elem.name}</Typography>
                <Typography variant="subtitle1">${elem.price}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Modal>
  );
}
