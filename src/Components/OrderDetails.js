import React from "react";
import Typography from "@material-ui/core/Typography";

export default function OrderDetails() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        We will send you an update when your order has shipped!
      </Typography>
    </React.Fragment>
  );
}
