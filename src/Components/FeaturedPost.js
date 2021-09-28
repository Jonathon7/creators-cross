import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  imageBox: {
    width: "100%",
    height: 400,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} sm={6} md={4}>
      {post && (
        <CardActionArea component="a" href={`/product/${post.name}`}>
          <Card className={classes.card}>
            <Box className={classes.imageBox}>
              <img src={post.image} alt={post.name} />
            </Box>
            <div>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.name}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.desc.substring(0, 100) + " ..."}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </CardActionArea>
      )}
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
