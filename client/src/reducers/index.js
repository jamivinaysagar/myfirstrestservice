import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    cart: cart,
    products: products

});

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))
