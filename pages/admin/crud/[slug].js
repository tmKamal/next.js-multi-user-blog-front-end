import React, { useState, useEffect, useContext } from "react";

import dynamic from "next/dynamic";
import { withRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../../node_modules/react-quill/dist/quill.snow.css";

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
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { AuthContext } from "../../../context/auth-context";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { QuillModules, QuillFormats } from "../../../helpers/quill";

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
  quill: {
    marginBottom: "1rem",
  },
}));

const UpdateBlog = ({ router }) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };
  const [body, setBody] = useState(blogFromLS());
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [loadedCategories, setLoadedCategories] = useState();
  const [loadedTags, setLoadedTags] = useState();
  const [loadedBlog, setLoadedBlog] = useState();
  const [checkedCategories, setCheckedCategories] = useState([]); //To store the selected categories.
  const [checkedTags, setCheckedTags] = useState([]); // To store the selected tags.
  const [succesMsg, setSuccessMsg] = useState(false);
  const [values, setValues] = useState({
    bError: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });
  const {
    bError,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  useEffect(() => {
    //intiate FormData into formdata field
    setValues({ ...values, formData: new FormData() });

    //fetch categories
    const fetchCategories = async () => {
      try {
        setLoadedCategories(await sendRequest(`${API}/categories`));
      } catch (error) {}
    };
    //fetch tags
    const fetchTags = async () => {
      try {
        setLoadedTags(await sendRequest(`${API}/tags`));
      } catch (error) {}
    };
    //fetch blog
    console.log(router);
    const fetchBlog = async () => {
      try {
        setLoadedBlog(await sendRequest(`${API}/blog/${router.query.slug}`));
        errorPopupCloser();
        //console.log(loadedBlog);
      } catch (err) {}
    };

    fetchCategories();
    fetchTags();
    fetchBlog();
  }, [router]);

  useEffect(() => {
    //to fill the title data field with existing value
    if (loadedBlog) {
      setValues({ ...values, title: loadedBlog.title });
    }
    //filling quil body with old values
    if(loadedBlog){
        setBody(loadedBlog.body);
    }
    //filling category old values
    if (loadedBlog) {
      console.log(loadedBlog.categories);
      const allSelectedCats = [...checkedCategories];
      loadedBlog.categories.map((cat) => allSelectedCats.push(cat._id));
      setCheckedCategories(allSelectedCats);
    }
    //filling tag old values
    if (loadedBlog) {
      console.log(loadedBlog.tags);
      const allSelectedTags = [...checkedTags];
      loadedBlog.tags.map((tag) => allSelectedTags.push(tag._id));
      setCheckedTags(allSelectedTags);
    }
  }, [loadedBlog]);

  const changeHandler = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    console.log(value);
    formData.set(name, value);
    setValues({ ...values, bError: "", [name]: value, formData }); //clearing errors, if any presents.
  };

  const bodyHandler = (e) => {
    console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("your pressed the updated submit button!!");

    try {
      const resData = await sendRequest(
        `${API}/blog/${router.query.slug}`,
        "PUT",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      if (resData) {
        setSuccessMsg(true);
        console.log(resData);
        localStorage.removeItem("blog");
      }
    } catch (error) {}
  };

  const toggleCategories = (id) => {
    // clearing errors, if any is present
    setValues({ ...values, bError: "" });
    // if category not available in the checkedCategories array. it will return -1
    const allSelectedCats = [...checkedCategories];
    const clickedCategory = checkedCategories.indexOf(id);

    if (clickedCategory === -1) {
      allSelectedCats.push(id);
    } else {
      allSelectedCats.splice(clickedCategory, 1); //this will remove the selected category from the array
    }
    setCheckedCategories(allSelectedCats);
    console.log(allSelectedCats);
    formData.set("categories", allSelectedCats);
  };

  const toggleTags = (id) => {
    // clearing errors, if any is present
    setValues({ ...values, bError: "" });
    // if tags not available in the checkedTags array. it will return -1
    const clickedTag = checkedTags.indexOf(id);
    const allSelectedTags = [...checkedTags];

    if (clickedTag === -1) {
      allSelectedTags.push(id);
    } else {
      allSelectedTags.splice(clickedTag, 1);
    }
    setCheckedTags(allSelectedTags);
    console.log(allSelectedTags);
    formData.set("tags", allSelectedTags);
  };

  return (
    <AdminLayout>
      <Grid item xs={12} md={6} lg={9}>
        <div className={classes.paperForForm}>
          <img src="/editblog.png" alt="blog edit image" />
        </div>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.title}
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Lets edit the blog post...
            </Typography>
            <form onSubmit={submitHandler} className={classes.form} noValidate>
              <TextField
                value={title}
                onChange={changeHandler("title")} //
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
              />
              <ReactQuill
                value={body}
                placeholder="write somethin beautifull.."
                onChange={bodyHandler}
                className={classes.quill}
                modules={QuillModules}
                formats={QuillFormats}
              ></ReactQuill>

              {/* Image Uploader */}

              {/* Categories (CheckBoxes) */}

              <p>Categories</p>
              <FormGroup row>
                {loadedCategories &&
                  loadedBlog &&
                  loadedCategories.map((c, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          name={c.name}
                          checked={
                            checkedCategories.indexOf(c._id) === -1
                              ? false
                              : true
                          }
                          onChange={() => toggleCategories(c._id)}
                        />
                      }
                      label={c.name}
                    />
                  ))}
              </FormGroup>
              <p>Tags</p>
              <FormGroup row>
                {loadedTags && loadedBlog &&
                  loadedTags.map((tag, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          name={tag.name}
                          onChange={() => toggleTags(tag._id)}
                          checked={
                            checkedTags.indexOf(tag._id) === -1
                              ? false
                              : true
                          }
                        />
                      }
                      label={tag.name}
                    />
                  ))}
              </FormGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Publish
              </Button>
            </form>
            {succesMsg && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Blog has been updated successfully.
                <strong>check it out!</strong>
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
                <strong>check it out!</strong>
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
      {/* PopUp */}
    </AdminLayout>
  );
};

export default withRouter(UpdateBlog);
