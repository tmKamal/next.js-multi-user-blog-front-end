import React from 'react';
import Navigation from '../components/Navigation';
import StickyFooter from '../components/StickyFooter';
import { Container } from '@material-ui/core';

const StandardLayout=(props)=> {
  
  return (
    <React.Fragment>

      <Navigation></Navigation>
      <Container maxWidth="lg">
        {props.children}
      </Container>
      <StickyFooter></StickyFooter>
    </React.Fragment>
   
  );
}
export default StandardLayout;
