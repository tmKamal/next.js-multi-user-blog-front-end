const withCSS=require('@zeit/next-css');

module.exports=withCSS({
    publicRuntimeConfig:{
        APP_NAME:'SEOBLOG',
        API_DEVELOPMENT:'http://localhost:8000/api',
        PRODUCTION:false,
        DOMAIN_DEVELOPMENT:'http://localhost:3000',
        DOMAIN_PRODUCTION:'http://yourdomain.com',
        FB_APP_ID:'6987fsak'
    }
});