import React from "react";
import Typography from "@material-ui/core/Typography";

import Link from "../src/Link";

import Navigation from "../components/Navigation"; //navi
import StickyFooter from "../components/StickyFooter";
import { makeStyles, Container, Grid, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Divider from "@material-ui/core/Divider";
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
const AdminLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navigation></Navigation>

      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Typography
            color="inherit"
            style={{ fontWeight: "700" }}
            variant="h5"
            component="h2"
            gutterBottom
          >
            <Link href={"/admin"}>DASH BOARD</Link>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <List
                component="nav"
                className={classes.listSize}
                aria-label="mailbox folders"
              >
                <Link
                  className={classes.linkHref}
                  href="/admin/crud/category-tag"
                  underline="none"
                  color="secondary"
                >
                  <ListItem button>Create Category</ListItem>
                </Link>
                <Divider />
                <Link
                  className={classes.linkHref}
                  href="/admin/crud/tag-tag"
                  underline="none"
                  color="secondary"
                >
                  <ListItem button divider>
                    Create Tags
                  </ListItem>
                </Link>

                <a
                  className="MuiTypography-root MuiLink-root MuiLink-underlineNone MuiTypography-colorSecondary"
                  href="/admin/crud/blog-create"
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                >
                  <ListItem button>Create Blog</ListItem>
                </a>
                <Divider />
                <Link
                  className={classes.linkHref}
                  href="/blog"
                  underline="none"
                  color="secondary"
                >
                  <ListItem button>Blog</ListItem>
                </Link>
                <Divider />
              </List>
            </Grid>

            {children}
          </Grid>
        </Container>
      </main>

      <StickyFooter></StickyFooter>
    </React.Fragment>
  );
};

export default AdminLayout;
