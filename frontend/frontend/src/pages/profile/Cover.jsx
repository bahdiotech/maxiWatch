import React from "react";
import { Link } from "react-router-dom";

import { CovHeader } from "./FormComponents";
import { graphicmov, greatCover} from "../../assets";
import background from "../../assets/images/background.jpeg";

export const Cover = () => {
  return (
    <main className="">
      <header className="flex  min-h-[80rem] flex-col">
        <div
          className="w-full flex-auto flex flex-col relative min-h-[30rem] overflow-scroll"
          style={{ backgroundImage: `url(${background})` }}
         
        > <CovHeader/>
          <div className="text-center items-center overflow-scroll justify-center flex flex-col space-y-6">
            <span className="font-extrabold relative other:top-[1rem] text-4xl sMobile:text-2xl md:top[10rem] md:text-5xl text-white">
              Unlimited Movies and more
            </span>
            <span className="md:text-3xl text-white text-xl sMobile:text-base ">
              Watch anywhere. Cancel anytime.
            </span>
            <span className="md:text-xl text-white sMobile:text-base text-base ">
              Ready to watch? Enter your email to create or start
              membership
            </span>

            <Link
              to="/register"
              className="bg-amber-800 hover:bg-amber-700 md:text-l other:text-base other:mt-3 other:w-[8rem] text-nowrap sMobile:text-sm  px-8  text-white rounded-ss-box rounded-ee-box other:h-10 h-12 justify-center flex items-center ml-2"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="border-y-8 relative flex md:flex-row flex-col items-center justify-center  bg-neutral-200 border-zinc-950 h-2/6" >
          {greatCover.map((avater) => (
            <div key={avater.id} className="flex p-10 flex-col text-black items-center justify-center">
              <img className=" w-[15rem] object-cover rounded-full h-[15rem] " src={avater.src} alt={avater.name} />
              <h2 className="m-1 font-extrabold text-center max-w-60 text-lg">{avater.title}</h2>
              <span className="text-center">{avater.desc}</span>
            </div>
          ))}
            
        </div>
        <div className=" w-full bg-contain bg-scroll flex other:flex-col bg-right-top min-h-[40rem] bg-no-repeat" style={{backgroundImage:`url(${graphicmov})`}}>
          <div className="bg-gradient-to-r  from-black via-black  w-2/3 min-h-[40rem] ">
            <div className="md:m-32 other:m-10 text-white max-w-[35rem] other:min-w-full ">
            <h1 className="text-3xl font-semibold">Start your your Membership with us now</h1>
            <p className="my-5 text-xl">Watch all your favourite movie from anywhere You can as well safe our website from your browser to your homepage</p>
            <Link to="/register" className="bg-amber-800 hover:bg-amber-700 text-white rounded-ss-box rounded-ee-box max-w-72 other:h-14 h-14 justify-center flex items-center mr-6">
              Get Started
            </Link>
            </div>
          </div>
          
        </div>
       
      </header>
    </main>
  );
};
