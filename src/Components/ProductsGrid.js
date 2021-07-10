import React from "react";
import FeaturedPost from "./FeaturedPost";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  productsGrid: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "space-between",
    },
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

export default function ProductsGrid(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container className={classes.productsGrid}>
        {props.posts.map((post, index) => {
          return <FeaturedPost post={post} key={index} />;
        })}
      </Container>
    </React.Fragment>
  );
}
