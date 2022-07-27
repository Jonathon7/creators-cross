import React, { useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";

export default function ShippingForm(props) {
  useEffect(() => {
    axios
      .get("/api/delivery-calculator")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping
      </Typography>
    </React.Fragment>
  );
}
