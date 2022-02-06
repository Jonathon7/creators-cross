import React from "react";
import FeaturedPost from "./FeaturedPost";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const uniqueProducts = (products) => {
  const result = [];

  for (let i = 0; i < products.length; i++) {
    if (!result.length) {
      result.push(products[i]);
    } else {
      const idx = result.findIndex(
        (elem) => elem.name === products[i].name && elem.url === products[i].url
      );

      if (idx === -1) {
        result.push(products[i]);
      }
    }
  }

  return result;
};

export default function ProductsGrid(props) {
  const products = uniqueProducts(props.posts);

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5" sx={{ mt: 3 }}>
          {props.header}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {products.map((post, index) => {
            return <FeaturedPost post={post} key={index} />;
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
