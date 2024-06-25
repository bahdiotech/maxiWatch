import React from 'react'

import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/react-splide/css";
import { Intersection } from "@splidejs/splide-extension-intersection";

import { useFetch } from '../hooks';

export const Home = () => {

const data = useFetch()

const results = data.results
const apipath = `https://image.tmdb.org/t/p/w500`

// const image = Array.isArray(results) && results.map((movie)=> apipath+movie.poster_path)
// // console.log(image);

// console.log(results);

  return (
    <main className='bg-neutral-950'>
<Splide hasTrack={false} extensions={{ Intersection }} tag="div" options={{ perPage: 1, type: 'loop', gap: '10px', rewind: true, drag: 'free', arrows: true, autoWidth: true, autoHeight: true, snap: true,  autoScroll: { speed: 1, pauseOnHover:true },autoplay:'start', intersection: { inView:{autoplay:true}} }}>
  <SplideTrack > {!Array.isArray(results) || results.map((movie) => (<SplideSlide className="rounded-lg" key={movie.id}>
      <img className=" h-[40rem] bg-contain object-cover object-center rounded-sm  other:h-[16rem] w-screen "  src={apipath+movie.backdrop_path

} alt={movie.title} />
     </SplideSlide>))}
     
  </SplideTrack>
</Splide>
{/* <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div> */}
    </main>
  )
}
