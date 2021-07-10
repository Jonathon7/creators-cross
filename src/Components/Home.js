import React, { useEffect } from "react";
import { useEasybase } from "easybase-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
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

const mainFeaturedPost = {
  title: "Creator's Cross Jewelry and Crosses!",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

export default function Home() {
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "PRODUCT", limit: 10 });
    sync();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header title="Creator's Cross" sections={sections} />
        <MainFeaturedPost post={mainFeaturedPost} />
      </Container>
      <ProductsGrid posts={Frame()} />
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
