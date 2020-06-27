import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../../src/ProTip";
import Link from "../../src/Link";
import Copyright from "../../src/Copyright";

import StickyFooter from "../../components/StickyFooter";
import { makeStyles, Container, Grid, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Divider from "@material-ui/core/Divider";
import AdminLayout from "../../layouts/admin-layout";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  listSize: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  linkHref: {
    fontSize: "1rem",
    fontWeight: "500",
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <AdminLayout>
      <Grid item xs={12} md={6}>
        <Paper>
          <p>dashBoard</p>
        </Paper>
      </Grid>
    </AdminLayout>
  );
};
export default Index;
