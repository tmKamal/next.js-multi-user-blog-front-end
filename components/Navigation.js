import React, { useContext, useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import Link from "../src/Link";
import { purple } from "@material-ui/core/colors";

import { AuthContext } from "../context/auth-context";

import { createMuiTheme } from "@material-ui/core/styles";

import SearchInput from "./search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Hidden } from "@material-ui/core";

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
  const auth = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link color="inherit" href="/">
              Dev-Engine
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
            <div>
              <Hidden smDown>
                <Button xs={false} onClick={handleMenu} color="inherit">
                  {auth.name}
                </Button>
              </Hidden>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link color="inherit" underline="none" href="/admin">
                    Dashboard
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link color="inherit" underline="none" href="/blog">
                    Blogs
                  </Link>
                </MenuItem>
                <MenuItem onClick={auth.logout}>logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
