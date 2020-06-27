import {createContext} from 'react';

export const AuthContext=createContext({
    userId:null,
    isLoggedIn:false,
    token:null,
    role:null,
    login:()=>{},
    logout:()=>{}
})