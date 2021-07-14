const express = require("express");
const app = express();
const port = 3002;
require("dotenv").config();
const db = require("./db");

const product = require("./controllers/product");

app.get("/api/products", product.getProducts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
