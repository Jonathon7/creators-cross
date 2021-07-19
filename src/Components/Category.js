import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import SubcategoryBanner from "./SubcategoryBanner";
import ProductsGrid from "./ProductsGrid";
import Footer from "./Footer";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Category() {
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
      <Container>
        <Header title={"Creator's Cross"} sections={sections} />
        <SubcategoryBanner />
      </Container>
      <ProductsGrid posts={products} />
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
