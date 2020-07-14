import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { API } from "../../config";
import { AuthContext } from "../../context/auth-context";
import { IMG } from "../../config";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../../src/ProTip";
import Link from "../../src/Link";
import Copyright from "../../src/Copyright";

import StickyFooter from "../../components/StickyFooter";
import {
  makeStyles,
  Container,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
} from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Divider from "@material-ui/core/Divider";
import AdminLayout from "../../layouts/admin-layout";

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
  table: {
    minWidth: 650,
  },
  img: {
    maxHeight: "30px",
    minWidth: "auto",
  },
}));

const Index = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [
    reload,
    setReload,
  ] = useState(); /* resend the gettgegories request, After deleting a record.  */
  const [loadedBlogs, setLoadedBlogs] = useState();
  useEffect(() => {
    const fetchBlogsByUserId = async () => {
      try {
        setLoadedBlogs(
          await sendRequest(`${API}/blog/by-user`, "GET", null, {
            Authorization: "Bearer " + auth.token,
          })
        );
      } catch (error) {}
    };
    fetchBlogsByUserId();
  }, [sendRequest, reload]);

  return (
    <AdminLayout>
      <Grid item xs={12} md={6} lg={9}>
        <div className={classes.paperForForm}>
          <img src="/humaaans.png" alt="blogimage" />
        </div>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>

                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  loadedBlogs &&
                  loadedBlogs.blogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell component="th" scope="row">
                        {blog.title}
                      </TableCell>

                      <TableCell align="center">
                        <img
                          className={classes.img}
                          src={`${IMG}/${blog.photo}`}
                          alt={blog.title}
                        ></img>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton href={`/admin/crud/${blog.slug}`} color="secondary" aria-label="edit the blog">
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="secondary" aria-label="add an alarm">
                          <DeleteIcon style={{ color: red[500] }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
export default Index;
