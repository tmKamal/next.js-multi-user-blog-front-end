import { API } from "../config"
export const ContactUsAction=(msg)=>{
    return fetch(`${API}/contact-form`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(msg)
    }).then((response)=>{
        return response.json();
    }).catch(err=>console.log(err))
}