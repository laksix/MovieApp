import React,{useState,useEffect} from 'react';
import './filmslist.css' 
import FilmsItem from '../FilmsItem';
import Loader from '../loader';
import LoaderError from '../loaderError';

 

const FilmsList = () => {
    const getInfo = async (url) => {
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
    const [loadStatus,setLoadStatus] = useState()
    const [filmsInfo,setFilmsInfo] = useState([])
    const [errorStatus,setErrorStatus] = useState()
    useEffect(() => {
        setLoadStatus(true)
        setErrorStatus(false)
        getInfo('https://api.themoviedb.org/3/movie/top_rated')
        .then((films) => {
            setFilmsInfo(films.results)
            setLoadStatus(false)
        })
        .catch(() => {
            setErrorStatus(true)
        })
    },[])
    if (loadStatus === true && errorStatus === false){
        return (
            <Loader/>
        )
    } else if (errorStatus === true){
        return (
            <LoaderError/>
        )
    } 
    else {
    return (
        <ul className='films'>
         {filmsInfo.map(e => {
            return (
                <FilmsItem getInfo = {getInfo} film = {e} key = {e.id}/>
            )
         })}
        </ul>
    )}
}
export default FilmsList