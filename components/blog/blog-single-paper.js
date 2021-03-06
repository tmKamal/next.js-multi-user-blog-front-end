import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, Box } from "@material-ui/core";
import renderHTML from "react-render-html";
import { useHttpClient } from "../../hooks/http-hook";
import { API } from "../../config";
import moment from "moment";

import RelatedBlogCard from "./related-blog-card";
import DisqusThread from "../disqus";
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css'

const useStyles = makeStyles((theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
    },
    maxWidth: 1880,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  card: {
    boxShadow: theme.shadows[4],
  },
}));

function SingleBlogPost({ bPost }) {
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedRelatedBlogs, setLoadedRelatedBlog] = useState();
  useEffect(()=>{
    updateCodeSyntaxHighlighting();
  },[]);
  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  console.log(bPost);
  useEffect(() => {
    const fetchRelatedblogs = async () => {
      try {
        setLoadedRelatedBlog(
          await sendRequest(
            `${API}/blog/related`,
            "POST",
            JSON.stringify(bPost),
            {
              "Content-Type": "application/json",
            }
          )
        );
        //console.log(loadedBlog);
      } catch (err) {}
    };
    fetchRelatedblogs();
  }, []);

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={bPost.id}
          title={bPost.title}
          path={`/blog/${bPost.slug}`}
        />
      </div>
    );
  };

  return (
    <Box
      className={`lg-p-top ${classes.wrapper}`}
      display="flex"
      justifyContent="center"
    >
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item lg={9} md={12}>
            <Card className={classes.card}>
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant="h4">
                  <b>{bPost.title}</b>
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {moment(bPost.updatedAt).fromNow()}
                </Typography>
              </Box>
              <img className={classes.img} src={bPost.photo} alt="" />
              <Box p={3}>{renderHTML(bPost.body)}</Box>
            </Card>
          </Grid>
          <Grid
            container
            alignContent="flex-start"
            spacing={3}
            item
            lg={3}
            md={12}
          >
            {/* <Typography variant="h6" paragraph>
              Other arcticles
            </Typography> */}
            {!isLoading &&
              loadedRelatedBlogs &&
              loadedRelatedBlogs.blogs.map((b, i) => (
                <RelatedBlogCard key={i} post={b}></RelatedBlogCard>
              ))}
          </Grid>
              <Grid item sm={12}>{showComments()}</Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default SingleBlogPost;
