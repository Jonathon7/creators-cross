import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import routes from "./routes";

const stripePromise = loadStripe(
  "pk_test_51JQGylG8zAC237SM9lLKzoCSuvCL3ulcyieOpF0Qbv9eMIJUGsM2VEnAK1xFQMSBpvE1IG1bxQeTL7pri37bfzkQ00sUBwgxcw"
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>{routes}</Router>
    </Elements>
  );
}

export default App;
