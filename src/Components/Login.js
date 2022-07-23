import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@mui/material/Typography";
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

const sections = [
  { title: "Crosses", url: "/category/crosses" },
  { title: "Rings", url: "/category/rings" },
  { title: "Bracelets", url: "/category/spoon-bracelets" },
  { title: "Pendants", url: "/category/pendants" },
  { title: "Gifts", url: "/category/gifts" },
  { title: "About Us", url: "/about-us" },
  { title: "Blog", url: "/blog" },
];

export default function Login(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

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
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              margin: "auto",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "#2196f3" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form noValidate style={{ width: "90%", marginTop: 3 }}>
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
                sx={{
                  background: "#2196f3",
                  color: "#fff",
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#4dabf5",
                    color: "#fff",
                  },
                }}
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
