import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import OrderDetails from "./OrderDetails";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment", "Order Details"];

function getStepContent(step, handleBack, handleNext) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} />;
    case 1:
      return (
        <PaymentForm
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 2:
      return <OrderDetails />;
    default:
      throw new Error("Unknown Step");
  }
}

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    axios.get("/api/cart").then((res) => {
      if (!Array.isArray(res.data)) {
        props.history.push("/cart");
      }
    });
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container>
        <Header sections={sections} title="Creator's Cross"></Header>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep, handleBack, handleNext)}
              </React.Fragment>
            </React.Fragment>
          </Paper>
        </main>
      </Container>
    </React.Fragment>
  );
}
