import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AvailablePendantsList() {
  return (
    <React.Fragment>
      <Modal open={props.open} onClose={props.close}>
        <Box
          sx={{
            bgcolor: "#fff",
            width: ["95%", 600, 600],
            height: 300,
            m: "auto",
            mt: [10, 20, 20],
          }}
        >
          <Typography
            variant="h4"
            component="p"
            sx={{ textAlign: "center", pt: 2 }}
          >
            Available Pendants
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
