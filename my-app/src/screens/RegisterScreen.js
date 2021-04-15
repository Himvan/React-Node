import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/signinActions'
import LoadingBox from '../components/LoadingBox'

export default function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {userInfo, loading} = userRegister
  

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('Password and Confirm password are not match')
        }
        else {
            dispatch(register(name, email, password))
        }
     }

     useEffect(() => {
         if(userInfo) { 
             props.history.push(redirect)
         }
     }, [userInfo,redirect])
    return (
        <div>
            {/* <LoadingBox loading={loading}/> */}
            <form className="form" onSubmit={submitHandler}>
             <div>
                 <h1>Create Account</h1>
             </div>
             <LoadingBox loading = {loading}/>
             <div>
                 <label htmlFor="name">Name</label>
                 <input type="text" id="name" placeholder="Enter Name" required onChange={e => setName(e.target.value)}></input> 
             </div>
             <div>
                 <label htmlFor="email">Email address</label>
                 <input type="email" id="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)}></input> 
             </div>
             <div>
                 <label htmlFor="password">Password</label>
                 <input type="password" id="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}></input> 
             </div>
             <div>
                 <label htmlFor="password">Password</label>
                 <input type="password" id="confirmpassword" placeholder="Enter Confirm Password" required onChange={e => setConfirmPassword(e.target.value)}></input> 
             </div>
             <div>
                 <label />
                 <button className="primary" type="small">
                     Register
                 </button>
             </div>
             <div>
                 <label />
                 <div>
                     Already have an account? {' '}
                     <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                 </div>
             </div>
            </form> 
        </div>
    )
}