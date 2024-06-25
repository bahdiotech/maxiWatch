import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import { api } from "../../api/authService";

export const MovieListAdmin = () => {
  const [movie, setMovie] = useState();
  const [pageNum, setPageNum] = useState();
  console.log(pageNum);

  const pageList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await api.get("movie/movies/");
        setMovie(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  console.log(movie);

  const testGrid = [
    "jark",
    "Joshua",
    "badge",
    "Abraham",
    "Charles",
    "Sarah",
    "Samuel",
    "Joshua",
    "badge",
    "Abraham",
    "Charles",
    "Sarah",
    "Samuel",
    "Joshua",
    "badge",
    "Abraham",
    "Charles",
    "Sarah",
    "Samuel",
    "Joshua",
    "badge",
    "Abraham",
    "Charles",
    "Sarah",
    "Samuel",
    "Joshua",
    "badge",
  ];

  return (
    <div className="flex shadow-xl items-center w-full flex-col justify-center ">
      <div className="flex w-full bg-neutral-900 items-center justify-between">
        <h2 className=" md:text-5xl other:text-2xl flex w-full p-5 font-novaRound  ">
          Movie Lists
        </h2>
        <div className="mr-3">
          <span className="flex border-b-2 border-neutral-50 items-center ">
            <BsSearch className="" />
            <input
              type=""
              className="bg-transparent focus:outline-none"
              id=""
              name=""
              placeholder=""
            />
          </span>
        </div>
      </div>
      <div>
        <div className="grid tab:grid-cols-3  w-full lg:grid-cols-6 md:grid-cols-4 gap-4">
          {testGrid.map(grid =>
            <div className="border-2 h-56 w-56 flex flex-col scale-75 border-neutral-100 bg-neutral-600">
              <h1>
                {grid}
              </h1>
              
            </div>
          )}
        </div>
      </div>
      <div  className='ggrid tab:grid-cols-3  w-full lg:grid-cols-6 md:grid-cols-4 gap-4'>
      { (movie && movie.results.length > 0) && movie.results.map((mov)=>
    
        <div key={mov.id} style={{backgroundImage: `url(${mov.poster_path || ''})`}} className='flex flex-col bg-no-repeat items-center justify-end w-52 h-52 shadow-md '>
            <h3 className='p-2 text-neutral-100'>{mov.title}</h3>
            <div className="flex w-full bottom-0 absolute self-end">
                <span className="bg-green-400 text-center w-full text-neutral-100 p2">Edit</span>
                <span className="bg-red-400 w-full text-center text-neutral-100 p2">Delete</span>
              </div>
       
    </div>
    )}
     </div>

      <div className="flex w-full justify-around">
        <button>previous Page</button>
        <div className="space-x-1 text-xs">
          {pageList.map((page, index) =>
            <button
              onClick={() => setPageNum(index)}
              key={index}
              className="border-2 p-1 border-neutral-400 "
            >
              {page}
            </button>
          )}
        </div>
        <button>Next Page</button>
      </div>
    </div>
  );
};
