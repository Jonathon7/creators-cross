import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CorrectionsList(props) {
  return (
    <React.Fragment>
      <Box sx={{ ml: 3, mb: 3 }}>
        <Typography>Changes</Typography>
        {props.corrections.map((elem) => {
          const value = getAddressChangeDefinition(elem);
          return <Typography key={elem}>- {value}</Typography>;
        })}
      </Box>
    </React.Fragment>
  );
}

function getAddressChangeDefinition(enumeration) {
  switch (enumeration) {
    case "A":
      return "Zip Code Corrected";
    case "B":
      return "City / State Spelling Corrected";
    case "C":
      return "Invalid City / State / Zip";
    case "D":
      return "NO ZIP+4 Assigned";
    case "E":
      return "Zip Code Assigned for Multiple Response";
    case "F":
      return "Address could not be found in the National Directory File Database";
    case "G":
      return "Information in Firm Line used for matching";
    case "H":
      return "Missing Secondary Number";
    case "I":
      return "Insufficient / Incorrect Address Data";
    case "J":
      return "Dual Address";
    case "K":
      return "Multiple Response due to Cardinal Rule";
    case "L":
      return "Address component changed";
    case "LI":
      return "Match has been converted via LACS";
    case "M":
      return "Street Name changed";
    case "N":
      return "Address Standardized";
    case "O":
      return "Lowest +4 Tie-Breaker";
    case "P":
      return "Better address exists";
    case "Q":
      return "Unique Zip Code match";
    case "R":
      return "No match due to EWS";
    case "S":
      return "Incorrect Secondary Address";
    case "T":
      return "Multiple response due to Magnet Street Syndrome";
    case "U":
      return "Unofficial Post Office name";
    case "V":
      return "Unverifiable City / State";
    case "W":
      return "Invalid Delivery Address";
    case "X":
      return "No match due to out of range alias";
    case "Y":
      return "Military match";
    case "Z":
      return "Match made using the ZIPMOVE product data";
    default:
      return "Unkown Enumeration";
  }
}
