import fetch from 'isomorphic-fetch';
import {API} from '../config';
import cookie from 'js-cookie';


export const PreSignupAction=(user)=>{
    return fetch(`${API}/pre-signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).then((response)=>{
        return response.json();
    }).catch(err=>console.log(err))
}

export const SignupAction=(token)=>{
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(token)
    }).then((response)=>{
        return response.json();
    }).catch(err=>console.log(err))
}

export  const SigninAction=(user)=>{
    return fetch(`${API}/login`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).then((response)=>{
        return response.json();
    }).catch(err=>console.log(err))
}
export const SignOut=next=>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
    return fetch(`${API}/signout`,{
        method:'GET'
    }).then(respone=>{
        console.log('signout success');
    }).catch(err=>{
        console.log(err);
    })
}

/* Set Cookie
===============

Next Js runs in the client side and browser side to.. (Server Rendering)
To set a cookie, first we have to check where we are right now.
->process.browser
*/
export const setCookie=(key,value)=>{
    var inTwoMinutes = new Date(new Date().getTime() + 2 * 60 * 1000);
    if(process.browser){
        cookie.set(key,value,{
            expires:inTwoMinutes,

        },{ sameSite: 'none' },{   secure: true });
    }
};
/* Remove Cookie - to remove  a cookie we only need the name of the cookie */
export const removeCookie=(key)=>{
    if(process.browser){
        cookie.remove(key,{
            expires:1
        })
    }
}
/* Get cookie */
export const getCookie=(key)=>{
    if(process.browser){
       return cookie.get(key)
    }
}
//local storage
export const setLocalStorage=(key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
export const removeLocalStorage=(key)=>{
    if(process.browser){
        localStorage.removeItem(key);
    }
}
//authenticate user by pass data to cookie and local storage
export const authenticate=(data,next)=>{
    setCookie('token',data.token);
    setLocalStorage('user',data.user);
    next();

};//this is act as a middleware

export const isAuth=()=>{
    if(process.browser){
        const cookieChecked=getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                console.log('how man how!!');
                return JSON.parse(localStorage.getItem('user'));//we have stored the data as the json first place. so we have to parse.

            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}