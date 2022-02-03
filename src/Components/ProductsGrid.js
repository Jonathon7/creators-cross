import React from "react";
import FeaturedPost from "./FeaturedPost";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
        <Typography variant="h5">{props.header}</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {products.map((post, index) => {
            return <FeaturedPost post={post} key={index} />;
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
