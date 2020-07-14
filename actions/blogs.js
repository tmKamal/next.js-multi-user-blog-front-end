import queryString from 'query-string';
import { API } from '../config';

export const getSingleBlog=async(slug)=>{
    try{
        const response=await fetch(`${API}/blog/${slug}`);
        const responseData=await response.json();
        if(!response.ok){
            
            throw responseData;
        }else{
            
            return responseData
        }
    }catch(err){
        throw err;
    }
}

export const searchBlog=async(params)=>{
    console.log('search params', params);
    let query=queryString.stringify(params);
    console.log('query ',query);

    try{
        const response=await fetch(`${API}/blog/search?${query}`);
        const responseData=await response.json();
        if(!response.ok){
            
            throw responseData;
        }else{
         
            return responseData
        }
    }catch(err){
        throw err;
    }
}



export const getAllBlogs=async(skip,limit)=>{
    const data={
        limit,skip
    }
    try{
        const response =await fetch(`${API}/blogs-cat-tag`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.error);
        }else{
            console.log(response);
            return responseData
        }
    }catch(err){
        return err;
    }
}