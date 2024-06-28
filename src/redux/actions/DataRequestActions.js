import {FETCH_DATA_REQUEST,FETCH_DATA_SUCCESS,FETCH_DATA_FAILURE} from '../constants/DataRequestConstants';
import { apiFetchData } from '../../apiRequest/apiFetchData';

export const fetchDataRequest = ()=>({
    type:FETCH_DATA_REQUEST
});
export const fetchDataSuccess = (data)=>({
    type:FETCH_DATA_SUCCESS,
    payload:data
});
export const fetchDataFailure = (err)=>({
    type:FETCH_DATA_FAILURE,
    payload:err
});

export const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchDataRequest());
      try {
        const response = await apiFetchData();
        console.log('Response ',response)
        dispatch(fetchDataSuccess(response.data));
      } catch (err) {
        console.log(err)
        dispatch(fetchDataFailure(err.message));
      }
    };
  };
