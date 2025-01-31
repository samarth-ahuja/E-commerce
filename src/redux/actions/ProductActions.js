import { FETCH_PRODUCTLIST_START, FETCH_PRODUCTLIST_SUCCESS, FETCH_PRODUCTLIST_FAILURE, FETCH_PRODUCTLIST_END, FETCH_PRODUCT_ITEM_START, FETCH_PRODUCT_ITEM_SUCCESS, FETCH_PRODUCT_ITEM_FAILURE, FETCH_PRODUCT_ITEM_END, ADD_PRODUCT_ITEM, UPDATE_PRODUCT_ITEM, DELETE_PRODUCT_ITEM, FETCH_CATEGORY_LIST_START, FETCH_CATEGORY_LIST_END, FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_FAILURE } from '../constants/ProductConstants';
import { apiFetchData } from '../../apiRequest/apiFetchData';
import { apiFetchCategory } from '../../apiRequest/apiFetchCategory';


export const fetchProductListStart = () => ({
  type: FETCH_PRODUCTLIST_START
});
export const fetchProductListSuccess = (data) => ({
  type: FETCH_PRODUCTLIST_SUCCESS,
  payload: data
});
export const fetchProductListFailure = (err) => ({
  type: FETCH_PRODUCTLIST_FAILURE,
  payload: err
});

export const fetchProductListEnd = () => ({
  type: FETCH_PRODUCTLIST_END
})

export const fetchProductStart = () => ({
  type: FETCH_PRODUCT_ITEM_START,
})

export const fetchProductSuccess = (response) => ({
  type: FETCH_PRODUCT_ITEM_SUCCESS,
  payload: response
})
export const fetchProductFailure = () => ({
  type: FETCH_PRODUCT_ITEM_FAILURE,
})
export const fetchProductEnd = () => ({
  type: FETCH_PRODUCT_ITEM_END,
})

export const updateProductData = (productData) => ({
  type: UPDATE_PRODUCT_ITEM,
  payload: productData
})

export const addProduct = (newProductData) => ({
  type: ADD_PRODUCT_ITEM,
  payload: newProductData
})

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT_ITEM,
  payload: id
})

export const fetchCategoryListStart = () => ({
  type: FETCH_CATEGORY_LIST_START,
})
export const fetchCategoryListEnd = () => ({
  type: FETCH_CATEGORY_LIST_END,
})
export const fetchCategoryListSuccess = (response) => ({
  type: FETCH_CATEGORY_LIST_SUCCESS,
  payload:response
})
export const fetchCategoryListFailure = (err) => ({
  type: FETCH_CATEGORY_LIST_FAILURE,
  payload:err
})

export const fetchProductList = () => {
  return async (dispatch) => {
    dispatch(fetchProductListStart());
    try {
      const response = await apiFetchData();
      dispatch(fetchProductListSuccess(response));
    } catch (err) {
      console.log(err)
      dispatch(fetchProductListFailure(err.message));
    }
    dispatch(fetchProductListEnd());
  };
};

export const fetchProductData = (id) => {
  return async (dispatch) => {
    dispatch(fetchProductStart());
    try {
      const response = await apiFetchData(id);
      dispatch(fetchProductSuccess(response));
    }
    catch (err) {
      console.log(err);
      dispatch(fetchProductFailure(err));
    }
    dispatch(fetchProductEnd());
  }
}

export const fetchCategoryList = () => {
  return async (dispatch) => {
    dispatch(fetchCategoryListStart());
    try {
      const response = await apiFetchCategory();
      dispatch(fetchCategoryListSuccess(response));
    }
    catch (err) {
      console.log(err);
      dispatch(fetchCategoryListFailure(err));
    }
    dispatch(fetchCategoryListEnd());
  }
}
