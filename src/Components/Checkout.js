import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Header from "./Header";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";

const steps = ["Address", "Payment"];

function getStepContent(step, handleBack, handleNext, finish) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} />;
    case 1:
      return (
        <PaymentForm
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          finish={finish}
        />
      );
    default:
      throw new Error("Unknown Step");
  }
}

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/cart").then((res) => {
      if (!Array.isArray(res.data.cart)) {
        navigate("/cart");
      }
    });
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const finish = () => {
    navigate("/confirmation");
  };

  return (
    <React.Fragment>
      <Container>
        <Header sections={sections} title="Creator's Cross"></Header>
        <CssBaseline />
        <Box
          sx={{
            width: ["auto", 600, 600],
            ml: "auto",
            mr: "auto",
          }}
        >
          <Paper sx={{ mt: [2, 4, 4], mb: [2, 4, 4], p: [1, 2, 2] }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ p: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep, handleBack, handleNext, finish)}
              </React.Fragment>
            </React.Fragment>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}
