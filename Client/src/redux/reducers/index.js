import { combineReducers } from "redux";
import { productReducer, selectedProductsReducer , cartReducer } from "./productReducer";

const reducers = combineReducers({
    allProducts : productReducer,
    product: selectedProductsReducer,
    cart : cartReducer,
})

export default reducers;


