import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  cardMedia: {
    height: 300,
    maxWidth: 450,
  },
}));

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardActionArea component="a" href={`/product/${post.name}`}>
        <Card className={classes.card}>
          <Image src={post.image} className={classes.cardMedia} />
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
