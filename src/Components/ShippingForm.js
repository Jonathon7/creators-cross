import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ShippingDetails from "./ShippingDetails";

export default function ShippingForm() {
  const [address, setAddress] = useState();
  const [options, setOptions] = useState({});

  useEffect(() => {
    axios
      .get("/api/delivery-calculator")
      .then((res) => {
        console.log(res.data);
        setAddress(res.data.address);
        setOptions(res.data.options);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping
      </Typography>
      {address && <ShippingDetails address={address} />}
      {options.hasOwnProperty("FirstClass") && (
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Shipping Options
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Priority Mail"
              control={<Radio />}
              label={
                "Priority Mail " +
                options.FirstClass.date +
                " $" +
                options.FirstClass.price
              }
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      )}
    </React.Fragment>
  );
}
