import React from 'react'
import LoginForm from '../assets/components/LoginForm'
const Login = ({setIsLoggedIn}) => {
  return (
    <div>
         <LoginForm setIsLoggedIn = {setIsLoggedIn}/>
    </div>
  )
}

export default Login