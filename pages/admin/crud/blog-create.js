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
  Link,
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
import { Alert, AlertTitle } from '@material-ui/lab';
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
  },mTop:{
    marginTop:"1rem"
  }
}));

const CreateBlog = ({ router }) => {
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
  const [checkedCategories, setCheckedCategories] = useState([]); //To store the selected categories.
  const [checkedTags, setCheckedTags] = useState([]); // To store the selected tags.
  const [succesMsg, setSuccessMsg] = useState(false);
  const [previewUrl,setPreviewUrl]=useState();
  const [file,setFile]=useState();
  const [responseData,setResponseData]=useState();
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
  useEffect(()=>{
    if(!file){
        return;
    }
    /* in here we access the browser file reader API to get the image url */
    const fileReader=new FileReader();
    fileReader.onload=()=>{
        setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
},[file]);

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

    fetchCategories();
    fetchTags();
  }, [router]);

  const changeHandler = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    let pickedFile;
    if(name==='photo'){
      pickedFile=event.target.files[0];
            setFile(pickedFile);
    }
    console.log(value);
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData });
    setSuccessMsg(false);//clearing success messages.
    errorPopupCloser();//Clearing errors, using hook output error clearing method
  };

  const bodyHandler = (e) => {
    setSuccessMsg(false);//clearing success messages.
    errorPopupCloser();//Clearing errors, using hook output error clearing method
    console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("your pressed the submit button!!");

    try {
      const resData = await sendRequest(`${API}/blog`, "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      if (resData) {
        setResponseData(resData);
        setSuccessMsg(true);
        

        console.log(resData);
        localStorage.removeItem("blog");
      }
    } catch (error) {
     
    }
  };

  const toggleCategories = (id) => {
   
    errorPopupCloser(); // clearing errors, if any is present
    // if category not available in the checkedCategories array. it will return -1
    const clickedCategory = checkedCategories.indexOf(id);
    const allSelectedCats = [...checkedCategories];

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
    errorPopupCloser(); // clearing errors, if any is present
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
          <img src="/humaaans.png" alt="blogimage" />
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
              Lets create the blog post...
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
              <div className="image-upload__preview">
                    {previewUrl &&<img src={previewUrl} alt="preview"></img>}
                    {!previewUrl &&<p>Choose a image.</p>}
                </div>
              <input
                onChange={changeHandler("photo")}
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                hidden
              />
              <label htmlFor="contained-button-file">
                <Button
                  startIcon={<PhotoCamera />}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Upload
                </Button>
              </label>

              {/* Categories (CheckBoxes) */}

              <p>Categories</p>
              <FormGroup row>
                {loadedCategories &&
                  loadedCategories.map((c, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          name={c.name}
                          onChange={() => toggleCategories(c._id)}
                        />
                      }
                      label={c.name}
                    />
                  ))}
              </FormGroup>
              <p>Tags</p>
              <FormGroup row>
                {loadedTags &&
                  loadedTags.map((tag, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          name={tag.name}
                          onChange={() => toggleTags(tag._id)}
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
            {succesMsg && responseData && (
              <Alert className={classes.mTop} severity="success">
                <AlertTitle>Success! </AlertTitle>
                
                <strong>Blog post has been published</strong><Link style={{fontWeight:'500'}} href={`/blog/${responseData.slug}`}>&nbsp;&nbsp;To your new blog post</Link>
              </Alert>
            )}
            {error &&<Alert className={classes.mTop}  severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{error}</strong>
            </Alert>}
          </Paper>
        </Grid>
      </Grid>
      {/* PopUp */}
    </AdminLayout>
  );
};

export default withRouter(CreateBlog);
