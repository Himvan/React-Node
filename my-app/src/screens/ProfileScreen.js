import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/signinActions'
import Form from '../components/Form'
import LoadingBox from '../components/LoadingBox'
import { UserFormData } from '../constants/UserFormData'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from "../constants/userConstants"

export default function ProfileScreen() {
    const [userForm, setUserForm] = useState(UserFormData)
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const updateProfile = useSelector(state => state.userUpdate)
    const {success, error: errorUpdate , loading: loadingUpdate} = updateProfile
    const dispatch = useDispatch()
    const formRef = useRef(null)

    useEffect(() => {
        if(!user){
        dispatch({type: USER_UPDATE_RESET})
        dispatch(detailsUser(userInfo._id))
        }
        if(!loading){
        userForm[0].initialValue = user.name
        userForm[1].initialValue = user.email
        setUserForm(userForm)
        }

    }, [dispatch, userInfo._id, setUserForm, loading, user, userForm])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = formRef.current()
        const {password, confirmPassword} = data
        if(password !== confirmPassword){
            alert('Password and Confirm Password Are Not Matched')
        }
        else {
            const {name, email, password} = data
            dispatch(updateUserProfile({userId: user._id, name, email, password }))
        }
        console.log(data)
    }
   console.log(userForm)
    return (
        <div>
           {loading ? <LoadingBox loading={true} /> : (
            <>
            {success && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
            <Form
                headerName={'User Profile'}
                data={JSON.parse(JSON.stringify(userForm))}
                handleRef={(ref) => formRef.current = ref}
                submitButtonText={'Update'}
                onSubmitHandler={submitHandler}
            />
            </>
           )}
        </div>
    )
}
