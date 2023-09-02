import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import AuthForm from './AuthForm'
import { useDispatch } from 'react-redux'
import { userActions } from '../../Store'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({})

  const onResReceived = (data) => {
    dispatch(userActions.login())
    localStorage.setItem("userId", data._id)
    navigate('/')
  }

  //here we are passing data from child to parent through function

  const getData = (data) => {
    setLoginData(data)
    sendUserAuthRequest(loginData.signup)
    .then(res => onResReceived(res))
    .catch( (err) => {
     console.log(err)
    }) 
  }

  const sendUserAuthRequest = async (signup) => {
    let res
    try{
    res = await axios.post(`http://localhost:8000/users/${signup ? "signup" : "login"}`, {
    name: signup ? loginData.input.text : "" ,
    email: loginData.input.email,
    password:loginData.input.password
  })
}
catch(err){
  console.log(err)
}
if(!res){
  console.log("No user Found")
}

return res.data.user
}
  return (
    <div>
      <AuthForm gettingInput={getData} isAdmin={false}></AuthForm>
    </div>
 )
}

export default Auth
