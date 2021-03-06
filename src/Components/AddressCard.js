import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function AddressCard(props) {
  return (
    <Card sx={{ mb: 3, mr: 3, width: ["100%", "auto", "auto"] }}>
      <CardHeader title={props.title}></CardHeader>
      <CardContent>
        <Typography variant="body1" component="div">
          {props.address1}{" "}
          {props.address2 !== "NULL" ||
            (props.address2 !== "UNDEFINED" && props.address2)}
        </Typography>
        <Typography variant="body1" component="div">
          {props.city}, {props.state} {props.zip}
        </Typography>
        <Typography variant="body1" component="div">
          United States
        </Typography>
      </CardContent>
    </Card>
  );
}
