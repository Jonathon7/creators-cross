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
          maxWidth: ["90%", "90%", 800],
          maxHeight: [800],
          bgcolor: "#fff",
          m: "auto",
          mt: 5,
          pr: [2, 0, 0],
          pb: 3,
          pl: 2,
          pt: 1,
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
              sx={{ ml: [0, 2, 2], mb: 2, mr: 2 }}
            >
              Using the suggested address helps ensure that your order is
              deliverable.
            </Typography>

            <Grid
              container
              justifyContent={["flex-start", "flex-end", "flex-end"]}
              spacing={[0, 1, 1]}
              rowSpacing={[1, 0, 0]}
              sx={{ pr: 2, pt: [2, 0, 0] }}
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
