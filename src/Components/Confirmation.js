import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Confirmation() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart").then((res) => {
      setCart(res.data.cart);
    });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Header title="Creator's Cross" sections={sections} cart={cart} />
        <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
          Thank you for your order.
        </Typography>
        <Typography variant="subtitle1">
          We sent you an email containing a reciept with your order details and
        </Typography>
        <Typography variant="subtitle1">
          we will send you another email notifying you when your order has
          shipped!
        </Typography>
      </Container>
    </React.Fragment>
  );
}
