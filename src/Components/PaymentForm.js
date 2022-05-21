import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function PaymentForm(props) {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [billingInformation, setBillingInformation] = useState({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shippingPrice] = useState(7.99);
  const [tax] = useState(0.0);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const form = useRef();

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
          setProcessing(false);
          alert(paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            const { id, amount, object, status } = paymentResult.paymentIntent;
            setProcessing(false);
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
          emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            form.current,
            process.env.REACT_APP_PUBLIC_KEY
          );

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

    setProcessing(true);
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
      <Box ref={form} component="form">
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {Array.isArray(cart) &&
            categories.length &&
            cart.map((product) => {
              return (
                <ListItem sx={{ padding: 1 }} key={product.name}>
                  <img
                    src={product.url}
                    alt={product.name}
                    height="60"
                    width="auto"
                    style={{
                      border: "solid 1px #00000033",
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  />
                  <ListItemText
                    primary={product.name}
                    secondary={getCategory(product.category_id)}
                    primaryTypographyProps={{
                      fontSize: "12px",
                    }}
                    secondaryTypographyProps={{
                      fontSize: "12px",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ width: ["40%", "65%", "65%s"], ml: 2 }}
                  >
                    Qty {product.quantity}
                  </Typography>
                  <Typography variant="subtitle2">
                    ${product.price * product.quantity}
                  </Typography>
                </ListItem>
              );
            })}

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />

          <ListItem sx={{ mt: 1 }}>
            <ListItemText secondary="Subtotal" variant="subtitle2" />
            <Typography variant="subtitle2">${subtotal}</Typography>
          </ListItem>
          <ListItem sx={{ mt: 1 }}>
            <ListItemText secondary="Shipping" />
            <Typography variant="subtitle2">${shippingPrice}</Typography>
          </ListItem>
          <ListItem sx={{ mt: 1 }}>
            <ListItemText secondary="Taxes" />
            <Typography variant="subtitle2">${tax}</Typography>
          </ListItem>
        </List>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <ListItem sx={{ mt: 1 }}>
          <ListItemText secondary="Total" />
          <Typography variant="subtitle2" name="amount">
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
            <LoadingButton onClick={validate} loading={processing}>
              Place Order
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
