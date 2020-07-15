import React from "react";
import StandardLayout from "../../layouts/standard-layout";
import Head from "next/head";

import { getSingleBlog } from "../../actions/blogs";
import { Box, Grid } from "@material-ui/core";

import SingleBlogPost from "../../components/blog/blog-single-paper";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import { getBlogsByCategoryId } from "../../actions/category";
import BlogCard from "../../components/blog/blog-card";
import Masonry from "react-masonry-css";

const SingleBlog = ({ category, blogs, error }) => {
  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta name="description" content={category.mdesc}></meta>
      <link rel="canonical" href={`${DOMAIN}/${query.slug}`}></link>
      {/*meta for faceBook */}
      <meta
        property="og:title"
        content={`${blog.title} | ${APP_NAME}`}
      ></meta>{" "}
      {/* for facebook to grab the info [Open graph]*/}
      <meta property="og:description" content={blog.mdesc}></meta>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={blog.photo} />
      <meta property="og:image:secure_url" content={blog.photo} />
      <meta
        property="og:image:type"
        content={`image/${blog.photo.split(".").pop()}`}
      />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };

  const listAllBlogs = () => {
    return blogs.map((b, i) => {
      return <BlogCard key={i} post={b}></BlogCard>;
    });
  };

  return (
    <React.Fragment>
      {/* {!error && head()} */}
      <StandardLayout>
        <Box mt={3}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {/* {listAllBlogs()} */}
            {!error && listAllBlogs()}
          </Masonry>
        

          {error && <p>huh! looks like someone lost the way!!</p>}
        </Box>
      </StandardLayout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  return getBlogsByCategoryId(query.slug)
    .then((data) => {
      return {
        category: data.category,
        blogs: data.blogs,
      };
    })
    .catch((err) => {
      return { error: err };
    });
};

export default SingleBlog;
