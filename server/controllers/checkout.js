const stripe = require("stripe")(process.env.SK_LIVE);
const axios = require("axios");
const xml2js = require("xml2js");
const { pool } = require("../db");

const createPaymentIntent = async (req, res) => {
  const shippingAmount = req.session.subtotal < 40 ? 1.0 : 0;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: (req.session.subtotal + shippingAmount) * 100,
    currency: "usd",
    receipt_email: req.session.shippingAddress.email,
  });

  const existingAddressIds = await getExistingAddress(
    req.session.shippingAddress,
    req.session.billingAddress
  );

  if (!Object.keys(existingAddressIds).length) {
    const addressIds = await saveAddressInformationToDb(
      req.session.shippingAddress,
      req.session.billingAddress
    );

    req.session.shippingAddress.user_address_id = addressIds.shippingAddressId;
    req.session.billingAddress.billing_address_id = addressIds.billingAddressId;
  } else {
    req.session.shippingAddress.user_address_id =
      existingAddressIds.shippingAddressId;
    req.session.billingAddress.billing_address_id =
      existingAddressIds.billingAddressId;
  }

  res.status(200).json(paymentIntent.client_secret);
};

const validateAddress = async (req, res) => {
  let { address1, address2, city, state, zip } = req.params;

  if (!address2) address2 = "";

  const BASE_URL =
    "https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=";

  const XML = `<AddressValidateRequest USERID="${process.env.USPS_ID}">
               <Revision>1</Revision>
               <Address ID="0">
               <Address1>${encodeURIComponent(address2)}</Address1>
               <Address2>${encodeURIComponent(address1)}</Address2>
               <City>${encodeURIComponent(city)}</City>
               <State>${state}</State>
               <Zip5>${zip}</Zip5>
               <Zip4/>
               </Address>
               </AddressValidateRequest>`;

  const response = await axios.get(BASE_URL + XML, {
    headers: { "Content-Type": "text/xml" },
  });

  xml2js.parseString(response.data, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.AddressValidateResponse.Address[0].Error) {
      return res.status(400).json({
        message:
          result.AddressValidateResponse.Address[0].Error[0].Description[0],
      });
    }

    res.status(200).json(result.AddressValidateResponse.Address[0]);
  });
};

const saveAddressInformation = async (req, res) => {
  req.session.shippingAddress = req.body.shippingAddress;
  req.session.billingAddress = req.body.billingAddress;
  res.sendStatus(200);
};

const getExistingAddress = (shippingAddress, billingAddress) =>
  new Promise(async (resolve) => {
    const promisePool = pool.promise();
    const id = {};

    await promisePool
      .query(
        `SELECT user_address_id FROM user_address WHERE address_line1='${shippingAddress.address1}' AND city='${shippingAddress.city}' AND state='${shippingAddress.state}';`
      )
      .then((rows) => {
        if (rows[0].length) id.shippingAddressId = rows[0][0].user_address_id;
      })
      .catch((err) => console.log(err));

    await promisePool
      .query(
        `SELECT billing_address_id FROM billing_address WHERE address_line1='${billingAddress.address1}' AND city='${billingAddress.city}' AND state='${billingAddress.state}';`
      )
      .then((rows) => {
        if (rows[0].length) id.billingAddressId = rows[0][0].billing_address_id;
      })
      .catch((err) => console.log(err));

    resolve(id);
  });

const getAddressInformation = (req, res) => {
  res.status(200).json({
    shippingAddress: req.session.shippingAddress || {},
    billingAddress: req.session.billingAddress || {},
  });
};

const saveAddressInformationToDb = (shippingAddress, billingAddress) =>
  new Promise(async (resolve) => {
    const promisePool = pool.promise();
    const id = {};

    await promisePool
      .query(
        `INSERT INTO user_address(address_line1, address_line2, city, state, postal_code, created_at, modified_at)
      VALUES('${shippingAddress.address1}', '${
          shippingAddress.address2 || ""
        }', '${shippingAddress.city}', '${shippingAddress.state}', ${
          shippingAddress.zip
        }, UTC_TIMESTAMP(), UTC_TIMESTAMP());`
      )
      .catch((err) => console.log(err));

    await promisePool
      .query("SELECT LAST_INSERT_ID()")
      .then((rows) => {
        id.shippingAddressId = rows[0][0]["LAST_INSERT_ID()"];
      })
      .catch((err) => console.log(err));

    await promisePool
      .query(
        `INSERT INTO billing_address(first_name, last_name, address_line1, address_line2, city, state, postal_code, created_at, modified_at)
      VALUES('${billingAddress.firstName}', '${billingAddress.lastName}', '${
          billingAddress.address1
        }', '${billingAddress.address2 || ""}', '${billingAddress.city}', '${
          billingAddress.state
        }', ${billingAddress.zip}, UTC_TIMESTAMP(), UTC_TIMESTAMP());`
      )
      .catch((err) => console.log(err));

    await promisePool
      .query("SELECT LAST_INSERT_ID()")
      .then((rows) => {
        id.billingAddressId = rows[0][0]["LAST_INSERT_ID()"];
      })
      .catch((err) => console.log(err));

    resolve(id);
  });

const confirmOrderPlacement = (req, res) => {
  const { orderNumber, amount, type, status } = req.body;

  const sql = `INSERT INTO \`order\`(order_number, amount, type, status, user_address_id, billing_address_id, created_at, modified_at)
  VALUES('${orderNumber}', ${amount}, '${type}', '${status}', ${req.session.shippingAddress.user_address_id}, ${req.session.billingAddress.billing_address_id}, UTC_TIMESTAMP(), UTC_TIMESTAMP());`;

  pool.query(sql, "SELECT LAST_INSERT_ID();", (err, results) => {
    if (err) throw err;

    saveProductsToDb(req.session.cart, results.insertId);
    req.session.cart = [];
    req.session.subtotal = 0;

    res.sendStatus(200);
  });
};

const saveProductsToDb = (cart, orderId) => {
  for (let i = 0; i < cart.length; i++) {
    pool.query(
      `INSERT INTO order_details(order_id, product_id, quantity, created_at, modified_at)
                VALUES(${orderId}, ${cart[i].product_id}, ${cart[i].quantity}, UTC_TIMESTAMP(), UTC_TIMESTAMP());`,
      (err) => {
        if (err) throw err;
      }
    );
  }
};

module.exports = {
  createPaymentIntent,
  validateAddress,
  saveAddressInformation,
  getAddressInformation,
  confirmOrderPlacement,
};
