const { pool } = require("../db");

const getProducts = async (req, res) => {
  const sql = `SELECT * FROM product`;

  pool.query(sql, (error, result) => {
    if (error) throw error;

    res.status(200).json(result);
  });
};

const getProduct = async (req, res) => {
  let { id } = req.params;

  const sql = `SELECT * FROM product WHERE product_id = '${id}'`;

  pool.query(sql, (error, result) => {
    if (error) throw error;

    res.status(200).json(result);
  });
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  const sql = `SELECT * FROM product WHERE category_id = (SELECT category_id FROM category WHERE name = '${category}')`;

  pool.query(sql, (error, result) => {
    if (error) throw error;

    res.status(200).json(result);
  });
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
    req.session.cart[0].quantity = 1;
  } else {
    const idx = req.session.cart.findIndex(
      (elem) => elem.product_id === req.body.product_id
    );

    if (idx !== -1) {
      req.session.cart[idx].quantity += 1;
      req.session.total += req.session.cart[idx].price;
    } else {
      req.session.cart.push(req.body);
      req.session.cart[req.session.cart.length - 1].quantity = 1;
      req.session.total += req.body.price;
    }
  }

  res.status(200).json({ cart: req.session.cart, total: req.session.total });
};

const removeCartItem = (req, res) => {
  req.session.cart.splice(req.params.index, 1);
  res.status(200).json(req.session.cart);
};

const cartToFavorites = (req, res) => {
  if (!req.session.favorites) {
    req.session.favorites = [];
  }
  req.session.favorites.push(req.body.cartItem);
  req.session.cart.splice(req.body.index, 1);

  res.status(200).json(req.session.cart);
};

module.exports = {
  getProducts,
  getProduct,
  addCartItem,
  getCart,
  getCartLength,
  removeCartItem,
  cartToFavorites,
  getProductsByCategory,
};
