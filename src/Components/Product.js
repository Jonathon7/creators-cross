import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Footer from "./Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import AddToCart from "./AddToCart";
import SummaryModal from "./SummaryModal";
import RingSizeSelector from "./RingSizeSelector";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  h1: {
    fontWeight: "lighter",
  },
  card: {
    width: 450,
    height: "fit-content",
    marginTop: 30,
    [theme.breakpoints.up("lg")]: {
      position: "sticky",
    },
    top: 80,
  },
  textContainer: {
    marginTop: 30,
    width: 500,
  },
  imageBox: {
    width: "100%",
    height: 400,
    display: "flex",
    justifyContent: "center",
  },
}));

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "#" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

let timeout = null;

export default function Product() {
  const [product, setProduct] = useState({});
  const [value, setValue] = useState(null);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const classes = useStyles();

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
          <Card className={classes.card}>
            <Box className={classes.imageBox}>
              <img src={product.url} alt={product.name} />
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
          <Container className={classes.textContainer}>
            <Typography variant="h3" component="h1" className={classes.h1}>
              {product.name}
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              display="inline"
              className={classes.text}
            >
              {product.description}
            </Typography>
          </Container>
        </Grid>
      </Container>
      <Footer title="Creator's Cross" description="" />
      <SummaryModal open={open} cart={cart} toggleModal={toggleModal} />
    </React.Fragment>
  );
}
