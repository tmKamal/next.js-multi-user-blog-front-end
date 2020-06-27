import React, { useState, useEffect, useContext } from "react";

import {
  makeStyles,
  Paper,
  Chip,
  Typography,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

import AdminLayout from "../../../layouts/admin-layout";
import { useHttpClient } from "../../../hooks/http-hook";
import { API } from "../../../config";
import { AuthContext } from "../../../context/auth-context";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),

    overflow: "auto",
  },
  chip: {
    fontSize: "1rem",
    margin: "0.5rem",
  },
  title: {
    marginLeft: "0.5rem",
  },
  paperForForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const CategoryTag = () => {
  const auth = useContext(AuthContext);
  const [catName, setCatName] = useState('');
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState();
  const [
    reload,
    setReload
  ] = useState(); /* resend the getCategories request, After submitting a new category.  */
  const [deleteSuccMsg,setDeleteSuccMsg]=useState(false);
  const [open, setOpen] = useState(false);
  const [catSlug,setCatSlug]=useState();
  const onChangeHandler = (e) => {
    setCatName(e.target.value);
  };
  /* Chip onClick */
   const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  /* Chip Delete */
  const chipDeleteHandler=(slug)=>{
    console.info("You clicked the delete icon." + slug);
    setCatSlug(slug);
    handleClickOpen();
    
  }

  const handleDelete = () => {
    console.log('im in!!');
    /* Delete Request */
    const deleteCategory = async () => {
      try {
        const delMsg=await sendRequest(`${API}/category/${catSlug}`,'DELETE',null,{Authorization: "Bearer " + auth.token});
        if (delMsg) {
            handleClose();
            setDeleteSuccMsg(true);
            setReload(!reload);
    
          }
    } catch (error) {
          handleClose()
      }

      
    };
    deleteCategory();
    
  };
 

  /* popUpOpener */
  const handleClickOpen = () => {
      console.log('should open the dialog')
    setOpen(true);
  };
  /* PopUpCloser */
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadedCategories(await sendRequest(`${API}/categories`));
      } catch (error) {}
    };
    fetchCategories();
  }, [sendRequest, reload]);

  const submitHandler = async () => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${API}/category`,
        "POST",
        JSON.stringify({
          name: catName,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      if (responseData) {
        setReload(!reload);
      }
    } catch (err) {}
  };
  return (
    <AdminLayout>
      <Grid item xs={12} md={6} lg={9}>
        <div className={classes.paperForForm}>
          <Typography component="h1" variant="h5">
            Create Category
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <TextField
              value={catName}
              onChange={onChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category Name"
              name="category"
              autoComplete="category"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.title}
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            Categories
          </Typography>
          {!isLoading &&
            loadedCategories &&
            loadedCategories.map((cat) => {
              return (
                <Chip
                  key={cat._id}
                  label={cat.name}
                  clickable
                  onClick={handleClick}
                  onDelete={() => chipDeleteHandler(cat.slug)}
                  color="primary"
                  className={classes.chip}
                />
              );
            })}
        </Paper>
        {deleteSuccMsg&&<Alert onClose={() => {setDeleteSuccMsg(false)}}>Category deleted successfully.</Alert>}
      </Grid>
      {/* PopUp */}
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
            Are you realy wanted to delete this category?
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
export default CategoryTag;
