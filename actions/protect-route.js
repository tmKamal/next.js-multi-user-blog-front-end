import React,{useContext, useEffect} from 'react';
import { AuthContext } from '../context/auth-context';
import  Router  from 'next/router';


const ProtectRoute=(Component)=>{
    
    return()=>{
        const auth=useContext(AuthContext);
        /* const router=useRouter(); */
        useEffect(()=>{
            if(!auth.isLoggedIn){
                Router.push('/login')
            }
        },[auth.isLoggedIn])
        return(<Component {...arguments}/>)
    }
}
export default ProtectRoute;