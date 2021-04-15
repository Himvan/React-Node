import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/signinActions'
import LoadingBox from '../components/LoadingBox'

export default function SigninScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const userSignIn = useSelector(state => state.userSignin)
    const {userInfo, loading} = userSignIn
  

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
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
                 <h1>Sign In</h1>
             </div>
             <LoadingBox loading = {loading}/>
             <div>
                 <label htmlFor="email">Email address</label>
                 <input type="email" id="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)}></input> 
             </div>
             <div>
                 <label htmlFor="password">Password</label>
                 <input type="password" id="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}></input> 
             </div>
             <div>
                 <label />
                 <button className="primary" type="small">
                     Sign In
                 </button>
             </div>
             <div>
                 <label />
                 <div>
                     New Customer? {' '}
                     <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                 </div>
             </div>
            </form> 
        </div>
    )
}