import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CovHeader, MyForm } from "./FormComponents";

import { register } from "../../api/authService";

export const Resgister = () => {
  const heading = "Create Your Account."

  const button = "Create Account"
  const [checkbox, setCheckbox] = useState(false);
  const [type, setType] = useState("password");
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate()

  async function handleSubmit(e) { 
    e.preventDefault();
    try {
      const authDetail = {
        email: email,
        password:  password,
        first_name: firstName,
        last_name: lastName,
        is_premium: false
      }
      console.log(authDetail);
      const data = await register(authDetail);
      console.log(data);
      data.request.status ===201 ? navigate('/login') : console.log(data);
    } catch (error) {
      if (error.response){
        console.log(error.response.data);
      }
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (checkbox) {
      setType("text")
    } else {
      setType('password')
    }
  }, [checkbox])

  const formReg = [
  {
    type: "text",
    id: "firstName",
    label: "First Name".toUpperCase(),
    value: firstName,
     onChange: (e)=>setFirstName(e.target.value), 

  },
  {
    type: "text",
    id: "lastName",
    label: "Last Name".toUpperCase(),
    value: lastName,
    onChange: (e)=>setLastName(e.target.value), 

  },
  {
    type: "email",
    id: "email",
    label: "Email Address".toUpperCase(),
    value: email,
    onChange: (e)=>setEmail(e.target.value), 

  },
  {
    type: type,
    id: "password",
    label: "Enter Password".toUpperCase(),
    value: password,
    onChange: (e)=>setPassword(e.target.value),
    setCheckbox: () => setCheckbox(!checkbox),
    checkbox: checkbox
     
  },
  {
    type: type,
    id: "rePassword",
    label: "Re-enter Your Password".toUpperCase(),
    value: rePassword,
     onChange: (e)=>setRePassword(e.target.value), 
     setCheckbox: () => setCheckbox(!checkbox),
     checkbox: checkbox
  }
]

  return (
    <main>
      <CovHeader />
      <MyForm heading={heading} formReg={formReg} button={button} handleSubmit={handleSubmit} />
    </main>
  );
};
