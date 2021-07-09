import React, { useEffect } from "react";
import { useEasybase } from "easybase-react";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import SubcategoryBanner from "./SubcategoryBanner";
import ProductsGrid from "./ProductsGrid";
import Footer from "./Footer";

const url = "Creator's Cross";

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
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "PRODUCT", limit: 1 });
    sync();
  });

  return (
    <React.Fragment>
      <Container>
        <Header title={url} sections={sections} />
        <SubcategoryBanner />
      </Container>
      <ProductsGrid posts={Frame()} />
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
