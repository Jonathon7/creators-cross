const { pool } = require("../db");

const login = (req, res) => {
  const sql = `SELECT * FROM user WHERE email = '${req.body.email}'`;

  pool.query(sql, (err, result) => {
    if (err) throw err;

    if (!result.length) {
      return res.status(404).json("Incorrect username or password.");
    }

    if (result[0].password === req.body.password) {
      req.session.user = {};
      req.session.user.email = req.body.email;
      res.sendStatus(200);
    } else {
      res.status(404).json("Incorrect username or password.");
    }
  });
};

const auth = (req, res) => {
  if (req.session.hasOwnProperty("user")) {
    return res.status(200).json(req.session.user.email);
  }

  res.status(404).json("User not authenticated");
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = {
  login,
  auth,
  logout,
};
