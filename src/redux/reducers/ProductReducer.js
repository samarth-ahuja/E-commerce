import { FETCH_PRODUCTLIST_START, FETCH_PRODUCTLIST_SUCCESS, FETCH_PRODUCTLIST_FAILURE, FETCH_PRODUCTLIST_END, FETCH_PRODUCT_ITEM_START, FETCH_PRODUCT_ITEM_SUCCESS, FETCH_PRODUCT_ITEM_FAILURE, FETCH_PRODUCT_ITEM_END, ADD_PRODUCT_ITEM, UPDATE_PRODUCT_ITEM, DELETE_PRODUCT_ITEM, FETCH_CATEGORY_LIST_START, FETCH_CATEGORY_LIST_END, FETCH_CATEGORY_LIST_SUCCESS, FETCH_CATEGORY_LIST_FAILURE } from '../constants/ProductConstants';

const initialState = {
    loadingCategoryList:false,
    categoryList:null,
    errorCategoryList:false,
    productList:null,
    loadingProductList:false,
    errorProductList:null,
    edittingProductItem:null,
    loadingEdittingProductItem:false,
    errorEdittingProductItem:null
}


export const ProductReducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_PRODUCTLIST_START:
            return {
                ...state,
                loadingProductList:true
            }
        case FETCH_PRODUCTLIST_SUCCESS:
            return {
                ...state,
                productList:action.payload
            }
        case FETCH_PRODUCTLIST_FAILURE:
            return {
                ...state,
                errorProductList:action.payload
            }
        case FETCH_PRODUCTLIST_END:
            return {
                ...state,
                loadingProductList:false
            }

        case FETCH_PRODUCT_ITEM_START:
            return {
                ...state,
                loadingEdittingProductItem:true
            }
        case FETCH_PRODUCT_ITEM_SUCCESS:
            return {
                ...state,
                edittingProductItem:action.payload
            }
        case FETCH_PRODUCT_ITEM_FAILURE:
            return {
                ...state,
                errorEdittingProductItem:action.payload
            }
        case FETCH_PRODUCT_ITEM_END:
            return {
                ...state,
                loadingEdittingProductItem:false
            }
        

        case ADD_PRODUCT_ITEM:
            return {
                ...state,
                productList:[...state.productList,action.payload]
            }
        case UPDATE_PRODUCT_ITEM:
            return {
                ...state,
                edittingProductItem:action.payload,
                productList:state.productList.map((item)=>{
                    if(item.id==action.payload.id){
                        return action.payload;
                    }
                    else{
                        return item;
                    }
                })
            }
        case DELETE_PRODUCT_ITEM:
            return{
                ...state,
                productList:state.productList.filter((item)=>item.id!=action.payload)
            }
        case FETCH_CATEGORY_LIST_START:
            return {
                ...state,
                loadingCategoryList:true
            }
        case FETCH_CATEGORY_LIST_END:
            return {
                ...state,
                loadingCategoryList:false
            }
        case FETCH_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                categoryList:action.payload
            }
        case FETCH_CATEGORY_LIST_FAILURE:
            return {
                ...state,
                errorCategoryList:action.payload
            }
        default:
            return state;
    }
}