import { createStore,applyMiddleware, compose } from "redux";
import { RootReducer } from "./reducers/RootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(RootReducer, composedEnhancers);
export default store;