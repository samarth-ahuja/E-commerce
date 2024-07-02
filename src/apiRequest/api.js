const BASE_URL = 'https://fakestoreapi.com';

export async function apiCall(endpoint,method='GET',body=''){
    const url= `${BASE_URL}/${endpoint}`;
    try{
        const response = await fetch(url,{
            method,
            ...(body?{body}:null)
        });
        if(!response.ok){
            throw new Error("Failed api request...")
        }
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}