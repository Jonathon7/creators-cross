import React from "react";
import MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Snackbar(props) {
  return (
    <MUISnackbar
      open={props.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={props.severity || "success"}
        sx={{ width: ["50%", "100%", "100%"] }}
      >
        {props.message}
      </Alert>
    </MUISnackbar>
  );
}
