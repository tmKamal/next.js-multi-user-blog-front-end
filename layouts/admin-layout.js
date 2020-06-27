import React from "react";
import Typography from "@material-ui/core/Typography";


import Link from "../src/Link";

import Navigation from "../components/Navigation";//navi
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
            <Typography variant="h4" component="h1" gutterBottom>
              Admin
            </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                  <List
                    component="nav"
                    className={classes.listSize}
                    aria-label="mailbox folders"
                  >
                    <ListItem button>
                      <Link
                        className={classes.linkHref}
                        href="/admin/crud/category-tag"
                        underline="none"
                        color="secondary"
                      >
                        Create Category
                      </Link>
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                      <Link
                        className={classes.linkHref}
                        href="/admin/crud/tag-tag"
                        underline="none"
                        color="secondary"
                      >
                        Create Tags
                      </Link>
                    </ListItem>
                    
                    <ListItem button>
                      <Link
                        className={classes.linkHref}
                        href="/admin/crud/blog-create"
                        underline="none"
                        color="secondary"
                      >
                       Create Blog
                      </Link>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <Link
                        className={classes.linkHref}
                        href="/blog"
                        underline="none"
                        color="secondary"
                      >
                        Blog
                      </Link>
                    </ListItem>
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