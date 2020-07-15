const withCSS=require('@zeit/next-css');

module.exports=withCSS({
    env:{
        //can be access using process.env 
    },
    serverRuntimeConfig:{
        //will only be available on the server side
    },
    publicRuntimeConfig:{
        //will be available on both server and client
        APP_NAME:'SEOBLOG',
        API_DEVELOPMENT:'http://localhost:8000/api',
        PRODUCTION:process.env.PRODUCTION || false,
        DOMAIN_DEVELOPMENT:'http://localhost:3000',
        DOMAIN_PRODUCTION:'http://yourdomain.com',
        FB_APP_ID:'6987fsak',
        //DEV_IMG:'http://localhost:8000',
        //PRODUCTION_IMG:'http://YOURDOMAIN'
    }
});