import React, {useContext } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "../src/Link";
import { purple } from "@material-ui/core/colors";
import  Router  from "next/router";
import { AuthContext } from "../context/auth-context";

import { createMuiTheme } from "@material-ui/core/styles";
import NProgress from "nprogress"; 
import SearchInput from "./search";



Router.onRouteChangeStart=url=>NProgress.start();
Router.onRouteChangeComplete=url=>NProgress.done();
Router.onRouteChangeError=url=>NProgress.done();

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

export default function Navigation(props) {
  const classes = useStyles();
  
  const auth=useContext(AuthContext);

 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {auth.isLoggedIn &&<IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>}
          <Typography  variant="h6" className={classes.title}>
            <Link color='inherit' href='/'>
            Bloggle
            
            </Link>
          </Typography>
          {/* {auth.isLoggedIn &&<Typography variant="h6" className={classes.title}>
            {auth.userId}
          </Typography>} */}
          <SearchInput></SearchInput>
          {!auth.isLoggedIn && (
            <Link href="/login" color="secondary">
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </ThemeProvider>
            </Link>
          )}
          {auth.isLoggedIn && (
            <ThemeProvider theme={theme}>
              <Button onClick={auth.logout} variant="contained" color="secondary">
                Sign out!
              </Button>
            </ThemeProvider>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
