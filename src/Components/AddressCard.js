import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function AddressCard(props) {
  return (
    <Card style={{ margin: 20 }}>
      <CardHeader title={props.title}></CardHeader>
      <CardContent>
        <Typography variant="body1" component="div">
          {props.address1} {props.address2 !== "NULL" && props.address2}
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
