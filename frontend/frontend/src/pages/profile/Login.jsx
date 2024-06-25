import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CovHeader, MyForm } from './FormComponents'

import { login } from '../../api/authService'

export const Login = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [checkbox, setCheckbox] = useState(false);
  const [type, setType] = useState("password");
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (checkbox) {
      setType("text")
    } else {
      setType('password')
    }
  }, [checkbox])

  async function handleSubmit(e) { 
    e.preventDefault();
    try {
      const authDetail = {
        email: email,
        password:  password,
      }
      console.log(authDetail);
      const data = await login(authDetail);
      console.log(data);
      data.request.status ===200 ? navigate('/') : console.log(data);
      window.location.reload();

    } catch (error) {
      if (error.response){
        
        console.log(error.response.data.non_field_errors
        );
      }
      setError(error.message + " !")
      console.log(error.message);
    }
  }

  const loginForm = [
    {
    type: "email",
    id: "email",
    label: "Enter your email",
    onChange: (e) => setEmail(e.target.value),
    value:email
  },
  {
    type: type,
    id: "password",
    label: "Enter your Password",
    onChange: (e) => setPassword(e.target.value),
    value:password,
    setCheckbox: () => setCheckbox(!checkbox),
    checkbox: checkbox
  }
  ]
  const button = "Sign In"
  const heading = "Enter your Email and Password"
  

  return (
    <div>
      <CovHeader/>
      <MyForm heading={heading} error={error} handleSubmit={handleSubmit} formReg={loginForm} button={button} />
      
    </div>
  )
}
