import { API } from "../config"

export const getBlogsByCategoryId=async(slug)=>{
    try{
        const response=await fetch(`${API}/category/${slug}`);
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