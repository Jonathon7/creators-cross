import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    marginBottom: 5,
    padding: 5,
    background: "#F7F7F7",
  },
  link: {
    opacity: 0.8,
  },
  grid: {},
});

const subcategories = ["type1", "type2", "type3", "type4"];

export default function SubcategoryBanner() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.card} variant="outlined">
        <Grid
          container
          direction="row"
          justify="space-around"
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
                className={classes.link}
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
