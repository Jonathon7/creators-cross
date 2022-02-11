import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Menu(props) {
  return (
    <Grid container direction="column" rowSpacing={0} spacing={0}>
      {props.links.map((elem) => {
        return (
          <Link
            color="inherit"
            variant="body2"
            href={elem.url}
            sx={{ textDecoration: "none", pt: 1.2 }}
          >
            <Typography variant="body1" component="a">
              {elem.name}
            </Typography>
          </Link>
        );
      })}
    </Grid>
  );
}
