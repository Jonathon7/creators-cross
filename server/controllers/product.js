const { smembers, hgetall } = require("../db");

const getProducts = async (req, res, next) => {
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

module.exports = {
  getProducts,
};
