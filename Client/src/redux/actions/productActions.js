import { ActionTypes } from '../contants/action-types'


export const setProduct = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    };
};

export const selectedProduct = (product) => {
    return {
      type: ActionTypes.SELECTED_PRODUCT,
      payload: product,
    };
  };

  
  export const removeSelectedProduct = () => {
    return {
      type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    };
  };

  export const cart = (count) => {
    return {
      type : ActionTypes.CART,
      payload : count,
    };

  };
