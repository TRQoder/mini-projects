import React from 'react'
import SignUpForm from '../assets/components/SignUpForm'
const Signup = ({setIsLoggedIn}) => {
  return (
    <div>
        <SignUpForm setIsLoggedIn = {setIsLoggedIn} />
    </div>
  )
}

export default Signup