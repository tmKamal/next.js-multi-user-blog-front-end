import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Link from "../src/Link";
import { Container, CssBaseline } from "@material-ui/core";
import Copyright from "../src/Copyright";


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '82vh',
      
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
  }));
  
  export default function StickyFooter() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <CssBaseline></CssBaseline>
        
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Copyright></Copyright>
          </Container>
        </footer>
      </div>
    );
  }