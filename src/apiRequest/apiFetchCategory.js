import { apiCall } from "./api.js";

export async function apiFetchCategory(){
    const data = await apiCall("products/categories");
    return data;
}