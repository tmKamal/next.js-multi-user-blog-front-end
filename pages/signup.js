import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core/styles";
import {SignupAction,SigninAction, PreSignupAction} from "../actions/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Dev-Engine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/sign-up.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    msg: "",
    showForm: true,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    error,
    loading,
    msg,
    showForm,
  } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({
      ...values,
      error: false,
      msg:false,
      [inputFieldName]: e.target.value,
      loading: true,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.table(values);
    const user = {
      name: firstName + " " + lastName,
      email: email,
      password: password,
    };
    PreSignupAction(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log(data.error);
      } else {
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          msg: data.msg,
          showForm: false,
        });
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SignUP
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
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
                  error={error.param==='email'? true : false}
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
                  onChange={onChangeHandler("password")}
                  value={password}
                  error={error.param==='password'? true : false}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={error.msg}
                  autoComplete="current-password"
                />
              
              </Grid>
              {error&&<Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error.msg} <strong>check it out!</strong>
                </Alert>
              </Grid>}
              {msg&&<Grid item xs={12}>
                <Alert severity="success">
                  <AlertTitle>Confirm your email address</AlertTitle>
                  {msg} <p>In order to complete the sign-up process, please click the confirmation link.</p>
                </Alert>
              </Grid>}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"To  Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
