const path = require("path");
const express = require("express");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
require("dotenv").config();
const db = require("./db");
const product = require("./controllers/product");
const favorite = require("./controllers/favorite");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    store: new RedisStore({ client: db.client }),
    secret: process.env.SESSION_PASS,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10 * 2, // session max age in miliseconds
    },
  })
);

app.use(express.static(`${__dirname}/../build`));

// app.get("*", (req, res) => {
//   req.session.destroy();
//   console.log("DESTROYED");
// });

app.get("/api/products", product.getProducts);
app.get("/api/product/:name", product.getProduct);

app.get("/api/cart", product.getCart);
app.get("/api/cart-length", product.getCartLength);
app.post("/api/add-cart-item", product.addCartItem);
app.delete("/api/remove-cart-item/:index", product.removeCartItem);

app.post("/api/favorites-to-cart", favorite.favoriteToCart);
app.get("/api/favorites", favorite.getFavorites);
app.post("/api/add-favorite", favorite.addFavorite);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
