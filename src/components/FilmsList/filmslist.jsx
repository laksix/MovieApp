import React,{useState,useEffect} from 'react';
import './filmslist.css' 
import FilmsItem from '../FilmsItem';



 

const FilmsList = () => {
    const getAllFilmsByName = async (url) => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDY5ZWI3ZjJiMTlkNGNiNWU3NDg0MDE3ZTFmMmUyMCIsInN1YiI6IjY1YzY0NzA2YmQ1ODhiMDE4NDQ2MWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d0o9oYcFMKQcGekYSQGz5pLwfFiZEkHPpJECZUCZw5k'
            }
          };
        const res = await fetch(url,options);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `recevied ${res.status}`)
        }
        const films = await res.json();
        return films
    }
    const [filmsInfo,setInfo] = useState([])
    useEffect(() => {
        getAllFilmsByName('https://api.themoviedb.org/3/movie/top_rated')
        .then((films) => {
            setInfo(films.results)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    return (
        <ul className='films'>
         {filmsInfo.splice(0,6).map(e => {
            return (
                <FilmsItem film = {e} key = {e.id}/>
            )
         })}
        </ul>
    )
}
export default FilmsList