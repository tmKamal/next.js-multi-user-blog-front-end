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

const TagSection = () => {
  const auth = useContext(AuthContext);
  const [tagName, setTagName] = useState('');
  const classes = useStyles();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedTags, setLoadedTags] = useState();
  const [
    reload,
    setReload
  ] = useState(); /* resend the gettgegories request, After submitting a new tag.  */
  const [deleteSuccMsg,setDeleteSuccMsg]=useState(false);
  const [open, setOpen] = useState(false);
  const [tagSlug,setTagSlug]=useState();
  const onChangeHandler = (e) => {
    setTagName(e.target.value);
  };
  /* Chip onClick */
   const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  /* Chip Delete */
  const chipDeleteHandler=(slug)=>{
    console.info("You clicked the delete icon." + slug);
    setTagSlug(slug);
    handleClickOpen();
    
  }

  const handleDelete = () => {
    console.log('im in!!');
    /* Delete Request */
    const deleteTag = async () => {
      try {
        const delMsg=await sendRequest(`${API}/tag/${tagSlug}`,'DELETE',null,{Authorization: "Bearer " + auth.token});
        if (delMsg) {
            handleClose();
            setDeleteSuccMsg(true);
            setReload(!reload);
    
          }
    } catch (error) {
          handleClose()
      }

      
    };
    deleteTag();
    
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
    const fetchTags = async () => {
      try {
        setLoadedTags(await sendRequest(`${API}/tags`));
      } catch (error) {}
    };
    fetchTags();
  }, [sendRequest, reload]);

  const submitHandler = async () => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${API}/tag`,
        "POST",
        JSON.stringify({
          name: tagName,
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
            Create Tag
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <TextField
              value={tagName}
              onChange={onChangeHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="tag"
              label="Tag Name"
              name="tag"
              autoComplete="tag"
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
            Tags
          </Typography>
          {!isLoading &&
            loadedTags &&
            loadedTags.map((tg) => {
              return (
                <Chip
                  key={tg._id}
                  label={tg.name}
                  clickable
                  onClick={handleClick}
                  onDelete={() => chipDeleteHandler(tg.slug)}
                  color="primary"
                  className={classes.chip}
                />
              );
            })}
        </Paper>
        {deleteSuccMsg&&<Alert onClose={() => {setDeleteSuccMsg(false)}}>tag deleted successfully.</Alert>}
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
            Are you realy wanted to delete this tag?
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
export default TagSection;
