import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import ProductsGrid from "./ProductsGrid";
import Footer from "./Footer";
import hero from "../assets/bracelet_hero.jpg";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

const mainFeaturedPost = {
  title: "Creator's Cross Jewelry",
  description:
    "Every piece is made from vintage, silver-plated or sterling silver flatware. Our selection is all hand-made, unique, custom designs.",
  image: hero,
};

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products.length]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header title="Creator's Cross" sections={sections} />
        <MainFeaturedPost post={mainFeaturedPost} />
      </Container>
      <ProductsGrid posts={products} header="Featured Products" />
      <Footer title="Creator's Cross" description="" />
    </React.Fragment>
  );
}
