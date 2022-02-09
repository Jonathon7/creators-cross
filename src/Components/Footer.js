import React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Creator's Cross {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer(props) {
  const { description, title } = props;

  return (
    <footer>
      <Container maxWidth="lg" sx={{ mt: 6, p: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
