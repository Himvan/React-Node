import _ from 'lodash'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

export default function OrderScreen(props) {
    const orderId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const {error: errorPay, success: successPay} = orderPay
    const dispatch = useDispatch()

    useEffect(() => {
        const addPayPalScript = async () => {
         const {data} = await axios.get('/api/config/paypal')
         const script = document.createElement('script')
         script.type='text/javascript'
         script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
         console.log(script)
         script.async = true
         
            setSdkReady(true)
        
         document.body.appendChild(script)
        }
        if(!order || successPay || (order && order._id !== orderId)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(detailsOrder(orderId))
            
        }
        else {
          if(!order?.isPaid){
              if(!window.paypal){
                  addPayPalScript()
              }
              else {
                setSdkReady(true)
              }
          }
        }
        
     }, [dispatch, orderId, order,order?._id, order?.isPaid, setSdkReady, successPay])

     const summary = [
        {
            label: "Items",
            value: order?.itemsPrice
        },
        {
            label: "Shipping Price",
            value: order?.shippingPrice
        },
        {
            label: "Tax Price",
            value: order?.taxPrice
        },
        {
            label: "Total Price",
            value: order?.totalPrice
        }
    ]
  const successPaymentHandler = (paymentResult) => {
      console.log(paymentResult)
     dispatch(payOrder(order, paymentResult))
  }
    return loading  ? <LoadingBox loading = {true} /> : (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Order {order ? order._id : ''}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Order</h2>
                                <p>
                                    <strong>Name: </strong>{order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                                </p>
                                {
                                    order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox> :
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong>{order.paymentMethod} <br />
                                </p> 
                                {
                                    order.isPaid ? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox> :
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        order.orderItems.map((items) => (
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
                                            <strong style={index === summary.length - 1 ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>{items.label}</strong>
                                        </div>
                                        <div>
                                            <strong style={index === summary.length - 1 ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>${items.value}</strong>
                                        </div>
                                    </div>
                                ))
                                }
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady ? (<LoadingBox loading={true}/>):
                                         (
                                             <>
                                             {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox> }
                                             <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                             </>
                                         )
                                         }
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
