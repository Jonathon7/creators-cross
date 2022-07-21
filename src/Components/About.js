import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "./Header";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelet" },
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
            About Us
          </Typography>

          <Typography variant="subtitle1" component="p">
            SUPPOSE you would like to give a gift to your children or
            grandchildren or perhaps to other family members, friends, or even
            service personnel of the armed forces. A memento from the Generation
            that took a sentimental journey and united America.
          </Typography>
          <br />
          <Typography variant="subtitle1" component="p">
            What I do is handcraft pieces of old flatware into crosses, rings,
            pendants, bracelets, etc., creating new distinctive items from the
            various patterns, many are unique and one of a kind.
          </Typography>
          <br />
          <Typography variant="subtitle1" component="p">
            If you desire this service for a keepsake or gift and have your own
            flatware, give us a call & hopefully we'll work to create a lasting
            memory.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
