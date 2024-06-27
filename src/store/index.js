import { createStore } from "redux";

const productsReducer = (state={products:[]},action)=>{
    if(action.type==='SET_DATA'){
        return {products:action.payload.response};
    }
    // if(action.type==='ADD_ITEM'){

    // }
    // if(action.type==='REMOVE_ITEM'){

    // }
    // if(action.type==='UPDATE_ITEM'){

    // }
    return state;
}

export const store = createStore(productsReducer);