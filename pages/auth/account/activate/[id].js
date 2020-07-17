import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { withRouter } from "next/router";
import { SignupAction } from "../../../../actions/auth";
import StandardLayout from "../../../../layouts/standard-layout";
import { Box, Typography, Link, makeStyles, Grid, Button, LinearProgress } from "@material-ui/core";
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

const ActivateAccount = ({ router }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    msg: "",
    showButton: true,
  });
  const { name, token, error, loading, success, msg, showButton } = values;
  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({
        ...values,
        name,
        token,
      });
    }
  }, [router]);

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
    });
    SignupAction({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          msg: data.msg,
          showButton: false,
        });
      }
    });
  };
  return (
    <StandardLayout>
      <Box mx={2} my={5}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Account Activation
        </Typography>

        <Typography
          component="h3"
          align="center"
          color="textSecondary"
          paragraph
        >
          {`welcome back, ${name}`}
        </Typography>
        <Typography
          component="p"
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
        >
          Are your ready to activate your account? You're Just one click away to
          activate your dev-engine account.
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <Grid container spacing={2}>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error.msg} <Link href="/signup"> <strong>Sign-up again!</strong></Link>
                </Alert>
              </Grid>
            )}
            {msg && (
              <Grid item xs={12}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  {msg} <strong>You are now a member of Dev-Engine.</strong>{" "}
                  <Link href="/login"> Login with your credentials</Link>
                </Alert>
              </Grid>
            )}

            {showButton && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Activate Now
              </Button>
            )}
            <Grid item xs={12}>
              {loading && <LinearProgress />}
            </Grid>
          </Grid>
        </form>
      </Box>
    </StandardLayout>
  );
};
export default withRouter(ActivateAccount);
