import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@mui/material/IconButton";

export default function SummaryModal(props) {
  return (
    <Modal
      open={props.open}
      style={{ overflowY: "scroll" }}
      onClose={props.toggleModal}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 10,
          background: "#fff",
          width: 400,
          p: 2,
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Box>
            <Typography variant="subtitle1" display="inline">
              Item added to cart
            </Typography>
            <Button href="/cart" variant="outlined" size="small" sx={{ ml: 1 }}>
              checkout
            </Button>
          </Box>
          <IconButton onClick={props.toggleModal}>
            <CloseIcon />
          </IconButton>
        </Grid>

        {props.cart.map((elem, index) => {
          return (
            <Grid key={index} container direction="row" alignItems="center">
              <Box>
                <CardMedia
                  image={elem.url}
                  sx={{ height: 100, width: 100, mr: 3 }}
                />
              </Box>
              <Grid>
                <Typography variant="h6">{elem.name}</Typography>
                <Typography variant="subtitle1">Qty {elem.quantity}</Typography>
                <Typography variant="subtitle1">${elem.price}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Modal>
  );
}
