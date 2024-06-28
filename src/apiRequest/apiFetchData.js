import { getData } from "./api.js";

export async function apiFetchData(){
    const data = await getData("products");
    return data;
}