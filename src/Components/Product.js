import React from "react";
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
import AddToCart from "./AddToCart";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const product = {
  title: "Cool Ring",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime eum distinctio rerum ut. Sequi autem, consequatur quas maiores fugiat aperiam quia quae vero? Repudiandae asperiores quae voluptatum recusandae inventore. Voluptate, officiis sed? Accusantium quae sequi quidem ea ratione maiores. Placeat reiciendis nihil totam odit est cum. Nobis ea earum at, itaque sequi non? Voluptate a impedit eos odio. Non! Alias dolorem illum ratione, suscipit est debitis adipisci autem quia? Quo excepturi non inventore cum praesentium et ea magnam laborum! Officiis temporibus modi, accusantium nesciunt praesentium nisi reprehenderit sapiente vel.",
  image:
    "https://drive.google.com/uc?export=view&id=1wooI2NrwQwMSm1Z7cOhkK2TsoG1Ut0CR",
  imageText: "Image Text",
  price: "$20",
  link: "name-1",
};

export default function Product() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header title="Creator's Cross" sections={sections} />
        <SubcategoryBanner />
      </Container>
      <Container>
        <Grid container direction="row" justifyContent="space-around">
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.image}
              title={product.imageText}
            />
            <AddToCart price={product.price} />
          </Card>
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
              {product.description}
            </Typography>
          </Container>
        </Grid>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
