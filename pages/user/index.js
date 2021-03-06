import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../../src/ProTip';
import Link from '../../src/Link';
import Copyright from '../../src/Copyright';
import Navigation from '../../components/Navigation';
import StickyFooter from '../../components/StickyFooter';



export default function Index() {
  return (
    <React.Fragment>

      <Navigation></Navigation>
      <Box mx={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          User
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <br></br>
        <Link href="/about" color="secondary">
          Go to the Signin page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
      <StickyFooter></StickyFooter>
    </React.Fragment>
   
  );
}
