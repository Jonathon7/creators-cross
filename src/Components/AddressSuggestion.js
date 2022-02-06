import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddressCard from "./AddressCard";
import CorrectionsList from "./CorrectionsList";

export default function AddressSuggestion(props) {
  return (
    <Modal open={props.open} onClose={props.close}>
      <Box
        sx={{
          maxWidth: 800,
          maxHeight: 800,
          bgcolor: "#fff",
          m: "auto",
          mt: 5,
          pb: 3,
        }}
      >
        {props.error !== "" ? (
          <Typography variant="h6" component="h1">
            {props.error}
          </Typography>
        ) : Object.keys(props.suggestion).length ? (
          <Grid container direction="column">
            <AddressCard
              title="Entered Address"
              address1={props.address1}
              address2={props.address2}
              city={props.city}
              state={props.state}
              zip={props.zip}
            />

            <AddressCard
              title="Suggested Address"
              address1={props.suggestion.Address2[0]}
              address2={props.suggestion.Address1[0]}
              city={props.suggestion.City[0]}
              state={props.suggestion.State[0]}
              zip={props.suggestion.Zip5[0]}
            />

            <CorrectionsList corrections={props.corrections} />

            <Typography
              variant="body1"
              component="div"
              style={{ marginLeft: 20, marginBottom: 20 }}
            >
              Using the suggested address helps ensure that your order is
              deliverable.
            </Typography>

            <Grid
              container
              justifyContent="flex-end"
              spacing={1}
              style={{ paddingRight: 20 }}
            >
              <Grid item>
                <Button variant="outlined" onClick={props.continueAnyway}>
                  Continue Anyway
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={props.continueWithSuggestedAddress}
                >
                  Use Suggested Address
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div />
        )}
      </Box>
    </Modal>
  );
}
