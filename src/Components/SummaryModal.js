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
          right: [0, 10, 10],
          background: "#fff",
          width: ["100%", 450, 450],
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
            <Button href="/cart" variant="outlined" size="small" sx={{ ml: 2 }}>
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
                  sx={{
                    height: [85, 100, 100],
                    width: [110, 140, 140],
                    mr: [3],
                  }}
                />
              </Box>
              <Grid>
                <Typography
                  variant="h6"
                  sx={{ fontSize: ["14px", "16px", "16px"] }}
                >
                  {elem.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: ["14px", "16px", "16px"] }}
                >
                  Qty {elem.quantity}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: ["14px", "16px", "16px"] }}
                >
                  ${elem.price}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Modal>
  );
}
