import React from "react";
import FeaturedPost from "./FeaturedPost";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function ProductsGrid(props) {
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h5">{props.header}</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {props.posts.map((post, index) => {
            return <FeaturedPost post={post} key={index} />;
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
