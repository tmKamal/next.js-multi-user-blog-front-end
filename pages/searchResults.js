import React, { useState, useEffect } from "react";
import StandardLayout from "../layouts/standard-layout";
import Head from "next/head";

import { Box, Grid, Typography } from "@material-ui/core";

import { getBlogsByCategoryId } from "../actions/category";
import BlogCard from "../components/blog/blog-card";
import { useRouter } from "next/router";
import { searchBlog } from "../actions/blogs";

const SingleBlog = () => {
  const router = useRouter();
  console.log(router.query.search);
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });
  const { search, results, searched, message } = values;
  useEffect(() => {
    setValues({
      ...values,
      search: router.query.search,
    });
  }, [router.query]);
  useEffect(() => {
    if(search){
      searchBlog({ search }).then((data) => {
        setValues({
          ...values,
          results: data,
          searched: true,
          message: `${data.length} blogs found.`,
        });
        console.log("serch res:" + data);
      });
    }
    
  }, [search]);

  const listAllBlogs = () => {
    return results.map((b, i) => {
      return <BlogCard key={i} post={b}></BlogCard>;
    });
  };

  return (
    <React.Fragment>
      <StandardLayout>
      <Typography style={{marginTop:'1rem'}} variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        <Box mt={3}>
        {searched &&<Typography variant="h5" component="h5" gutterBottom>
          {message}
        </Typography>}
          <Grid container spacing={4}>
            {searched && listAllBlogs()}
            
          </Grid>
          {/* {error && <p>huh! looks like someone lost the way!!</p>} */}
        </Box>
        
      </StandardLayout>
    </React.Fragment>
  );
};

export default SingleBlog;
