import React, { useEffect, useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Header from "./Header";
import ProductList from "./ProductList";
import AddIcon from "@material-ui/icons/Add";
import ProductEntry from "./ProductEntry";
import ProductUpdate from "./ProductUpdate";
import DeleteConfirmation from "./DeleteConfirmation";

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [inventoryId, setInventoryId] = useState(null);
  const { logout } = useAuth();
  const [productEntryOpen, setProductEntryOpen] = useState(false);
  const [productUpdateOpen, setProductUpdateOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const getProducts = useCallback(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const toggleProductEntry = () => {
    setProductEntryOpen(!productEntryOpen);
  };

  const toggleProductUpdate = (id, categoryId) => {
    setProductId(id);
    setCategoryId(categoryId);
    setProductUpdateOpen(!productUpdateOpen);
  };

  const updateProductsArray = (product) => {
    if (Array.isArray(product) || typeof product !== "object") {
      throw new Error("Argument must be an object.");
    }

    const productsCopy = [...products];

    const idx = productsCopy.findIndex(
      (elem) => elem.product_id === product.product_id
    );

    if (idx === -1) {
      productsCopy.push(product);
    } else {
      productsCopy[idx] = product;
    }

    setProducts(productsCopy);
  };

  const toggleDeleteConfirmation = (productId, inventoryId) => {
    setProductId(productId);
    setInventoryId(inventoryId);
    setDeleteConfirmation(!deleteConfirmation);
  };

  const deleteProduct = () => {
    axios
      .delete(`/api/product/${productId}/${inventoryId}`)
      .then(() => {
        let productsCopy = [...products];

        const idx = productsCopy.findIndex(
          (elem) => elem.product_id === productId
        );

        productsCopy.splice(idx, 1);
        setProducts(productsCopy);
        setDeleteConfirmation(false);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <React.Fragment>
      <ProductEntry
        open={productEntryOpen}
        close={toggleProductEntry}
        updateProductsArray={updateProductsArray}
      />
      <ProductUpdate
        open={productUpdateOpen}
        close={toggleProductUpdate}
        updateProductsArray={updateProductsArray}
        id={productId}
        categoryId={categoryId}
      />
      <DeleteConfirmation
        open={deleteConfirmation}
        close={toggleDeleteConfirmation}
        delete={deleteProduct}
      />
      <Container>
        <Header sections={sections} title="Creator's Cross" logout={logout} />
        <Box sx={{ width: "80%", m: "auto", pt: 5, pb: 15 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            <IconButton onClick={toggleProductEntry}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Grid>
          <ProductList
            products={products}
            openProductUpdate={toggleProductUpdate}
            openDeleteConfirmation={toggleDeleteConfirmation}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
