import { apiCall } from "./api.js";

export async function apiFetchData(item=""){
    if(item){
        return await apiCall(`products/+${item}`);    
    }
    const data = await apiCall("products");
    return data;
}