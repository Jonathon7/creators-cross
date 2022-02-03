import React from "react";
import MUISnackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";

export default function Snackbar(props) {
  return (
    <MUISnackbar
      open={props.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={props.severity || "success"} sx={{ width: "100%" }}>
        {props.message}
      </Alert>
    </MUISnackbar>
  );
}
