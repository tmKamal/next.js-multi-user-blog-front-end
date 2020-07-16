import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { AuthContext } from "../context/auth-context";
import Router, { useRouter } from "next/router";
import Index from ".";
import NProgress from "nprogress";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

export default function MyApp(props) {
  const { Component, pageProps } = props;
  /* 
  Legends 
    Custom Authentication -ACus
  */
  /*define the states  -ACus */
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [role, setRole] = useState(false);
  const [tokenExpAuto, setTokenExpAuto] = useState();

  /* Login -ACus*/
  const login = useCallback((uid, token, role, tokenExpDate) => {
    setToken(token);
    setUserId(uid);
    setRole(role);
    let tokenExp;
    if (!tokenExpDate) {
      tokenExp = new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpAuto(tokenExp);
    } else {
      tokenExp = tokenExpDate; //assigning the old date, retrived from the parameter
      setTokenExpAuto(tokenExp);
    }
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        tokenExp: tokenExp.toISOString(), //setting expiration time for the token we gonna store in the local storage.
      })
    );
    console.log("Manual logged in" + role + " " + token);
    //Router.push("/admin"); //redirect to the admin dashboard
  }, []);

  /* Auto Login (If token is not expired yet) -ACus*/
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExp) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.role,
        new Date(storedData.tokenExp)
      );
    }
  }, [login]);

  /* Logout -ACus*/
  const logout = useCallback(() => {
    setToken(false);
    setUserId(null);
    setRole(null);
    setToken(null);

    localStorage.removeItem("userData");
    localStorage.clear();
    console.log(" logged out");
    Router.push("/login"); //redirect to the login page
  }, []);

  /* Auto logged out */

  /* Auto logged out End */

  /* route Gard (protected routes) */
  let allowed = true;
  const router = useRouter();

  if (router.pathname.startsWith("/admin") && role !== 1) {
    allowed = false;
  }
  const ComponentToRender = allowed ? Component : Index;/*  This will redirect the users to the index, if they are not admins */
  /* route Gard (protected routes) */

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            role: role,
            userId: userId,
            login: login,
            logout: logout,
          }}
        >
          <ComponentToRender {...pageProps} />
          {/* Custom Componet */}
        </AuthContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
