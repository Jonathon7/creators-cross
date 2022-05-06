import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function CartItem(props) {
  return (
    <React.Fragment>
      <Card
        sx={{
          mb: 3,
          pr: [2, 10, 10],
          pt: 2,
          pb: 2,
          width: ["95%", "fit-content", "fit-content"],
        }}
      >
        <Grid container direction="row" alignItems="center">
          <CardMedia
            image={props.cartItem.url}
            sx={{
              height: [100, 100, 100],
              width: [100, 140, 160],
              m: [2, 0, 0],
            }}
          />
          <Box sx={{ ml: [0, 0, 2] }}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: ["13px", "16px", "16px"] }}
            >
              {props.cartItem.name}
            </Typography>
            {props.cartItem.value && (
              <Typography
                variant="subtitle1"
                sx={{ fontSize: ["13px", "16px", "16px"] }}
              >
                {props.cartItem.category_id === 2 && "Size"}{" "}
                {props.cartItem.value}
              </Typography>
            )}
            <Typography
              variant="subtitle1"
              sx={{ fontSize: ["13px", "16px", "16px"] }}
            >
              Qty {props.cartItem.quantity}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: ["13px", "16px", "16px"] }}
            >
              ${props.cartItem.price}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: ["90%", "100%", "100%"],
              }}
            >
              <Button
                size="small"
                onClick={() => props.cartToFavorites(props.cartItem)}
                sx={{ display: ["none", "block", "block"] }}
              >
                Move to Favorites
              </Button>
              <Button
                size="small"
                onClick={() => props.removeCartItem(props.cartItem.product_id)}
                sx={{ ml: "auto" }}
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
