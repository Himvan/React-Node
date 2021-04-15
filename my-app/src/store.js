
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { productReducer, productDetailsReducer } from './reducers/productReducer'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userProfileUpdateReducer } from './reducers/userReducer'
import { orderCreateReducers, orderDetailsReducer, orderListReducer, payOrderReducer } from './reducers/orderReducers'

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: 'PayPal' 
  },
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  }
}

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducer,
  orderPay: payOrderReducer,
  orderList: orderListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userProfileUpdateReducer
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store