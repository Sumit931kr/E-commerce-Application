import { ActionTypes } from '../contants/action-types'

const initalState = {
  products: [],
}
const initalCount = 0

export const cartReducer = (state = initalCount, { type, payload }) => {
  // let number = state + payload
  // console.log(number.length)
  switch (type) {
    case ActionTypes.CART:
      return payload

    default:
      return state
  }
}

export const productReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };

    default:
      return state
  }

}

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
