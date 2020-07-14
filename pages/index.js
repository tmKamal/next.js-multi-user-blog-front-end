import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Navigation from "../components/Navigation";
import StickyFooter from "../components/StickyFooter";
import { Button, Grid } from "@material-ui/core";

export default function Index() {
  return (
    <React.Fragment>
      <Navigation></Navigation>
      <Box mx={2} my={5}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Under Construction
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          It's fun to peek into other people's worlds and see how they go about
          doing things.
        </Typography>
        <div>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button href="/blog" variant="contained" color="primary">
                Take a Peek
              </Button>
            </Grid>
            <Grid item>
              <Button href="/admin" variant="outlined" color="primary">
                Admin Panel
              </Button>
            </Grid>
          </Grid>
        </div>
       {/*  <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <br></br>
        <Link href="/admin" color="secondary">
          Go to the admin page
        </Link> */}
      </Box>
      <StickyFooter></StickyFooter>
    </React.Fragment>
  );
}
