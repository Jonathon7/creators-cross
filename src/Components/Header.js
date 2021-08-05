import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    textDecoration: "none",
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    axios.get("/api/cart-length").then((res) => {
      if (!isNaN(res.data)) setCartLength(res.data);
    });
  }, [cartLength]);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="a"
          href="/"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Button size="small">Subscribe</Button>
        <IconButton href="/favorite">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton href="/cart">
          <Badge
            badgeContent={
              props.cart && props.cart.length > cartLength
                ? props.cart.length
                : cartLength
            }
            color="secondary"
          >
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
