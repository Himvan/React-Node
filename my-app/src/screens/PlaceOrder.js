import _ from 'lodash'
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

export default function PlaceOrder(props) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart
    const dispatch = useDispatch()

    if (!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const {loading, success, order, error} = orderCreate

    const toPrice = (num) => Number(num.toFixed(2))
    cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.15) * cart.itemsPrice
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const summary = [
        {
            label: "Items",
            value: cart.itemsPrice
        },
        {
            label: "Shipping Price",
            value: cart.shippingPrice
        },
        {
            label: "Tax Price",
            value: cart.taxPrice
        },
        {
            label: "Total Price",
            value: cart.totalPrice
        }
    ]
    const placeOrderHandler = () => {
       dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }

    useEffect(() => {
        if(success) {
          props.history.push(`/order/${order._id}`)
          dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <LoadingBox loading = {loading} />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{shippingAddress.fullName} <br />
                                    <strong>Address: </strong>{shippingAddress.address},{shippingAddress.city},{shippingAddress.postalCode},{shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cartItems.map((items) => (
                                            <li key={items.product}>
                                                <div className="row">
                                                    <div>
                                                        <img src={items.image} alt={items.name} className="small" />
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${items.product}`}>{items.name}</Link>
                                                    </div>
                                                    <div>
                                                        {items.qty} x ${items.price} = ${items.qty * items.price}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                {_.map(summary, (items, index) => (
                                    <div className="row">
                                        <div>
                                            <strong style={index == summary.length - 1 ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>{items.label}</strong>
                                        </div>
                                        <div>
                                            <strong style={index == summary.length - 1 ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>${items.value}</strong>
                                        </div>
                                    </div>
                                ))
                                }
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cartItems.length == 0}>
                                    Place Order
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
