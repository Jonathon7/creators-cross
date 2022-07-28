import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ShippingDetails(props) {
  return (
    <React.Fragment>
      <Box>
        <Typography>
          {props.address.firstName} {props.address.lastName}
        </Typography>
        <Typography>{props.address.email}</Typography>
        <Typography>
          {props.address.address1}
          {props.address.address2 && " " + props.address.address2},{" "}
          {props.address.city}, {props.address.state} {props.address.zip}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
