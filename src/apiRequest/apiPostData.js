import { apiCall } from "./api";
export default function apiPostData(data){
    apiCall('/products','POST',JSON.stringify(data));
}