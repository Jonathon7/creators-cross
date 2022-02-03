import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  subtotal: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaymentForm(props) {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [billingInformation, setBillingInformation] = useState({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shippingPrice] = useState(8.99);
  const [tax] = useState(0.0);

  const classes = useStyles();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        // if cookie expires and their cart becomes empty
        if (!Array.isArray(res.data.cart)) {
          navigate("/cart");
        }

        setSubtotal(res.data.subtotal);
        setCart(res.data.cart);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/address-information")
      .then((res) => {
        setBillingInformation(res.data.billingAddress);
      })
      .catch((err) => console.log(err));

    getCategories();
  }, [cart.length, navigate]);

  const pay = async () => {
    if (!stripe || !elements) {
    }

    axios
      .post("/create-payment-intent")
      .then(async (res) => {
        const paymentResult = await stripe.confirmCardPayment(res.data, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name:
                billingInformation.firstName +
                " " +
                billingInformation.lastName,
              address: {
                line1: billingInformation.address1,
                line2: billingInformation.address2 || "",
                city: billingInformation.city,
                state: billingInformation.state,
                postal_code: billingInformation.zip,
              },
            },
          },
        });

        if (paymentResult.error) {
          alert(paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            const { id, amount, object, status } = paymentResult.paymentIntent;
            await confirmOrderPlacement(id, amount, object, status);
            props.finish();
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const confirmOrderPlacement = (orderNumber, amount, type, status) =>
    new Promise((resolve) => {
      axios
        .post("/api/order", { orderNumber, amount, type, status })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => console.log(err));
    });

  const handleChange = (e) => {
    if (!e.complete && complete) {
      setComplete(false);
    } else if (e.complete && !complete) {
      setComplete(true);
    }

    if (e.error) {
      setError(e.error.message);
    } else if (!e.error && error) {
      setError("");
    }
  };

  const validate = () => {
    if (error) {
      alert(error);
      return;
    }

    if (!complete) {
      alert("There are some empty fields or incomplete information");
      return;
    }

    pay();
  };

  const getCategories = () => {
    axios
      .get("/api/categories/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCategory = (id) => {
    const category = categories.find((elem) => elem.category_id === id);
    return category.name;
  };

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {Array.isArray(cart) &&
            categories.length &&
            cart.map((product) => {
              return (
                <ListItem className={classes.listItem} key={product.name}>
                  <img
                    src={product.url}
                    alt={product.name}
                    height="60"
                    width="50"
                    style={{
                      border: "solid 1px #00000033",
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  />
                  <ListItemText
                    primary={product.name}
                    secondary={getCategory(product.category_id)}
                  />
                  <Typography variant="subtitle2" style={{ width: "65%" }}>
                    Qty {product.quantity}
                  </Typography>
                  <Typography variant="subtitle2">
                    ${product.price * product.quantity}
                  </Typography>
                </ListItem>
              );
            })}

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />

          <ListItem className={classes.listItem}>
            <ListItemText secondary="Subtotal" variant="subtitle2" />
            <Typography variant="subtitle2">${subtotal}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText secondary="Shipping" />
            <Typography variant="subtitle2">${shippingPrice}</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText secondary="Taxes" />
            <Typography variant="subtitle2">${tax}</Typography>
          </ListItem>
        </List>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <ListItem className={classes.listItem}>
          <ListItemText secondary="Total" />
          <Typography variant="subtitle2">
            ${(subtotal + shippingPrice + tax).toFixed(2)}
          </Typography>
        </ListItem>
      </Box>

      <Divider style={{ marginTop: 20, marginBottom: 20 }} />

      <Box>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: "lighter" }}
          gutterBottom
        >
          Payment method
        </Typography>
        <Grid
          container
          direction="column"
          spacing={3}
          justifyContent="space-between"
          style={{ width: "100%", margin: "auto", marginTop: 20 }}
        >
          <Grid>
            <Typography variant="subtitle2" style={{ fontWeight: "lighter" }}>
              Card Number
            </Typography>
            <div
              style={{
                border: "solid 1px #0000001A",
                padding: 10,
                borderRadius: 5,
                width: "100%",
              }}
            >
              <CardNumberElement
                onChange={handleChange}
                options={{
                  style: { base: { letterSpacing: 0 } },
                }}
              />
            </div>
            <Grid container justifyContent="space-between">
              <Grid item style={{ width: "47%", marginTop: 20 }}>
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: "lighter" }}
                >
                  Expiry Date
                </Typography>
                <div
                  style={{
                    border: "solid 1px #0000001A",
                    padding: 10,
                    borderRadius: 5,
                    width: "100%",
                  }}
                >
                  <CardExpiryElement onChange={handleChange} />
                </div>
              </Grid>
              <Grid item style={{ width: "47%", marginTop: 20 }}>
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: "lighter" }}
                >
                  CVC/CVV
                </Typography>
                <div
                  style={{
                    border: "solid 1px #0000001A",
                    padding: 10,
                    borderRadius: 5,
                    width: "100%",
                  }}
                >
                  <CardCvcElement onChange={handleChange} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button onClick={props.handleBack}>Back</Button>
            <Button onClick={validate}>Place Order</Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
