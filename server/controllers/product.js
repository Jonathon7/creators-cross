const { pool } = require("../db");

const getProducts = async (req, res) => {
  const sql = `SELECT product_id, product.name, category.name AS 'category_name', product.description, manufacturer, mark, year, product.category_id, price, url, inventory.inventory_id, quantity FROM product
  INNER JOIN inventory
  ON product.inventory_id = inventory.inventory_id
  INNER JOIN category
  ON product.category_id = category.category_id;`;

  pool.query(sql, (error, result) => {
    if (error) throw error;

    res.status(200).json(result);
  });
};

const getProduct = async (req, res) => {
  let { id, categoryId } = req.params;

  const sql1 = `SELECT category_attribute_id FROM category_attribute WHERE category_id = ${categoryId}`;

  const sql2 = `SELECT product_id, product.name, category.name AS 'category_name', product.description, manufacturer, mark, year, product.category_id, price, url, inventory.inventory_id, quantity FROM product
               INNER JOIN inventory
               ON product.inventory_id = inventory.inventory_id
               INNER JOIN category
               ON product.category_id = category.category_id
               WHERE product_id = ${id};`;

  const sql3 = `SELECT product_id, product.name, category.name AS 'category_name', product.description, manufacturer, mark, year, product.category_id, category_attribute.category_attribute_id, category_attribute.name AS 'attribute_name', attribute.value AS 'attribute_value', price, url, inventory.inventory_id, quantity FROM product
                INNER JOIN inventory
                ON product.inventory_id = inventory.inventory_id
                INNER JOIN category
                ON product.category_id = category.category_id
                INNER JOIN category_attribute
                ON category.category_id = category_attribute.category_id
                INNER JOIN attribute
                ON product.attribute_id = attribute.attribute_id
                WHERE product_id = ${id};`;

  pool.query(sql1, (err, results) => {
    if (err) throw err;

    pool.query(results.length ? sql3 : sql2, (error, result) => {
      if (error) throw error;

      res.status(200).json(result);
    });
  });
};

const getProductsByName = (req, res) => {
  const { name } = req.params;

  pool.query(
    `SELECT product.product_id, product.name, product.description, product.manufacturer, product.mark, product.year, product.category_id, product.price, product.url, attribute.value
    FROM product LEFT JOIN attribute ON product.attribute_id = attribute.attribute_id WHERE name = '${name}';`,
    (err, result) => {
      if (err) return res.status(400).json(err);

      const products = {};

      for (let i = 0; i < result.length; i++) {
        if (products.hasOwnProperty("product_id")) {
          products.product_id.push(result[i].product_id);
          products.value.push(result[i].value);
        } else {
          products.product_id = [result[i].product_id];
          products.value = [result[i].value];
        }

        for (key in result[i]) {
          if (!products.hasOwnProperty(key)) {
            products[key] = result[i][key];
          }
        }
      }

      res.status(200).json(products);
    }
  );
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
    res
      .status(200)
      .json({ cart: req.session.cart, subtotal: req.session.subtotal });
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
    req.session.subtotal = parseFloat(req.body.price);
    req.session.cart[0].quantity = 1;
  } else {
    const idx = req.session.cart.findIndex(
      (elem) => elem.product_id[0] === req.body.product_id[0]
    );
    if (idx !== -1) {
      req.session.cart[idx].quantity += 1;
      req.session.subtotal += parseFloat(req.session.cart[idx].price);
    } else {
      req.session.cart.push(req.body);
      req.session.cart[req.session.cart.length - 1].quantity = 1;
      req.session.subtotal += parseFloat(req.body.price);
    }
  }

  res
    .status(200)
    .json({ cart: req.session.cart, subtotal: req.session.subtotal });
};

const removeCartItem = (req, res) => {
  const idx = req.session.cart.findIndex(
    (elem) => elem.product_id[0] === parseInt(req.params.id, 10)
  );

  req.session.subtotal -= parseFloat(req.session.cart[idx].price);
  req.session.cart.splice(idx, 1);
  res.status(200).json(req.session.cart);
};

