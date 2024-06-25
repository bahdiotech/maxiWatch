import React from "react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

import { api,  } from "../../api/authService";

export const MovieAdd = () => {
  const [title, setTitle] = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");
  const [poster_path, setPoster_path] = useState(null);
  const [backdrop_path, setBackdrop_path] = useState(null);
  const [language, setLanguage] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(false);
  const [genresList, setGenresList] = useState([{name: ''}]);
  const [production_countriesList, setProduction_countriesList] = useState([{name: ''}]);
  const [production_companiesList, setProduction_companiesList] = useState([{name: ''}]);
  const [categoriesList, setCategoriesList] = useState([{name: ''}]);
  const [tagsList, setTagsList] = useState([{name: ''}]);
  const [moviePath, setMoviePath] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [res, setRes] = useState({});

  const convertFileToBase64 = async(file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const handleFileChange = async(e, setBase64) => {
  const file = e.target.files[0];
  if (file) {
    const base64String = await convertFileToBase64(file);
    setBase64(base64String);
}
}
 const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      collection: collection,
      description: description,
      poster_path: poster_path,
      backdrop_path: backdrop_path,
      language: language,
      released_date: release_date,
      featured: featured,
      active: active,
      genres: genresList,
      production_countries: production_countriesList,
      production_companies: production_companiesList,
      categories: categoriesList,
      tags: tagsList,
      subtitle: subtitle,
    }
  console.log(data);

  const videoFile = {
    movie_path: moviePath,
  }
  console.log(videoFile)
  let response;
    try {
      response = await api.post('movie/movies/', data)
      setRes(response.data);
      console.log(response.data);
      console.log(res)
      
    } catch (error) {
      console.error(error.response);
    }
  console.log(response)

  if (videoFile.movie_path){
      try {
          const uploadRes = await api.post(`movie/movies/${response.data.id}/upload-video/`, videoFile, {
            headers: {
              'Content-Type':'multipart/form-data',
            }
          })
          console.log('Video uploaded:', uploadRes);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

const formCreate = [
        {
        id: "genres",
        placeholder: "Genres",
        list: genresList,
        setList: setGenresList,
        },   
        {    
        id: "production_countries",
        placeholder: "Production countries",
        list: production_countriesList,
        setList: setProduction_countriesList,
        },   
        {    
        id: "production_companies",
        placeholder: "Production companies",
        list: production_companiesList,
        setList: setProduction_companiesList,
        },    
        {
        id: "categories", 
        placeholder: "Categories",
        setList: setCategoriesList,
        list: categoriesList,
        },
        {
        id: "tags", 
        placeholder: "Tags",
        list: tagsList,
        setList: setTagsList,
        }
    ]

  return (
    <div className="flex shadow-xl items-center w-full flex-col justify-center ">
      <div className="flex w-full bg-neutral-900 justify-between">
      <h2 className=" md:text-5xl other:text-2xl flex w-full p-5 font-novaRound  ">
        Add Movie
      </h2>
      </div>
    <form onSubmit={handleSubmit} className="w-3/5 other:w-5/6 space-y-4 mx-6 flex flex-col" >
      <label className=" self-center" htmlFor="title">Title:</label>
      <input 
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="adminInput"
        placeholder="Title" 
        />
      <label className=" self-center" htmlFor="collection">Collection:</label>
      <input 
        type="text"
        id="collection"
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
        className="adminInput"
        placeholder="Collection" 
        />
      <label className=" self-center" htmlFor="description">Description:</label>
      <input 
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="adminInput"
        placeholder="Descriptions" 
        />
      <label className=" self-center" htmlFor="language">Language:</label>
      <input 
        type="text"
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="adminInput"
        placeholder="Language" 
        />
      <label className=" self-center" htmlFor="release_date">Relesed Date:</label>
      <input 
        type="date"
        id="release_date"
        value={release_date}
        onChange={(e) => setRelease_date(e.target.value)}
        className="adminInput "
        placeholder="Released Date" 
        />
      <label className=" self-center" htmlFor="featured">Featured:</label>
      <div className="flex justify-center space-x-16 items-center">
      <label>
            <input type="radio" name="featured" value={featured}
            onClick={()=>setFeatured(true)}
            />
            True
        </label><br/>
        <label>
            <input type="radio" name="featured"
            onClick={()=>setFeatured(false)}
            value={featured}/>
            False
        </label></div>
      <label className=" self-center" htmlFor="active">Active:</label>
      <div className="flex justify-center space-x-16 items-center">
      <label>
            <input type="radio" name="active" value={active}
            onClick={(e)=>setActive(true)}
            />
            True
        </label><br/>
        <label>
            <input type="radio" name="active"
            onClick={(e)=>setActive(false)}
            value={active}/>
            False
        </label>
        </div>
      {formCreate.map((form, index) =>
        <MovieForm
        key={index}
          placeholder={
            form.placeholder.slice(-3) ==='ies' ? 
            form.placeholder.slice(0,-3)+"y":
            form.placeholder.slice(0,-1)
          }
          id={form.id}
          label={form.placeholder}
          list={form.list}
          setList={form.setList}
        />
      )}
      <label className=" self-center" htmlFor="poster_path">Poster Image:</label>
      <input 
        type="file"
        id="poster_path"
        onChange={(e) => handleFileChange(e, setPoster_path)}
        className="adminInput"
        placeholder="Poster Image" 
        />
      <label className=" self-center" htmlFor="backdrop_path">Backdrop Image:</label>
      <input 
        type="file"
        id="backdrop_path"
        onChange={(e) => handleFileChange(e, setBackdrop_path)}
        className="adminInput"
        placeholder="Backdrop Image" 
        />

      <label className=" self-center" htmlFor="movie_path">Movie File:</label>
      <input 
        type="file"
        id="movie_path"
        onChange={(e) => setMoviePath(e.target.files[0])}
        className="adminInput"
        placeholder="Video File"
        />
      <label className=" self-center" htmlFor="subtitle">Subtitle File:</label>
      <input 
        type="file"
        id="subtitle"
        onChange={(e) => handleFileChange(e, setSubtitle)}
        className="adminInput"
        placeholder="Subtitle File"
        />
        <input 
          className=" bg-sky-800 text-neutral-100 px-3 other:text-xs my-5 md:mx-10 py-2.5 m-6 text-base rounded-full"
          type="submit" id="" name="" placeholder="" />
    </form>
    </div>
  );
};

export const MovieForm = ({ placeholder,id,label,setList,list}) => {
    const handleAdd=(e)=>{
      e.preventDefault();
      setList([...list, { name: "" }]);
    }
    const handleInputChange = (e, index) => {
      const name = e.target.value;
      setList(list.map((item, i) => (i === index? {name: name } : item)));
    };
   const handleRemove = (e, index) => {
     e.preventDefault();
     setList(list.filter((item, i) => i!== index));
   }

  return (
      <div className="flex border-2 p-3 border-neutral-400 rounded-md flex-col">
        <label className="self-center" htmlFor={id}>
          {label}:
        </label>
        {(Array.isArray(list) && list.length > 0) && list.map((l, index) => (
        <div className="flex items-center w-full justify-center my-3" key={index}>
        <input key={index}
          className="adminInput"
          type="text"
          onChange={(e) => handleInputChange(e, index)}
          value={list[index].name}
          placeholder={placeholder}
        />
        <button onClick={(e)=>handleRemove(e, index)}><MdDeleteOutline /></button>
        </div>
        ))}
        <div className="ml-4">
          <button className="flex bg-indigo-400 px-2 py-1 items-center text-sm -mt-2 rounded-md text-white" onClick={handleAdd}> <IoMdAdd className="text-green-400 text-lg"/> Add  </button>
        </div>
    </div>
  );
};
