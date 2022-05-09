import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import routes from "./routes";

const stripePromise = loadStripe(
  "pk_live_51JQGylG8zAC237SMmcSkt0xxil9ABlWU3jb9gMfqcgUOdjGPD3zqGZR0ancAGm4BpD4b2SLUm6zWNZzomRlKM3UZ000FV2qWCw"
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Elements>
  );
}

export default App;
