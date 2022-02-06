import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FavoritedItem(props) {
  return (
    <Grid item xs={10} sm={4} sx={{ mb: 2 }}>
      <Paper variant="outlined">
        <Box
          sx={{
            width: "100%",
            height: 400,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={props.favorite.url} alt={props.favorite.name} />
        </Box>
      </Paper>
      <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
        <Box>
          <Typography>{props.favorite.name}</Typography>
        </Box>
        <Typography>${props.favorite.price}</Typography>
      </Grid>
      <Grid container justifyContent="space-between">
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => props.favoriteToCart(props.favorite)}
        >
          Add to Cart
        </Button>
        <Button onClick={() => props.removeFavorite(props.favorite.product_id)}>
          Remove Favorite
        </Button>
      </Grid>
    </Grid>
  );
}
