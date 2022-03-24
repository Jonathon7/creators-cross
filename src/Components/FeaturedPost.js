import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

export default function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} sm={6} md={4}>
      {post && (
        <CardActionArea component="a" href={`/product/${post.name}`}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 350,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={post.url}
                alt={post.name}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <div>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.name}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description.length > 99
                    ? post.description.substring(0, 100) + " ..."
                    : post.description}
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
