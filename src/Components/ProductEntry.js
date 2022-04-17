import React, { useState, useEffect } from "react";
import useCategories from "../hooks/useCategories";
import axios from "axios";
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

export default function ProductEntry(props) {
  const { categories } = useCategories();
  const [category, setCategory] = useState(1);
  const [name, setName] = useState("");
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [categoryAttribute, setCategoryAttribute] = useState("");
  const [attribute, setAttribute] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [mark, setMark] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios
      .get("/api/category-attributes")
      .then((res) => {
        setCategoryAttributes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const enterProduct = () => {
    axios
      .post("/api/product", {
        category,
        name,
        categoryAttribute,
        attribute,
        manufacturer,
        mark,
        year,
        description,
        URL,
        quantity,
        price,
      })
      .then((res) => {
        props.close();
        props.updateProductsArray(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryAttributeChange = (e) => {
    setCategoryAttribute(e.target.value);
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
          <Typography variant="h5">Add Product</Typography>
          <FormControl margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
            <InputLabel id="category-attribute-label">
              Category Attribute
            </InputLabel>
            <Select
              labelId="category-attribute-label"
              id="category-attribute"
              label="Category Attribute"
              value={categoryAttribute}
              onChange={handleCategoryAttributeChange}
            >
              {categoryAttributes.map((elem) => {
                return (
                  <MenuItem
                    value={elem.category_attribute_id}
                    key={elem.category_attribute_id}
                  >
                    {elem.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Attribute"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <TextField
              label="Manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
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
          <Button
            variant="outlined"
            style={{ marginTop: 20 }}
            onClick={enterProduct}
          >
            Add
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
