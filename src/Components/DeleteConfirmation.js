import React from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function DeleteConfirmation(props) {
  return (
    <React.Fragment>
      <Modal open={props.open} onClose={props.close}>
        <Box
          sx={{
            width: "70%",
            background: "#fff",
            m: "auto",
            mt: 10,
            mb: 10,
          }}
        >
          <Grid
            style={{
              width: "80%",
              margin: "auto",
              padding: 20,
            }}
          >
            <Typography>
              Are you sure you want to delete these item(s)
            </Typography>
            <Button onClick={props.close}>CANCEL</Button>
            <Button onClick={props.delete}>DELETE</Button>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
