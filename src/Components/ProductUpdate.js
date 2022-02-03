import React from "react";
import useCategories from "../hooks/useCategories";
import useProduct from "../hooks/useProduct";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function ProductEntry(props) {
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
          <Button variant="outlined" style={{ marginTop: 20 }} onClick={update}>
            Update
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
