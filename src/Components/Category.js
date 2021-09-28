import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import SubcategoryBanner from "./SubcategoryBanner";
import ProductsGrid from "./ProductsGrid";
import Footer from "./Footer";
import Typography from "@material-ui/core/Typography";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Category(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/${props.match.params.category}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products.length, props.match.params.category]);

  return (
    <React.Fragment>
      <Container>
        <Header title={"Creator's Cross"} sections={sections} />
        <SubcategoryBanner />
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
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
