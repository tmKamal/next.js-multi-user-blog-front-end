import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Link from "../src/Link";
import Paper from "@material-ui/core/Paper";
import {
  Button,
  Grid,
  makeStyles,
  Avatar,
  TextField,
  CssBaseline,
  LinearProgress,
} from "@material-ui/core";
import StandardLayout from "../layouts/standard-layout";
import { ContactUsAction } from "../actions/mail";
import PhoneInTalkOutlinedIcon from "@material-ui/icons/PhoneInTalkOutlined";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: "1rem",
  },
}));

export default function Index() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    body: "",
    error: "",
    loading: false,
    msg: "",
    showForm: true,
  });

  const {
    firstName,
    lastName,
    email,
    body,
    error,
    loading,
    msg,
    showForm,
  } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({
      ...values,
      error: false,
      msg: false,
      [inputFieldName]: e.target.value,
      loading: true,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.table(values);
    const msg = {
      name: firstName + " " + lastName,
      email: email,
      body: body,
    };
    ContactUsAction(msg).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log(data.error);
        setIsLoading(false);
      } else {
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          body: "",
          error: "",
          loading: false,
          msg: data.msg,
          showForm: false,
        });
        setIsLoading(false);
      }
    });
  };
  return (
    <React.Fragment>
      <StandardLayout>
        <Box mx={2} my={5}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Contact Us
          </Typography>

          <Typography
            component="p"
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            We love to hear from you. Simply send us a message using our contact
            form and let us know how we can make Dev-Engine blogging platform work better
            for you.
          </Typography>
          <div>
            <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                lg={7}
                component={Paper}
                elevation={1}
                square
              >
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <PhoneInTalkOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Contact-Us
                  </Typography>
                  <form
                    onSubmit={submitHandler}
                    className={classes.form}
                    noValidate
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={onChangeHandler("firstName")}
                          type="text"
                          value={firstName}
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={onChangeHandler("lastName")}
                          value={lastName}
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={onChangeHandler("email")}
                          value={email}
                          error={error.param === "email" ? true : false}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          helperText={error.msg}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={onChangeHandler("body")}
                          value={body}
                          error={error.param === "body" ? true : false}
                          id="body"
                          label="Message"
                          multiline
                          rows={4}
                          variant="outlined"
                          required
                          fullWidth
                          name="body"
                          helperText={error.msg}
                          autoFocus
                        />
                      </Grid>

                      {error && (
                        <Grid item xs={12}>
                          <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error.msg} <strong>Try again!</strong>
                          </Alert>
                        </Grid>
                      )}
                      {msg && (
                        <Grid item xs={12}>
                          <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {msg} <strong>Thank You!</strong>
                          </Alert>
                        </Grid>
                      )}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Send
                      </Button>
                      <Grid item xs={12}>
                        {isLoading && <LinearProgress />}
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
              <Grid
                item
                xs={false}
                container
                justify="center"
                alignItems="center"
                sm={4}
                md={7}
                lg={5}
                component={Paper}
                elevation={1}
              >
                <img src="/contact.png" alt="blogimage" />
              </Grid>
            </Grid>
          </div>
          {/*  <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <br></br>
        <Link href="/admin" color="secondary">
          Go to the admin page
        </Link> */}
        </Box>
      </StandardLayout>
    </React.Fragment>
  );
}
