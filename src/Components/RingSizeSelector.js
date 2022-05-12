import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const sizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

export default function RingSizeSelector(props) {
  return (
    <Box sx={{ width: [190, 200, 200], mr: [2, 3, 3], mb: 3 }}>
      <Typography variant="body1" style={{ paddingBottom: 10 }}>
        Select Size
      </Typography>
      <Grid container justifyContent="space-between" spacing={1}>
        {sizes.map((elem) => {
          return (
            <Grid item key={elem}>
              <Card
                sx={{
                  width: 40,
                  textAlign: "center",
                  border: "solid 1px #0000001A",
                  cursor: "pointer",
                  ...(props.value === elem && {
                    border: "solid 1px black",
                  }),
                  ...(props.values.includes(elem.toString()) && {
                    "&:hover": {
                      border: "solid 1px black",
                    },
                  }),
                }}
                onClick={
                  props.values && props.values.includes(elem.toString())
                    ? () => props.setValue(elem)
                    : null
                }
              >
                <Typography
                  variant="body1"
                  sx={{
                    ...(props.values &&
                      !props.values.includes(elem.toString()) && {
                        opacity: 0.4,
                        cursor: "auto",
                      }),
                  }}
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
