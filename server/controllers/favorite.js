const getFavorites = (req, res, next) => {
  if (req.session.favorites) {
    res.status(200).json(req.session.favorites);
  } else {
    res.sendStatus(200);
  }
};

const addFavorite = (req, res) => {
  if (!req.session.favorites) {
    req.session.favorites = [];
    req.session.favorites.push(req.body);
    res.status(200).json(req.session.favorites);
  } else {
    req.session.favorites.push(req.body);
    res.status(200).json(req.session.favorites);
  }
};

const favoriteToCart = (req, res) => {
  console.log(req.body);
  req.session.cart.push(req.body.favorite);
  req.session.favorites.splice(req.body.index, 1);

  res
    .status(200)
    .json({ cart: req.session.cart, favorites: req.session.favorites });
};

module.exports = {
  getFavorites,
  addFavorite,
  favoriteToCart,
};
