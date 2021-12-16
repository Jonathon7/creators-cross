require("dotenv").config();
const path = require("path");
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
      maxAge: 1000 * 60 * 10 * 2, // session max age in miliseconds
    },
    sameSite: "Strict",
  })
);

app.use(express.static(`${__dirname}/../build`));

app.get("/api/products", product.getProducts);
app.get("/api/product/:id", product.getProduct);
app.get("/api/products/:category", product.getProductsByCategory);

app.get("/api/cart", product.getCart);
app.get("/api/cart-length", product.getCartLength);
app.post("/api/add-cart-item", product.addCartItem);
app.delete("/api/remove-cart-item/:index", product.removeCartItem);
app.post("/api/cart-to-favorites", product.cartToFavorites);

app.post("/api/favorites-to-cart", favorite.favoriteToCart);
app.get("/api/favorites", favorite.getFavorites);
app.post("/api/add-favorite", favorite.addFavorite);
app.delete("/api/remove-favorite/:index", favorite.removeFavorite);

app.get("/api/shipping-information", checkout.getShippingInformation);
app.post("/create-payment-intent", checkout.createPaymentIntent);
app.post("/api/shipping-information", checkout.saveShippingInformation);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
