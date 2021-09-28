import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default function AddressForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // if the user had shipping information saved in session, it gets populated into text fields
    axios
      .get("/api/shipping-information")
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setAddress1(res.data.address1);
        setAddress2(res.data.address2);
        setCity(res.data.city);
        setState(res.data.state);
        setZip(res.data.zip);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validate = () => {
    if (!firstName || !lastName || !address1 || !city || !zip || !email) {
      setError(true);
    } else {
      !error && setError(true);
      axios
        .post("/api/shipping-information", {
          firstName,
          lastName,
          address1,
          address2,
          city,
          state,
          zip,
          email,
        })
        .catch((err) => console.log(err));

      props.handleNext();
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="firstName"
            name="firstName"
            label="First name"
            value={firstName || ""}
            fullWidth
            autoComplete="given-name"
            error={error && !firstName && true}
            helperText={error && "Required!"}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName || ""}
            fullWidth
            autoComplete="family-name"
            error={error && !lastName && true}
            helperText={error && "Required!"}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={address1 || ""}
            fullWidth
            autoComplete="shipping address-line1"
            error={error && !address1 && true}
            helperText={error && "Required!"}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            value={address2 || ""}
            fullWidth
            autoComplete="shipping address-line2"
            onChange={(e) => setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city || ""}
            fullWidth
            autoComplete="shipping address-level2"
            error={error && !city && true}
            helperText={error && "Required!"}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="state"
            name="state"
            label="State"
            value={state || ""}
            fullWidth
            error={error && !state && true}
            helperText={error && "Required!"}
            onChange={(e) => setState(e.target.value)}
          >
            {states.map((elem) => {
              return (
                <MenuItem value={elem.label} key={elem.label}>
                  {elem.label}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zip || ""}
            fullWidth
            autoComplete="shipping postal-code"
            error={error && !zip && true}
            helperText={error && "Required!"}
            onChange={(e) => setZip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            value={email || ""}
            fullWidth
            autoComplete="email"
            error={error && !email && true}
            helperText={error && "Required!"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid
          container
          xs={12}
          justifyContent="space-between"
          style={{ margin: 5 }}
        >
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
          <Button onClick={validate}>Next</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

var states = [
  { label: "AL" },
  { label: "AK" },
  { label: "AZ" },
  { label: "AR" },
  { label: "CA" },
  { label: "CO" },
  { label: "CT" },
  { label: "DE" },
  { label: "FL" },
  { label: "GA" },
  { label: "HI" },
  { label: "ID" },
  { label: "IL" },
  { label: "IN" },
  { label: "IA" },
  { label: "KS" },
  { label: "KY" },
  { label: "LA" },
  { label: "ME" },
  { label: "MD" },
  { label: "MA" },
  { label: "MI" },
  { label: "MN" },
  { label: "MS" },
  { label: "MO" },
  { label: "MT" },
  { label: "NE" },
  { label: "NV" },
  { label: "NH" },
  { label: "NJ" },
  { label: "NM" },
  { label: "NY" },
  { label: "NC" },
  { label: "ND" },
  { label: "OH" },
  { label: "OK" },
  { label: "OR" },
  { label: "PA" },
  { label: "RI" },
  { label: "SC" },
  { label: "SD" },
  { label: "TN" },
  { label: "TX" },
  { label: "UT" },
  { label: "VT" },
  { label: "VA" },
  { label: "WA" },
  { label: "WV" },
  { label: "WI" },
  { label: "WY" },
];
