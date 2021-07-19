import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import SubcategoryBanner from "./SubcategoryBanner";
import Footer from "./Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddToCart from "./AddToCart";
import CartItemSummary from "./CartItemSummary";

const useStyles = makeStyles((theme) => ({
  h1: {
    fontWeight: "lighter",
  },
  card: {
    width: 500,
    height: 520,
    marginTop: 30,
    [theme.breakpoints.up("lg")]: {
      position: "sticky",
    },
    top: 80,
  },
  cardMedia: {
    height: 400,
    width: "100%",
  },
  textContainer: {
    marginTop: 30,
    width: 500,
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

export default function Product(props) {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/product/${props.match.params.name}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params]);

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
        <SubcategoryBanner />
      </Container>
      <Container>
        <Grid container direction="row" justifyContent="space-around">
          {!product.image ? (
            <CircularProgress />
          ) : (
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia} image={product.image} />
              <AddToCart
                product={product}
                setCart={setCart}
                toggleModal={toggleModal}
              />
            </Card>
          )}
          <Container className={classes.textContainer}>
            <Typography variant="h3" component="h1" className={classes.h1}>
              Product Name
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              display="inline"
              className={classes.text}
            >
              {product.desc}
            </Typography>
          </Container>
        </Grid>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
      <CartItemSummary open={open} cart={cart} toggleModal={toggleModal} />
    </React.Fragment>
  );
}
