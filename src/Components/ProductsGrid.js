import React from "react";
import FeaturedPost from "./FeaturedPost";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  productsGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

export default function ProductsGrid(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.productsGrid}>
        {props.posts.map((post, index) => {
          return <FeaturedPost post={post} key={index} />;
        })}
      </Box>
    </React.Fragment>
  );
}
