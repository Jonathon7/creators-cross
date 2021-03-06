import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import AddToCart from "./AddToCart";
import SummaryModal from "./SummaryModal";
import RingSizeSelector from "./RingSizeSelector";
import { useParams } from "react-router-dom";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/about-us" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

let timeout = null;

export default function Product() {
  const [product, setProduct] = useState({});
  const [value, setValue] = useState(null);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/product/${params.name}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axios
      .get("/api/cart")
      .then((res) => {
        if (Array.isArray(res.data.cart)) {
          setCart(res.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.name]);

  function toggleModal() {
    clearTimeout(timeout);
    setOpen(!open);

    timeout = setTimeout(() => {
      setOpen(false);
    }, 6000);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header title="Creator's Cross" sections={sections} cart={cart} />
      </Container>
      <Container>
        <Grid container direction="row" justifyContent="space-around">
          <Card
            sx={{
              width: 500,
              marginTop: 5,
              position: ["static", "static", "sticky"],
              top: 80,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={product.url}
                alt={product.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Grid container direction="row" justifyContent="space-between">
              <AddToCart
                product={product}
                setCart={setCart}
                toggleModal={toggleModal}
                value={value}
              />
              {product.category_id === 2 && (
                <RingSizeSelector
                  values={product.value}
                  setValue={setValue}
                  value={value}
                />
              )}
            </Grid>
          </Card>
          <Box sx={{ mt: [10, 5, 5], width: 500 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "lighter",
                fontSize: ["30px", "auto", "auto"],
              }}
            >
              {product.name}
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography variant="body1" display="inline">
              {product.description}
            </Typography>
          </Box>
        </Grid>
      </Container>
      <Footer title="Creator's Cross" description="" />
      <SummaryModal open={open} cart={cart} toggleModal={toggleModal} />
    </React.Fragment>
  );
}
