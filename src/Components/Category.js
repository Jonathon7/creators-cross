import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "./Header";
import ProductsGrid from "./ProductsGrid";
import Footer from "./Footer";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Category() {
  const [category, setCategory] = useState({});
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

    axios
      .get(`/api/category/${params.category}`)
      .then((res) => {
        console.log(res.data);
        setCategory(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [products.length, params.category]);

  return (
    <React.Fragment>
      {category.title && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{category.title} - Creator's Cross</title>
          <meta name="description" content={category.description} />
        </Helmet>
      )}

      <Container>
        <Header title={"Creator's Cross"} sections={sections} />
      </Container>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          mb: 5,
        }}
      >
        <Typography component="h1" variant="h4">
          {category.title}
        </Typography>

        <Typography
          component="p"
          variant="subtitle1"
          sx={{
            width: [400, 600, "65%"],
            textAlign: "center",
            mt: 3,
            mb: 5,
            lineHeight: 1.8,
          }}
        >
          {category.description}
        </Typography>
      </Box>
      {products.length ? (
        <ProductsGrid posts={products} />
      ) : (
        <Container style={{ textAlign: "center", paddingTop: 20 }}>
          <Typography component="p" variant="h5">
            Not Currently Available
          </Typography>
        </Container>
      )}
      <Footer title="Creator's Cross" description="" />
    </React.Fragment>
  );
}
