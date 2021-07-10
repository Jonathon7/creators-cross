import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    width: 325,
    [theme.breakpoints.up("lg")]: {
      width: 380,
    },
    marginTop: 10,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    height: 300,
    width: "100%",
  },
}));

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item>
      <CardActionArea component="a" href={`/product/${post.name}`}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} image={post.image} />
          <div className={classes.cardDetails}>
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
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
