const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const port = 3002;
const { json } = require("body-parser");
const session = require("express-session");
const mysql = require("mysql2/promise");
const MySQLStore = require("express-mysql-session")(session);
const product = require("./controllers/product");
const favorite = require("./controllers/favorite");
const checkout = require("./controllers/checkout");
const user = require("./controllers/user");

app.use(json());

const options = {
  socketPath: process.env.SOCKET_PATH,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  connectionLimit: 10,
};

const pool = mysql.createPool(options);
const sessionStore = new MySQLStore(options, pool);

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60 * 2, // session max age in miliseconds
    },
    sameSite: "Strict",
  })
);

app.use(express.static(`${__dirname}/../build`));

app.delete("/api/session", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

app.get("/api/auth", user.auth);
app.post("/api/login", user.login);
app.delete("/api/logout", user.logout);

app.get("/api/products", product.getProducts);
app.get("/api/product/:id/:categoryId", product.getProduct);
app.get("/api/product/:name", product.getProductsByName);
app.get("/api/products/:category", product.getProductsByCategory);
app.get("/api/categories/", product.getCategories);
app.get("/api/category-attribute/:categoryId", product.getCategoryAttribute);
app.get("/api/attribute/:categoryAttributeId", product.getAttribute);
app.post("/api/product", product.addProduct);
app.put("/api/product", product.updateProduct);
app.delete("/api/product/:productId/:inventoryId", product.deleteProduct);

app.get("/api/cart", product.getCart);
app.get("/api/cart-length", product.getCartLength);
app.post("/api/add-cart-item", product.addCartItem);
app.delete("/api/remove-cart-item/:id", product.removeCartItem);
app.post("/api/cart-to-favorites", product.cartToFavorites);

app.post("/api/favorites-to-cart", favorite.favoriteToCart);
app.get("/api/favorites", favorite.getFavorites);
app.post("/api/add-favorite", favorite.addFavorite);
app.delete("/api/remove-favorite/:id", favorite.removeFavorite);

app.get(
  "/api/validate-address/:address1/:city/:state/:zip/:address2?",
  checkout.validateAddress
);
app.get("/api/address-information", checkout.getAddressInformation);
app.post("/create-payment-intent", checkout.createPaymentIntent);
app.post("/api/address-information", checkout.saveAddressInformation);
app.post("/api/order", checkout.confirmOrderPlacement);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
