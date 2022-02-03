const getFavorites = (req, res, next) => {
  if (req.session.favorites) {
    res.status(200).json(req.session.favorites);
  } else {
    req.session.favorites = [];
    res.status(200).json(req.session.favorites);
  }
};

const addFavorite = (req, res) => {
  req.session.favorites.push(req.body);
  res.status(200).json(req.session.favorites);
};

const favoriteToCart = (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }

  let exists = false;

  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].product_id[0] === req.body.favorite.product_id[0]) {
      exists = true;
      break;
    }
  }

  if (exists) return res.status(409).json("Item already exists in cart.");

  req.body.favorite.quantity = 1;
  req.session.cart.push(req.body.favorite);
  if (!req.session.subtotal) {
    req.session.subtotal = parseFloat(req.body.favorite.price);
  } else {
    req.session.subtotal += parseFloat(req.body.favorite.price);
  }

  let idx;

  for (let i = 0; i < req.session.favorites.length; i++) {
    let match;

    match = req.session.favorites[i].product_id.findIndex(
      (elem) => elem === req.body.favorite.product_id[0]
    );
    if (match !== -1) {
      idx = i;
      break;
    }
  }

  req.session.favorites.splice(idx, 1);

  res
    .status(200)
    .json({ cart: req.session.cart, favorites: req.session.favorites });
};

const removeFavorite = (req, res) => {
  const idx = req.session.favorites.findIndex(
    (elem) => elem.product_id[0] === parseInt(req.params.id, 10)
  );

  req.session.favorites.splice(idx, 1);

  res.status(200).json(req.session.favorites);
};

module.exports = {
  getFavorites,
  addFavorite,
  favoriteToCart,
  removeFavorite,
};
