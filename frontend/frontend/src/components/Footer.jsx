import React from 'react'
import { BsTwitterX } from "react-icons/bs";
import { FaCentercode } from "react-icons/fa";
import { PiGithubLogoFill, PiInstagramLogoFill, PiLinkedinLogoFill} from 'react-icons/pi'

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10  bg-neutral-800 text-neutral-400">
  <aside className='text-center align-middle'>
    <FaCentercode className="inline-block text-6xl fill-curent" />
    <span className="font-bold ">
      <h1 className='font-novaFlat text-2xl '>Bardiotech.</h1> Providing reliable tech since 2021
    </span> 
    <p> Copyright © 2024 - All right reserved</p>
  </aside> 
  <nav >
    <div className="grid grid-flow-col gap-4">
      <a href="/"> <BsTwitterX className="text-3xl" /> </a>
      <a href="/"> <PiInstagramLogoFill className="text-3xl" /> </a>
      <a href="/"> <PiLinkedinLogoFill className="text-3xl" /> </a>
      <a href="/"><PiGithubLogoFill className="text-3xl" /> </a>
    </div>
  </nav>
</footer>
  )
}
