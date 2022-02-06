import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";

const subcategories = ["type1", "type2", "type3", "type4"];

export default function SubcategoryBanner() {
  return (
    <React.Fragment>
      <Card
        className={classes.card}
        variant="outlined"
        sx={{ marginBottom: 5, padding: 5, background: "#F7F7F7" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          className={classes.grid}
        >
          {subcategories.map((elem, i) => {
            return (
              <Link
                color="inherit"
                noWrap
                key={i}
                variant="body2"
                href="#"
                sx={{ opacity: 0.8 }}
              >
                {elem}
              </Link>
            );
          })}
        </Grid>
      </Card>
    </React.Fragment>
  );
}
