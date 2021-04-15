import React, { useState, useRef } from 'react'
import { savePaymentMethod } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Form from '../components/Form'

const paymentFormData = [
    {
        id: 'paymentMethod',
        type: "radio",
        data: [
            {
                id: 'payPal',
                require: true,
                headerName: 'PayPal',
            },
            {
                id: 'stripe',
                require: true,
                headerName: 'Stripe',
            }
        ]
    }
]

export default function PaymentScreen(props) {
    const [paymentData, setPaymentData] = useState(paymentFormData)
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress.address) {
        props.history.push('/shipping')
    }
    const formRef = useRef(null)
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const data = formRef.current()
        console.log(data)
        dispatch(savePaymentMethod(data.paymentMethod))
        props.history.push('placeOrder')
    }


    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <Form
                headerName={'Payment Method'}
                data={paymentData}
                handleRef={(ref) => formRef.current = ref}
                submitButtonText={'Continue'}
                onSubmitHandler={submitHandler}
            />
        </div>
    )
}
