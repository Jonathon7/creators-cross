import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Header from "./Header";
import ProductsGrid from "./ProductsGrid";
import Footer from "./Footer";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Category() {
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/products/${params.category}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products.length, params.category]);

  return (
    <React.Fragment>
      <Container>
        <Header title={"Creator's Cross"} sections={sections} />
      </Container>
      {products.length ? (
        <ProductsGrid posts={products} />
      ) : (
        <Container style={{ textAlign: "center", paddingTop: 20 }}>
          <Typography component="h1" variant="h5">
            Not Currently Available
          </Typography>
        </Container>
      )}
      <Footer title="Creator's Cross" description="" />
    </React.Fragment>
  );
}
