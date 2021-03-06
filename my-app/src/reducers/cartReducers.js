import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_EMPTY, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(el => el.product === item.product)
            if (existItem) {
                console.log(state.cartItems)
                return {
                    ...state,
                    cartItems: state.cartItems.map(el => el.product === existItem.product ? item : el)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: state.cartItems.concat(item)
                }
            }
        case CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(el => el.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }
        default:
            return { ...state }
    }
}