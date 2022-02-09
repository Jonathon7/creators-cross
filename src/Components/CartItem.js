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
          width: "fit-content",
        }}
      >
        <Grid container direction="row" alignItems="center">
          <CardMedia
            image={props.cartItem.url}
            sx={{ height: 100, width: 100, m: [2, 0, 0] }}
          />
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
