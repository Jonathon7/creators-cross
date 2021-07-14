const path = require("path");
const express = require("express");
const app = express();
const port = 3002;
require("dotenv").config();
const db = require("./db");

const product = require("./controllers/product");

app.use(express.static(`${__dirname}/../build`));

app.get("/api/products", product.getProducts);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