const cartToFavorites = (req, res) => {
  if (!req.session.favorites) {
    req.session.favorites = [];
  }

  let exists = false;

  for (let i = 0; i < req.session.favorites.length; i++) {
    for (let j = 0; j < req.session.favorites[i].product_id.length; j++) {
      if (
        req.session.favorites[i].product_id[j] === req.body.cartItem.product_id
      ) {
        exists = true;
        break;
      }
    }
  }

  req.body.cartItem.quantity = 1;

  if (!exists) {
    req.session.favorites.push(req.body.cartItem);
  }

  const price = req.body.cartItem.price * req.body.cartItem.quantity;

  req.session.subtotal -= parseFloat(price);

  const idx = req.session.cart.findIndex(
    (elem) => elem.product_id === req.body.cartItem.product_id
  );

  req.session.cart.splice(idx, 1);

  res.status(200).json(req.session.cart);
};

const getCategories = (req, res) => {
  const sql = "SELECT category_id, name FROM category";

  pool.query(sql, (err, result) => {
    if (err) throw err;

    res.status(200).json(result);
  });
};

const addProduct = async (req, res) => {
  const poolPromise = pool.promise();
  const {
    category,
    name,
    manufacturer,
    mark,
    year,
    description,
    URL,
    quantity,
    price,
  } = req.body;

  await poolPromise
    .query(
      `INSERT INTO inventory(quantity, created_at, modified_at) VALUES(${quantity}, UTC_TIMESTAMP(), UTC_TIMESTAMP())`
    )
    .catch((err) => {
      return res.status(400).json(err);
    });

  const sql = `INSERT INTO product(name, description, manufacturer, mark, year, category_id, inventory_id, price, url, created_at, modified_at)
    VALUES('${name}', '${description}', '${manufacturer}', '${mark}', ${year}, ${category}, LAST_INSERT_ID(), ${price}, '${URL}', UTC_TIMESTAMP(), UTC_TIMESTAMP());`;

  pool.query(sql, (err) => {
    if (err) return res.status(400).json(err);

    pool.query(
      "SELECT * FROM product WHERE product_id = LAST_INSERT_ID()",
      (err, results) => {
        if (err) return res.status(400).json(err);

        res.status(200).json(results);
      }
    );
  });
};

const updateProduct = async (req, res) => {
  const poolPromise = pool.promise();

  const {
    name,
    category,
    mark,
    year,
    description,
    URL,
    quantity,
    price,
    inventoryId,
    productId,
  } = req.body;

  await poolPromise
    .query(
      `UPDATE inventory SET quantity = ${quantity}, modified_at = UTC_TIMESTAMP() WHERE inventory_id = ${inventoryId};`
    )
    .catch((err) => {
      return res.status(400).json(err);
    });

  pool.query(
    `UPDATE product SET name = '${name}', category_id = ${category}, mark='${mark}', year=${year}, description='${description}', url='${URL}', price=${price}, modified_at = UTC_TIMESTAMP() WHERE product_id = ${productId};`,
    (err) => {
      if (err) return res.status(400).json(err);

      pool.query(
        `SELECT product_id, product.name, category.name AS 'category_name', product.description, manufacturer, mark, year, product.category_id, price, url, inventory.inventory_id, quantity FROM product
         INNER JOIN inventory
         ON product.inventory_id = inventory.inventory_id
         INNER JOIN category
         ON product.category_id = category.category_id WHERE product_id = '${productId}';`,
        (err, results) => {
          if (err) return res.status(400).json(err);

          res.status(200).json(results);
        }
      );
    }
  );
};

const deleteProduct = (req, res) => {
  pool.query(
    `DELETE FROM product WHERE product_id = ${req.params.productId};`,
    (err) => {
      if (err) return res.status(400).json(err);

      pool.query(
        `DELETE FROM inventory WHERE inventory_id = ${req.params.inventoryId};`,
        (err) => {
          if (err) return res.status(400).json(err);

          res.status(200).json("Item Deleted.");
        }
      );
    }
  );
};

const getCategoryAttribute = (req, res) => {
  const { categoryId } = req.params;

  pool.query(
    `SELECT * FROM category_attribute WHERE category_id = ${categoryId}`,
    (err, results) => {
      if (err) return res.status(400).json(err);

      res.status(200).json(results);
    }
  );
};

const getAttribute = (req, res) => {
  const { categoryAttributeId } = req.params;

  pool.query(
    `SELECT * FROM attribute WHERE category_attribute_id = ${categoryAttributeId}`,
    (err, results) => {
      if (err) return res.status(400).json(err);

      res.status(200).json(results);
    }
  );
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  addCartItem,
  getCart,
  getCartLength,
  removeCartItem,
  cartToFavorites,
  getProductsByName,
  getProductsByCategory,
  getCategories,
  getCategoryAttribute,
  getAttribute,
};
