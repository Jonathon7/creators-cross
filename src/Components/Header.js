import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";

export default function Header(props) {
  const { sections, title } = props;

  const [cartLength, setCartLength] = useState(null);

  useEffect(() => {
    if (!props.cart) {
      axios.get("/api/cart-length").then((res) => {
        if (!isNaN(res.data)) setCartLength(res.data);
      });
    }
  }, [cartLength, props.cart]);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: `1px solid #0000004D` }}>
        <Typography
          component="a"
          href="/"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flex: 1, textDecoration: "none" }}
        >
          {title}
        </Typography>
        {props.logout && (
          <Button size="small" onClick={props.logout}>
            Logout
          </Button>
        )}
        <Button size="small">Subscribe</Button>
        <IconButton href="/favorite">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton href="/cart">
          <Badge
            badgeContent={
              cartLength ? cartLength : props.cart ? props.cart.length : null
            }
            color="info"
          >
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          mt: [2, 0, 0],
          mb: [2, 0, 0],
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent={["space-evenly", "space-between", "space-between"]}
          spacing={3}
          rowSpacing={1}
        >
          {sections.map((section) => (
            <Grid item key={section.title}>
              <Link
                color="inherit"
                variant="body2"
                href={section.url}
                sx={{ textDecoration: "none" }}
              >
                {section.title}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
