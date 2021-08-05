const { smembers, hgetall } = require("../db");

const getProducts = async (req, res) => {
  const products = [];

  // retrieves set that contains every unique product name
  const set = await smembers("product").catch((err) => {
    console.log(err);
  });

  // retrieves every hash table with a key matching the unique product name
  for (let i = 0; i < set.length; i++) {
    // only want to match values and not field names
    if (!set[i].includes(":")) continue;

    const product = await hgetall(set[i]).catch((error) => {
      console.log(error);
    });
    products.push(product);
  }

  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  let productName = req.params.name;

  // adds the hashtags to the product name
  for (let i = 0; i < req.params.name.length; i++) {
    if (req.params.name[i] === " ") {
      productName =
        productName.substring(0, i) +
        "#" +
        productName.substring(i + 1, productName.length);
    }
  }

  productName = "product:" + productName;

  const product = await hgetall(productName).catch((err) => {
    console.log(err);
  });

  res.status(200).json(product);
};

const getCart = (req, res) => {
  if (req.session.cart) {
    res.status(200).json(req.session.cart);
  } else {
    res.sendStatus(200);
  }
};

const getCartLength = (req, res) => {
  if (req.session.cart) {
    res.status(200).json(req.session.cart.length);
  } else {
    res.sendStatus(200);
  }
};

const addCartItem = (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
    req.session.cart.push(req.body);
    req.session.total = req.body.price;
  } else {
    req.session.cart.push(req.body);
    req.session.total += req.body.price;
  }

  res.status(200).json({ cart: req.session.cart, total: req.session.total });
};

const removeCartItem = (req, res) => {
  req.session.cart.splice(req.params.index, 1);
  res.status(200).json(req.session.cart);
};

module.exports = {
  getProducts,
  getProduct,
  addCartItem,
  getCart,
  getCartLength,
  removeCartItem,
};
