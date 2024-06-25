import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CovHeader, MyForm } from '../profile/FormComponents'

import { adminLogin, login, setAdminTokenToLocal } from '../../api/authService'

export const AdminLogin = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [checkbox, setCheckbox] = useState(false);
  const [type, setType] = useState("password");
  const [error, setError] = useState("")
  const [toggle, setToggle] = useState(false);
  const [adminToken, setAdminToken] = useState("");
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
    const authDetail = {
        email: email,
        password:  password,
      }
      console.log(authDetail);
      console.log(toggle);

    try {
      const data = await adminLogin(authDetail);
      console.log(data);
      data.request.status ===200 ? navigate('/admin') : console.log(data);
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

  const handleTokenAuth = async(e) =>{
    e.preventDefault();
    try {
      const res = await setAdminTokenToLocal(adminToken)
      res.status=200 && navigate('/admin')
      console.log(adminToken)
      console.log(res)
     } catch (error) {
       setError(error.response.data.detail)
       console.log(error);
     }
  }

  const loginForm = [
    {
    type: "email",
    id: "email",
    label: "Enter Admin Email",
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
  const LoginHeading = "Enter Admin Email and Password!"
  const TokenHeading = "Enter your Admin Token"
 const  AdminForm = [
    {
      type: type,
      id: "token",
      label: "Enter Admin Token",
      onChange: (e) => setAdminToken(e.target.value),
      value:adminToken,
      setCheckbox: () => setCheckbox(!checkbox),
      checkbox: checkbox
    }

  ]

  return (
    <div>
      

      {!toggle && <MyForm heading={LoginHeading} error={error} handleSubmit={handleSubmit} formReg={loginForm} button={button} />}
      {toggle && <MyForm heading={TokenHeading} error={error} handleSubmit={handleTokenAuth} formReg={AdminForm} button={button} />}
      <div className='flex justify-center space-x-10'>
       <button className='bg-neutral-300 p-3 mb-5 shadow- shadow-md rounded-ss-box rounded-ee-box text-neutral-900' onClick={()=>setToggle(!toggle)}>{ toggle ?  "Sign In with Login Detail" : "Sign in with Admin Token" }</button>
      </div>
    </div>
  )
}
