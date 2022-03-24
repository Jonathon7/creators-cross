import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Menu from "./Menu";

const products = [
  { name: "Crosses", url: "/category/crosses" },
  { name: "Rings", url: "/category/rings" },
  { name: "Bracelets", url: "/category/bracelets" },
  { name: "Pendants", url: "/category/pendants" },
  { name: "Gifts", url: "/category/gift" },
];

export default function MobileHeaderLinks() {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          display: ["flex", "none", "none"],
          position: "relative",
          overflow: "hidden",
          mt: 2,
          mb: 2,
        }}
      >
        <Button onClick={handleClick} variant="outlined" sx={{ mr: 8 }}>
          Browse Products
        </Button>
        <Link
          color="inherit"
          variant="body2"
          href="#"
          sx={{ textDecoration: "none" }}
        >
          About Us
        </Link>
        <Link
          color="inherit"
          variant="body2"
          href="#"
          sx={{ textDecoration: "none" }}
        >
          Blog
        </Link>
      </Grid>
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: 45,
            bgcolor: "#fff",
            height: 200,
            width: "90%",
            zIndex: 2,
            p: 2,
            boxShadow: 5,
            display: ["block", "none", "none"],
          }}
        >
          <Menu links={products} />
        </Box>
      )}
    </React.Fragment>
  );
}
