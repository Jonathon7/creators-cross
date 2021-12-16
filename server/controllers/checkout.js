const stripe = require("stripe")(process.env.SK_LIVE);
const { pool } = require("../db");

const calculateOrderAmount = (cart) => {
  let amount = 0;

  for (let i = 0; i < cart.length; i++) {
    amount += parseFloat(cart[i].price);
  }

  amount *= 100; // converting dollars to cents

  return amount;
};

const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(req.session.cart),
    currency: "usd",
  });

  saveShippingInformationToDb(req);

  res.status(200).json(paymentIntent.client_secret);
};

const saveShippingInformation = (req, res) => {
  req.session.shippingInformation = req.body;
  res.sendStatus(200);
};

const getShippingInformation = (req, res) => {
  res.status(200).json(req.session.shippingInformation);
};

const saveShippingInformationToDb = (req) => {
  const { shippingInformation } = req.session;
  for (const key in shippingInformation) {
    hset(shippingInformation.email, key, shippingInformation[key]);
  }
};

module.exports = {
  createPaymentIntent,
  saveShippingInformation,
  getShippingInformation,
};
