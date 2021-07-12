import React from "react";
import Header from "./Header";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Cart() {
  return (
    <React.Fragment>
      <Header title="Creator's Cross" sections={sections} />
      <Container>
        <Typography variant="h3" component="h1">
          Cart
        </Typography>
        <Typography>There are no items in your cart.</Typography>
      </Container>
    </React.Fragment>
  );
}
