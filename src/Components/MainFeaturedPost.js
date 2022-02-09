import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function MainFeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
      style={{
        position: "relative",
        background: "#fff",
        color: "#fff",
        marginBottom: "4px",
        backgroundImage: `url(${post.image})`,
        backgroundSize: "auto 400px",
        backgroundRepeat: "no-repeat",
        minHeight: 400,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          color: "#fff",
          backgroundColor: "rgba(0,0,0,.6)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <div
            style={{
              position: "relative",
              padding: "30px",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{ fontSize: ["30px", "30px", "40px"] }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              paragraph
              sx={{ fontSize: ["22px", "25px", "25px"] }}
            >
              {post.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};
