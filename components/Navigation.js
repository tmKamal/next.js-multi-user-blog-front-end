import React, { useEffect,useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "../src/Link";
import { purple } from "@material-ui/core/colors";

import { createMuiTheme } from "@material-ui/core/styles";
import { isAuth, SignOut } from "../actions/auth";
import Router  from "next/router";

const theme = createMuiTheme({
  palette: {
    primary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    secondary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const [ch,setCh]=useState(false);

  useEffect(()=>{
    console.log('exxxx');
    if(isAuth()){
      setCh(true);
    }
  })

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {!isAuth() && (
            <Link href="/login" color="secondary">
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </ThemeProvider>
            </Link>
          )}
          {ch && (
            <ThemeProvider theme={theme}>
              <Button onClick={()=>{SignOut(()=>{Router.replace(`/login`)})}} variant="contained" color="secondary">
                Sign out!
              </Button>
            </ThemeProvider>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
