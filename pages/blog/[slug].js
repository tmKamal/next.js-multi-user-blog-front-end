import React from "react";
import StandardLayout from "../../layouts/standard-layout";
import Head from "next/head";

import { getSingleBlog } from "../../actions/blogs";
import { Box } from "@material-ui/core";

import SingleBlogPost from "../../components/blog/blog-single-paper";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import BlogSinglePageLayout from "../../layouts/blog-single-page-layout";

const SingleBlog = ({ blog, query, error }) => {
  const head = () => (
    <Head>
      <title>{blog.title} | {APP_NAME}</title>
      <meta
        name="description"
        content={blog.mdesc}
      ></meta>
      <link rel="canonical" href={`${DOMAIN}/${query.slug}`}></link>
      {/*meta for faceBook */}
      <meta
        property="og:title"
        content={`${blog.title} | ${APP_NAME}`}
      ></meta>{" "}
      {/* for facebook to grab the info [Open graph]*/}
      <meta
        property="og:description"
        content={blog.mdesc}
      ></meta>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta
        property="og:image"
        content={blog.photo}
      />
      <meta
        property="og:image:secure_url"
        content={blog.photo}
      />
      <meta property="og:image:type" content={`image/${blog.photo.split(".").pop()}`} />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );


  return (
      <React.Fragment>
          {!error && head()}
    <BlogSinglePageLayout>
      <Box mt={3}>
        {!error&& <SingleBlogPost bPost={blog}></SingleBlogPost>}
        {error && <p>huh! looks like someone lost the way!!</p>}
      </Box>
    </BlogSinglePageLayout>
    
      </React.Fragment>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  return getSingleBlog(query.slug)
    .then((data) => {
      return {
        blog: data,
        query: query,
      };
    })
    .catch((err) => {
      return { error: err };
    });
};

export default SingleBlog;
