import {useEffect, useState } from'react';
import axios from 'axios';

export const useFetch =() =>{

const [data, setData] = useState([]);

const movieApi = axios.create({
  baseURL:"https://api.themoviedb.org/3/movie",
  timeout: 1000,
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjI3MjAyYzYyYWQ3YzY0ZmYwMmRkNjJmZWQ0MmMzYyIsInN1YiI6IjY2M2UyZjVmN2NmMmU4Yzg4MmU4ZDMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jjc_LMS6PmwZ49DmVu1iim7ps_YmvZdJk2-E1nzrSfU'
    }
})

useEffect(() => {
const fetMovie = async() => {
  try {
      const data = await movieApi.get('/popular')
      setData(data.data);
  } catch (error) {
     setData(error); 
  }
}
fetMovie()
}, [movieApi])

  return data;
  
}

const url = `https://api.themoviedb.org/3/movie/popular?`;

export const data = axios.get(url,
  {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjI3MjAyYzYyYWQ3YzY0ZmYwMmRkNjJmZWQ0MmMzYyIsInN1YiI6IjY2M2UyZjVmN2NmMmU4Yzg4MmU4ZDMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jjc_LMS6PmwZ49DmVu1iim7ps_YmvZdJk2-E1nzrSfU'
    }
  }
 )