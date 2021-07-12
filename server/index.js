const express = require("express");
const db = require("./db");
const app = express();
const port = 3002;

const product = require("./controllers/product");

app.get("/api/products", product.getProducts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
