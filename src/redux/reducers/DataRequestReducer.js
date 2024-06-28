import {FETCH_DATA_REQUEST,FETCH_DATA_SUCCESS,FETCH_DATA_FAILURE} from '../constants/DataRequestConstants';

const initialState = {
    data:null,
    loading:false,
    error:null
}

export const DataRequestReducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading:true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.payload
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}