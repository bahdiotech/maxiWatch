import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { MovieAdd } from './MovieAdd'
import { MovieListAdmin } from './MovieListAdmin'

import { logout } from '../../api/authService'

export const AdminPage = () => {
  const [toggle, setToggle] = useState(true)

  return (
    <div>
      <div className='flex bg-neutral-900 text-neutral-300 h-12 items-center justify-around'>
      <Link
        to="/"
        className="mx-4 text-amber-700 md:text-3xl mdMobile:text-xl text-base font-novaSquare top"
      >
        MaxiWatch
      </Link>
      <div className='space-x-5'>
      <button onClick={()=>setToggle(false)}>
        Add Movie
      </button>
      <button onClick={()=>setToggle(true)}>
        Movie Lists
      </button>
      </div>
      <button onClick={logout} className="flex text-nowrap items-center mr-4 "><BiLogOut className="text-xl text-red-400 mr-2"/> Logout</button>
      </div>
      {toggle ? <MovieListAdmin /> : <MovieAdd/>}
    </div>
  )
}
