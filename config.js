import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://bloggler.herokuapp.com/api"
  : "http://localhost:8000/api";

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

//export const IMG=publicRuntimeConfig.IMG;

/*
 export const IMG = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.PRODUCTION_IMG
  : publicRuntimeConfig.DEV_IMG;
 */

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
