import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { API } from "../../config";
import { AuthContext } from "../../context/auth-context";

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
  Typography,
  Link,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, red } from "@material-ui/core/colors";

import AdminLayout from "../../layouts/admin-layout";
import { Alert } from "@material-ui/lab";

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
  paperForForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  marginT: {
    marginTop: "2rem",
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
  const [deleteSuccMsg, setDeleteSuccMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [blogSlug, setBlogSlug] = useState();

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

  /* Chip Delete */
  const blogDeleteHandler = (slug) => {
    console.info("You clicked the delete icon." + slug);
    setBlogSlug(slug);
    handleClickOpen();
  };

  /* popUpOpener */
  const handleClickOpen = () => {
    console.log("should open the dialog");
    setOpen(true);
  };
  const handleDelete = () => {
    console.log("im in!!");
    /* Delete Request */
    const deleteBlog = async () => {
      try {
        const delMsg = await sendRequest(
          `${API}/blog/${blogSlug}`,
          "DELETE",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        if (delMsg) {
          handleClose();
          setDeleteSuccMsg(true);
          setReload(!reload);
        }
      } catch (error) {
        handleClose();
      }
    };
    deleteBlog();
  };
  /* PopUpCloser */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AdminLayout>
      <Grid item xs={12} md={6} lg={9}>
        <div className={classes.paperForForm}>
          <img src="/humaaans.png" alt="blogimage" />
        </div>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {deleteSuccMsg && (
            <Alert
              onClose={() => {
                setDeleteSuccMsg(false);
              }}
            >
              Blog has been successfully deleted.
            </Alert>
          )}

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
                          src={blog.photo}
                          alt={blog.title}
                        ></img>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          href={`/admin/crud/${blog.slug}`}
                          color="secondary"
                          aria-label="edit the blog"
                        >
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => blogDeleteHandler(blog.slug)}
                          color="secondary"
                          aria-label="add an alarm"
                        >
                          <DeleteIcon style={{ color: red[500] }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!isLoading && loadedBlogs && loadedBlogs.blogs.length === 0 && (
            <React.Fragment>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                className={classes.marginT}
              >
                You haven’t published any blog stories yet
              </Typography>
              <div>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      href="/admin/crud/blog-create"
                      variant="outlined"
                      color="primary"
                    >
                      Create One Now
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      {/* PopUp Dialog for delete confirmation*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confiramtion dialog box?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you realy wanted to delete this Blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};
export default Index;
