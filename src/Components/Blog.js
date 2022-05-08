import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "./Header";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function About() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header title="Creator's Cross" sections={sections} />
        <Box sx={{ width: ["70%", "50%", "50%"], m: "auto" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: "center", mt: [5, 10, 10], mb: 2 }}
          >
            Blog
          </Typography>

          <Typography
            variant="subtitle1"
            component="p"
            sx={{ textAlign: "center" }}
          >
            Blog content coming soon!
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
