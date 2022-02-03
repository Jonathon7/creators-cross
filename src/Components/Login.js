import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Typography color="inherit" display="inline" component="i">
        Creator's Cross
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    margin: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2196f3",
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(3),
  },
  button: {
    background: "#2196f3",
    color: "#fff",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#4dabf5",
      color: "#fff",
    },
  },
}));

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "#" },
  { title: "Blog", url: "#" },
];

export default function Login(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const classes = useStyles();

  const validate = () => {
    if (!emailAddress || !password) {
      setFormError(true);
      return;
    }

    return true;
  };

  const authenticate = () => {
    if (!validate()) return;

    auth
      .login(emailAddress, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  return (
    <Box>
      <Header sections={sections} title="Creator's Cross" />
      <CssBaseline />
      <Card
        style={{
          minWidth: 300,
          maxWidth: 700,
          margin: "0 auto",
          marginTop: 50,
        }}
      >
        <CardContent>
          <Box className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => setEmailAddress(e.target.value)}
                    value={emailAddress}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    size="small"
                    error={formError && !emailAddress && true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                    error={formError && !password && true}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
                onClick={authenticate}
              >
                Login
              </Button>
            </form>
          </Box>
          <Box mt={3}>
            <Copyright />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
