import React from "react";
import { Link } from "react-router-dom";

export const CovHeader = () => {
  return (
    <div className="flex h-20 bg-gradient-to-b text-white items-center from-black  to-transparent top-0 w-full justify-between">
      <Link
        to="/"
        className="mx-4 text-neutral-300 md:text-3xl mdMobile:text-xl text-base font-novaSquare top"
      >
        MaxiWatch
      </Link>
      <div className="flex text-sm justify-center items-center">
        <Link className="text-nowrap hover:text-base other:text-xs" to="/login">
          Sign In
        </Link>
        <Link
          className="m-4 text-nowrap active:text-xs bg-gradient-to-t from-amber-800 via-amber-950 to-amber-700  active:shadow-none shadow-sm shadow-zinc-700 other:text-xxs other:px-6 bg-amber-900 hover:bg-amber-800 px-8 text-sm py-1 rounded-ss-box rounded-ee-box"
          to="/register"
        >
          GET STARTED
        </Link>
      </div>
    </div>
  );
};

export const InputDev = ({
  type,
  id,
  label,
  value,
  onChange,
  ref,
  setCheckbox,
  checkbox
}) => {
  return (
    <div className="relative z-0 md:mx-10 mx-2 my-2 md:my-5 group">
      <input
        type={type}
        name={id}
        id={id}
        ref={ref}
        onChange={onChange}
        value={value}
        className="block py-2.5  other:text-sm px-2 w-full focus:rounded-md text-base text-black bg-transparent appearance-none border-b-2 border-gray-500 focus:border-slate-700 focus:outline-none  peer"
        placeholder=""
        required
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium mx-5 absolute text-xs text-gray-500 dark:text-gray-400 duration-300 peer-focus:bg-neutral-200 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-neutral-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      {(type === "password" || id === "password" || id === "rePassword" || id === "token" ) &&
        <div className="mt-2 text-xs flex items-center   text-gray-500">
          <label className="mx-3 ">Show Password</label>
          <input
            className="w-3 h-3  bg-cyan-400 border -ml-1 "
            type="checkbox"
            id={`${id} checkbox`}
            onChange={setCheckbox}
            checked={checkbox}
          />
        </div>}
    </div>
  );
};

export const MyForm = ({ error, formReg, heading, button, handleSubmit }) => {
  return (
    <div>
      <h2 className=" md:text-2xl text-white other:text-2xl p-5 font-novaRound bg-amber-950 ">
        {heading || "Check"}
      </h2>
      
      <div className="flex flex-col my-4 items-center">
        <form
          onSubmit={handleSubmit}
          className=" bg-neutral-200 rounded-ss-box rounded-ee-box other:w-[93%]  md:w-3/5 py-4 flex flex-col "
        >
          <span className="text-center text-red-500">{error} </span>

          {formReg &&
            formReg.map(
              ({
                type,
                id,
                label,
                value,
                onChange,
                ref,
                setCheckbox,
                checkbox
              }) =>
                <InputDev
                  key={id}
                  type={type}
                  id={id}
                  label={label}
                  value={value}
                  onChange={onChange}
                  setCheckbox={setCheckbox}
                  checkbox={checkbox}
                  ref={ref}
                />
            )}

          <button
            className=" bg-amber-900 text-neutral-100 px-3 other:text-xs my-5 md:mx-10 py-2.5 mx-2 text-base rounded-ss-box rounded-ee-box"
            type="submit"
          >
            {button || "Check"}
          </button>
        </form>
      </div>
    </div>
  );
};
