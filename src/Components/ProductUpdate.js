import React, { useState, useEffect } from "react";
import useCategories from "../hooks/useCategories";
import useProduct from "../hooks/useProduct";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import AvailableSizes from "./AvailableSizes";

export default function ProductEntry(props) {
  const [sizes, setSizes] = useState([]);
  const { categories } = useCategories();
  const {
    name,
    category,
    categoryAttribute,
    attribute,
    mark,
    year,
    description,
    URL,
    quantity,
    price,
    setName,
    setCategory,
    setCategoryAttribute,
    setAttribute,
    setMark,
    setYear,
    setDescription,
    setURL,
    setQuantity,
    setPrice,
    updateProduct,
  } = useProduct(props.id, props.categoryId);

  useEffect(() => {
    axios
      .get(`/api/ring-sizes/${name}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [name]);

  const update = async () => {
    const updatedProduct = await updateProduct();
    props.updateProductsArray(updatedProduct[0]);
    props.close();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

    axios
      .get(`/api/category-attribute/${e.target.value}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCategoryAttributeChange = (e) => {
    setCategoryAttribute(e.target.value);
    axios
      .get(`/api/attribute/${categoryAttribute}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={props.close}
      style={{ overflowY: "scroll" }}
    >
      <Box
        sx={{
          width: "70%",
          background: "#fff",
          m: "auto",
          mt: 10,
          mb: 10,
          pb: 5,
        }}
      >
        <Grid
          container
          direction="column"
          style={{
            width: "80%",
            margin: "auto",
            padding: 20,
          }}
        >
          <Typography variant="h5">Update Product</Typography>
          <FormControl margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="Category"
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((elem) => {
                return (
                  <MenuItem value={elem.category_id} key={elem.category_id}>
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel id="category-attribute-label">
              Category Attribute
            </InputLabel>
            <Select
              disabled={categoryAttribute === ""}
              labelId="category-attribute-label"
              id="category-attribute"
              label="Category Attribute"
              value={categoryAttribute}
              onChange={handleCategoryAttributeChange}
            >
              <MenuItem value={categoryAttribute}>{categoryAttribute}</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <TextField
              disabled={attribute === ""}
              label="Attribute"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Mark"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="URL"
              value={URL}
              onChange={(e) => setURL(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <AvailableSizes />
          <Button variant="outlined" style={{ marginTop: 20 }} onClick={update}>
            Update
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
