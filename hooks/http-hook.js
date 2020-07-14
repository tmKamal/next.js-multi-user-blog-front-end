import {useState,useEffect,useCallback,useRef} from "react";

export const useHttpClient=()=>{
    const[isLoading,setIsLoading]=useState(false);
    const[error,Error]=useState(false);

    const activeHttpRequest=useRef([]);

    const sendRequest=useCallback(async(url,method='GET',body=null,headers={})=>{
        setIsLoading(true);
        const httpAbortCtrl=new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);

        try{
            const response =await fetch(url,{
                method,body,headers,signal:httpAbortCtrl.signal
            });
            const responseData=await response.json();
            activeHttpRequest.current=activeHttpRequest.current.filter(reqCtrl=>reqCtrl !==httpAbortCtrl);
            if(!response.ok){
                throw new Error(responseData.error);
            }
            setIsLoading(false);
            return responseData;
        }catch(err){
            setError(err);
            setIsLoading(false);
            throw err;
        }
    },[]);
    const errorPopupCloser=()=>{
        setError(null);
    }
    useEffect(()=>{

    },[]);
    return {isLoading,error,sendRequest,errorPopupCloser};
}