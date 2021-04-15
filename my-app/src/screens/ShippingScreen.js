import React, { useRef, useEffect, useState} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import Form from '../components/Form'
import {useDispatch, useSelector} from 'react-redux'
import { ShippingFormData } from '../constants/ShippingFormData'
import { saveShippingAddress } from '../actions/cartActions'

export default function ShippingScreen(props) {
    const userSignin = useSelector(state => state.userSignin)
    const [shippingData, setShippingData] = useState(ShippingFormData)
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const {userInfo} = userSignin
    if(!userInfo){
        props.history.push('/signIn')
    }
    const formRef = useRef(null)
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const data = formRef.current()
        console.log(data)
        // const {fullName, address, city, postalCode, country} =  formRef.current
        dispatch(saveShippingAddress(data))
        props.history.push('/payment')
    }

    useEffect(() => {
        const data = shippingData.map(element => {
          element.initialValue = shippingAddress[element.id] ?? ""
          return element
       });
       setShippingData(data)
        
    }, [shippingAddress])
   

    return (
        <div>
            <CheckoutSteps step1 step2/>
            <Form 
              headerName={'Shipping Address'} 
              data={JSON.parse(JSON.stringify(shippingData))} 
              handleRef={(ref) => formRef.current = ref}
              submitButtonText = {'Continue'}
              onSubmitHandler={submitHandler}
              />
        </div>
    )
}
