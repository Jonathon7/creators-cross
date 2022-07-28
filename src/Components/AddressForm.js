import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import AddressSuggestion from "./AddressSuggestion";

export default function AddressForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress1, setBillingAddress1] = useState("");
  const [billingAddress2, setBillingAddress2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState({});
  const [suggestionError, setSuggestionError] = useState("");
  const [corrections, setCorrections] = useState([]);

  useEffect(() => {
    // if the user had shipping or billing address information saved in session, it gets populated into text fields
    axios
      .get("/api/address-information")
      .then((res) => {
        if (!Object.keys(res.data).length) return;
        setFirstName(res.data.shippingAddress.firstName);
        setLastName(res.data.shippingAddress.lastName);
        setAddress1(res.data.shippingAddress.address1);
        setAddress2(
          res.data.shippingAddress.address2 !== "NULL" &&
            res.data.shippingAddress.address2 !== "UNDEFINED"
            ? res.data.shippingAddress.address2
            : ""
        );
        setCity(res.data.shippingAddress.city);
        setState(res.data.shippingAddress.state);
        setZip(res.data.shippingAddress.zip);
        setEmail(res.data.shippingAddress.email);

        setBillingFirstName(res.data.billingAddress.firstName);
        setBillingLastName(res.data.billingAddress.lastName);
        setBillingAddress1(res.data.billingAddress.address1);
        setBillingAddress2(
          res.data.billingAddress.address2 !== "NULL"
            ? res.data.billingAddress.address2
            : ""
        );
        setBillingCity(res.data.billingAddress.city);
        setBillingState(res.data.billingAddress.state);
        setBillingZip(res.data.billingAddress.zip);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validate = async () => {
    if (!firstName || !lastName || !address1 || !city || !zip || !email) {
      setError(true);
    } else if (
      !sameAsBilling &&
      (!billingAddress1 || !billingCity || !billingState || !billingZip)
    ) {
      setError(true);
    } else {
      !error && setError(false);

      try {
        const URL = `/api/validate-address/${encodeURIComponent(
          address1
        )}/${encodeURIComponent(city)}/${state}/${zip}/${encodeURIComponent(
          address2
        )}`;

        const addressValidation = await axios.get(URL);

        if (suggestionError) {
          setSuggestionError("");
        }

        if (!addressValidation.data.hasOwnProperty("Address1")) {
          addressValidation.data.Address1 = [""];
        }

        setSuggestion(addressValidation.data);

        if (addressValidation.data.hasOwnProperty("Footnotes")) {
          setCorrections(addressValidation.data.Footnotes);
          toggleModal();
        } else {
          continueWithSuggestedAddress(addressValidation.data);
        }
      } catch (e) {
        console.log(e);
        setSuggestionError(e.response.data.message);
        toggleModal();
      }
    }
  };

  const toggleSameAsBilling = () => {
    setSameAsBilling(!sameAsBilling);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const continueWithSuggestedAddress = (address) => {
    let suggestedAddress = suggestion;

    if (!Object.keys(suggestion).length) {
      suggestedAddress = address;
    }

    if (!suggestedAddress.hasOwnProperty("Address1")) {
      suggestedAddress.Address1 = [""];
    }

    axios
      .post("/api/address-information", {
        shippingAddress: {
          firstName,
          lastName,
          address1: suggestedAddress.Address2[0],
          address2: suggestedAddress.Address1[0],
          city: suggestedAddress.City[0],
          state: suggestedAddress.State[0],
          zip: suggestedAddress.Zip5[0],
          email,
        },
        billingAddress: {
          firstName: !sameAsBilling ? billingFirstName : firstName,
          lastName: !sameAsBilling ? billingLastName : lastName,
          address1: !sameAsBilling
            ? billingAddress1
            : suggestedAddress.Address2[0],
          address2: !sameAsBilling
            ? billingAddress2
            : suggestedAddress.Address1[0],
          city: !sameAsBilling ? billingCity : suggestedAddress.City[0],
          state: !sameAsBilling ? billingState : suggestedAddress.State[0],
          zip: !sameAsBilling ? billingZip : suggestedAddress.Zip5[0],
        },
      })
      .then(() => props.handleNext())
      .catch((err) => console.log(err));
  };

  const continueAnyway = () => {
    axios
      .post("/api/address-information", {
        shippingAddress: {
          firstName,
          lastName,
          address1,
          address2,
          city,
          state,
          zip,
          email,
        },
        billingAddress: {
          firstName: !sameAsBilling ? billingFirstName : firstName,
          lastName: !sameAsBilling ? billingLastName : lastName,
          address1: !sameAsBilling ? billingAddress1 : address1,
          address2: !sameAsBilling ? billingAddress2 : address2,
          city: !sameAsBilling ? billingCity : city,
          state: !sameAsBilling ? billingState : state,
          zip: !sameAsBilling ? billingZip : zip,
        },
      })
      .then(() => props.handleNext())
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <AddressSuggestion
        open={open}
        close={toggleModal}
        address1={address1}
        address2={address2}
        city={city}
        state={state}
        zip={zip}
        suggestion={suggestion}
        error={suggestionError}
        corrections={corrections}
        continueWithSuggestedAddress={continueWithSuggestedAddress}
        continueAnyway={continueAnyway}
      />
      <Typography variant="h6" gutterBottom>
        Shipping Address
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
      </Grid>

      <div style={{ marginTop: 25 }} />

      {!sameAsBilling && (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Billing Address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id="billingFirstName"
                name="billingFirstName"
                label="First name"
                value={billingFirstName}
                fullWidth
                autoComplete="given-name"
                error={error && !billingFirstName && true}
                helperText={error && "Required!"}
                onChange={(e) => setBillingFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="billingLastName"
                name="billingLastName"
                label="Last name"
                value={billingLastName}
                fullWidth
                autoComplete="family-name"
                error={error && !billingLastName && true}
                helperText={error && "Required!"}
                onChange={(e) => setBillingLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="billingAddress1"
                name="billingAddress1"
                label="Address line 1"
                value={billingAddress1}
                fullWidth
                autoComplete="shipping address-line1"
                error={error && !billingAddress1 && true}
                helperText={error && "Required!"}
                onChange={(e) => setBillingAddress1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="billingAddress2"
                name="billingAddress2"
                label="Address line 2"
                value={billingAddress2}
                fullWidth
                autoComplete="shipping address-line2"
                onChange={(e) => setBillingAddress2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="billingCity"
                name="billingCity"
                label="City"
                value={billingCity}
                fullWidth
                autoComplete="shipping address-level2"
                error={error && !billingCity && true}
                helperText={error && "Required!"}
                onChange={(e) => setBillingCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                select
                id="billingState"
                name="billingState"
                label="State"
                value={billingState}
                fullWidth
                error={error && !billingState && true}
                helperText={error && "Required!"}
                onChange={(e) => setBillingState(e.target.value)}
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
                id="billingZip"
                name="billingZip"
                label="Zip / Postal code"
                value={billingZip}
                fullWidth
                autoComplete="shipping postal-code"
                error={error && !billingZip && true}
                helperText={error && "Required!"}
                onChange={(e) => setBillingZip(e.target.value)}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}

      <Grid container justifyContent="space-between" style={{ margin: 5 }}>
        <FormControlLabel
          control={
            <Checkbox
              color="info"
              name="saveAddress"
              value="yes"
              checked={sameAsBilling}
              onClick={toggleSameAsBilling}
            />
          }
          label="Same as billing address"
        />

        <Button onClick={validate}>Next</Button>
      </Grid>
    </React.Fragment>
  );
}

let states = [
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
