import React, { useState } from "react";
import { BiCategory, BiMoviePlay } from "react-icons/bi";
import { IoIosArrowUp,IoIosArrowDown  } from "react-icons/io";
import {
  IoClose,
  IoHome,
  IoMenu,
  IoNotifications,
  IoPersonOutline,
  IoSearchOutline
} from "react-icons/io5";
import { MdFavoriteBorder} from "react-icons/md";
import { PiSignIn, PiTelevisionSimpleBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";

import { logout } from "../api/authService";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const activeClass = "other:pl-4 flex items-center md:border-b-4 md:border-black dark:md:border-white";

  const inActiveClass = "flex other:pl-2 items-center";

  const handleLogout = () => {
    alert('You have logged out')
      logout();
      
  };

  return (
    <header className="  flex w-full z-30 items-center justify-center fixed top-0  bg-transparent ">
      <div className="flex justify-around w-5/6 tab:w-[95%] other:justify-between dark:text-white other:px-4 text-xl text-neutral-900 fixed h-14 top-0 md:top-8 other:w-full other:rounded-none rounded-full bg-gray-300 dark:bg-neutral-900 items-center ">
        <span onClick={() => setMenu(!menu)} className="md:hidden">
          {" "}
          {menu ? <IoClose /> : <IoMenu />}
        </span>

        <Link className="font-novaSquare text-sky-400 " to="/">
          Bardiotech
        </Link>
        <ul
            onMouseUp={()=>setMenu(!menu)}
            
          className={`${
            !menu && "other:hidden"
          }  md:flex items-center tab:text-sm other-screens  md:space-x-7`}
        >
          <li>
            <NavLink
              // className="border-b-4 pb-3"
              className={({ isActive }) =>
                isActive ? activeClass : inActiveClass
              }
              to="/"
              onMouseUp={()=>setMenu(!menu)}
            >
              {" "}
              <IoHome className="mr-3 md:hidden" /> Home
            </NavLink>
          </li>
          
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : inActiveClass
              }
              to="/movies"
            >
                
              <BiMoviePlay className="mr-3 md:hidden" />
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : inActiveClass
              }
              to="/tvshows"
              onMouseEnter={() => setOpen(false)}
            >
              <PiTelevisionSimpleBold className="mr-3 md:hidden" />
              TV shows
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : inActiveClass
              }
              to="/categories"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(true)}
              onClick={() =>setOpen(!open)}
                
            >
              <BiCategory className="mr-3 md:hidden" />
              Categories {open? <IoIosArrowUp/> : <IoIosArrowDown/>}
            </NavLink>
            {open && (
              <div className="absolute w-full flex iitems-center  righ-0 left-0 justify-evenly items-center top-full ">
                <div className="flex w-10/12 bg-black justify-evenly flex-col -top-32 items-center">
                  <span className="text-center">Genre</span>
                <menu  onMouseLeave={() => setOpen(false)}
               className=" w-full  other:hidden inset-x-20 top-14 text-center other:ml-0 dark:bg-zinc-800 ">
                <li className="">
                  <button>Menu 1</button>
                </li>
                <li className="">
                  <button>Menu 2</button>
                </li>
              </menu>
                </div>
                
              </div>
              
            )}
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : inActiveClass
              }
              to="/favorites"
              onMouseEnter={() => setOpen(false)}
            >
              <MdFavoriteBorder className="mr-3 md:hidden" />
              Favorites
            </NavLink>
          </li>
        </ul>
        <div className="flex space-x-5">
          
            <IoSearchOutline  className="text-2xl"/>{" "}
          
          <Link className="text-2xl" to="/profile">
            <IoPersonOutline className="text-amber-600"
            onClick={()=>setProfile(!profile)}
            onMouseEnter={()=>setProfile(true)}
            onMouseLeave={()=>setProfile(false)}
             />
            {profile && (
            <ul 
            onMouseLeave={()=>setProfile(false)}
            onMouseEnter={()=>setProfile(true)}
            
            className="absolute other:w-full text-xl  top-10 dark:bg-neutral-900 flex justify-center items-center  rounded-b-lg flex-col space-y-1 md:mr-3 w-[15rem] h-[8rem] right-0">
              <li>
                <Link className="flex w-24 items-center   other:text-lg"  to="/profile"> <IoPersonOutline className="text-amber-600 mr-2" /> Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex w-24 items-center other:text-lg  " to="/login"><PiSignIn className="text-amber-600 mr-2"/>Log out</button>
              </li>
            </ul>
          )}
          </Link>
          <Link className="flex text-2xl">
            <IoNotifications/>
            <span className="bg-red-600 -left-3 -top-1 relative rounded-xl text-sm w-4 text-center h-4  flex items-center justify-center text-white">3</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
