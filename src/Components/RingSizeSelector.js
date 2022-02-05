import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@mui/styles";

const sizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

const useStyles = makeStyles({
  card: {
    width: 40,
    textAlign: "center",
    border: "solid 1px #0000001A",
    cursor: "pointer",
  },
  selectable: {
    "&:hover": {
      border: "solid 1px black",
    },
  },
  active: {
    border: "solid 1px black",
  },
  disabled: {
    opacity: 0.4,
    cursor: "auto",
  },
});

export default function RingSizeSelector(props) {
  const classes = useStyles();

  return (
    <Box style={{ width: 200, marginRight: 20, marginBottom: 20 }}>
      <Typography variant="body1" style={{ paddingBottom: 10 }}>
        Select Size
      </Typography>
      <Grid container justifyContent="space-between" spacing={1}>
        {sizes.map((elem) => {
          return (
            <Grid item key={elem}>
              <Card
                className={`${classes.card} ${
                  props.value === elem && classes.active
                } ${
                  props.values &&
                  props.values.includes(elem.toString()) &&
                  classes.selectable
                }`}
                onClick={
                  props.values && props.values.includes(elem.toString())
                    ? () => props.setValue(elem)
                    : null
                }
              >
                <Typography
                  variant="body1"
                  className={
                    props.values && !props.values.includes(elem.toString())
                      ? classes.disabled
                      : null
                  }
                >
                  {elem}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
