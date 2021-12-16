import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaymentForm(props) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingInformation, setShippingInformation] = useState({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        // if cookie expires and their cart becomes empty
        if (!Array.isArray(res.data)) {
          props.history.push("/cart");
        }
        let total = 0;
        for (let i = 0; i < res.data.length; i++) {
          total += parseFloat(res.data[i].price);
        }
        setTotal(total);
        setCart(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/shipping-information")
      .then((res) => {
        setShippingInformation(res.data);
      })
      .catch((err) => console.log(err));
  }, [cart.length, props.history]);

  const pay = async () => {
    if (!stripe || !elements) {
    }

    axios
      .post("/create-payment-intent")
      .then(async (res) => {
        const paymentResult = await stripe.confirmCardPayment(res.data, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (paymentResult.error) {
          alert(paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === "succeeded") {
            props.handleNext();
          }
        }
      })
      .catch((err) => console.log(err));
  };

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

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {Array.isArray(cart) &&
            cart.map((product) => (
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText
                  primary={product.name}
                  secondary={product.category}
                />
                <Typography variant="body2">${product.price}</Typography>
              </ListItem>
            ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              ${total}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2} style={{ paddingBottom: 30 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>
              {shippingInformation.firstName} {shippingInformation.lastName}
            </Typography>
            <Typography gutterBottom>{shippingInformation.address1}</Typography>
            <Typography gutterBottom>
              {shippingInformation.city}, {shippingInformation.state}
              {" " + shippingInformation.zip}, {shippingInformation.country}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={8}>
            <CardElement onChange={handleChange} />
          </Grid>
          <Button onClick={props.handleBack}>Back</Button>
          <Button onClick={validate}>Place Order</Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
