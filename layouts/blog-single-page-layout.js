import React from 'react';
import Navigation from '../components/Navigation';
import StickyFooter from '../components/StickyFooter';
import { Container } from '@material-ui/core';

const BlogSinglePageLayout=(props)=> {
  
  return (
    <React.Fragment>

      <Navigation></Navigation>
      <Container maxWidth="xl">
        {props.children}
      </Container>
      <StickyFooter></StickyFooter>
    </React.Fragment>
   
  );
}
export default BlogSinglePageLayout;
