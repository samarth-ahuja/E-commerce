import { combineReducers } from "redux";
import { DataRequestReducer } from "./DataRequestReducer";


export const RootReducer = combineReducers({
    DataRequest:DataRequestReducer,
})