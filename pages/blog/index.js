import { useState, useEffect } from "react";
import StandardLayout from "../../layouts/standard-layout";
import Head from "next/head";
import BlogCard from "../../components/blog/blog-card";
import { getAllBlogs } from "../../actions/blogs";
import { Grid, Box, Button, LinearProgress } from "@material-ui/core";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import { withRouter } from "next/router"; //router is for the canonical [SEO]
import MainFeaturedPost from "../../components/blog/headerImage";
import Chip from "@material-ui/core/Chip";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";

const Blogs = ({
  blogs,
  categories,
  tags,
  blogsLimit,
  totalBlogs,
  blogSkip,
  router,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState(blogs);
  const [isLoading, setIsLoading] = useState(false);
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials about all the modern web technologies. js react react.js express.js mongodb node.js"
      ></meta>
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`}></link>
      {/*meta for faceBook */}
      <meta
        property="og:title"
        content={`latest web development tutorials | ${APP_NAME}`}
      ></meta>{" "}
      {/* for facebook to grab the info [Open graph]*/}
      <meta
        property="og:description"
        content="Programming blogs and tutorials about all the modern web technologies. js react react.js express.js mongodb node.js"
      ></meta>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/public/images/main.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  useEffect(() => {
    console.log("rerendered");
  }, [isLoading]);

  const loadMore = async () => {
    setIsLoading(true);

    let toSkip = skip + limit;
    try {
      const data = await getAllBlogs(toSkip, limit);
      if (data.error) {
        throw new Error(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  const showLoadedBlogs = () => {
    return loadedBlogs.map((lb, i) => {
      return <BlogCard key={i} post={lb} ></BlogCard>;
    });
  };

  const listAllBlogs = () => {
    return blogs.map((b, i) => {
      return <BlogCard key={i} post={b}></BlogCard>;
    });
  };

  const listAllCategories = () => {
    return categories.map((c, i) => {
      return (
        <Chip
          key={i}
          label={c.name}
          onClick={() => categoryClickHandler(c.slug)}
          style={{ marginRight: "10px", marginBottom: "20px" }}
        ></Chip>
      );
    });
  };
  const categoryClickHandler = (slug) => {
    router.push(`/category/${slug}`);
  };
  return (
    <React.Fragment>
      {head()}
      <StandardLayout>
        <Box mt={3}>
          <Grid>
            <MainFeaturedPost></MainFeaturedPost>
          </Grid>
          <Grid>{listAllCategories()}</Grid>
          {/* <Grid container spacing={4}>
            {listAllBlogs()}
            {showLoadedBlogs()}
          </Grid> */}

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {/* {listAllBlogs()} */}
            {showLoadedBlogs()}
          </Masonry>

          {isLoading && <LinearProgress />}

          <Grid>
            {size > 0 && size >= limit && (
              <Button
                style={{ marginTop: "1rem" }}
                onClick={loadMore}
                variant="contained"
                color="primary"
              >
                Load More Blogs!!
              </Button>
            )}
          </Grid>
        </Box>
      </StandardLayout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = async () => {
  let skip = 0;
  let limit = 2;
  return getAllBlogs(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs); //for the canonical part[seo head section]
