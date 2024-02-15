import React,{useState,useEffect} from 'react';
import './filmslist.css' 
import FilmsItem from '../FilmsItem';
import Loader from '../loader';
import LoaderError from '../loaderError';
import PaginationType from '../pagination';
import InputType from '../input';
import {debounce} from 'lodash'
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
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [apiUrl,setApiUrl] = useState('https://api.themoviedb.org/3/movie/top_rated')
    useEffect(() => {
        setLoadStatus(true)
        setErrorStatus(false)
        getInfo(apiUrl)
        .then((films) => {
            setFilmsInfo(films.results)
            setLoadStatus(false)
            if (totalPages === 0) {
                setTotalPages(films.total_pages)
            }
        })
        .catch(() => {
            setErrorStatus(true)
        })
    },[apiUrl])
     const [genreInfo,setGenreInfo] = useState([])
    useEffect(() => {
        getInfo('https://api.themoviedb.org/3/genre/movie/list?language=en')
        .then((genre) => {
            setGenreInfo(genre.genres)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    console.log(genreInfo)
    function getCurrentPage (page) {
        setCurrentPage(page)
        setApiUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=${currentPage}`)
    }
    
    const updateQuery = (e) => setApiUrl(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`)
    const debouncedOnChange = debounce(updateQuery,500)
    
    
    
        if (loadStatus === true && errorStatus === false){
        return (
            <>
            <InputType debouncedOnChange = {debouncedOnChange}/>
            <Loader/>
            </>
        )
    } else if (errorStatus === true){
        return (
            <>
            <InputType debouncedOnChange = {debouncedOnChange}/>
            <LoaderError/>
            </>
        )
    } 
    else {
    return (
        <>
        <InputType debouncedOnChange = {debouncedOnChange}/>
        <ul className='films'>
         {filmsInfo.map(e => {
            
            return (
                <FilmsItem filmGenres = {e.genre_ids.map(ids => {
                    for (let key = 0; key <= genreInfo.length; key++){
                        const element = genreInfo[key];
                        if (element.id === ids){
                            return element.name
                        }
                    }
                })} getInfo = {filmsInfo} film = {e} key = {e.id}/>
                
            )
         })}
        </ul>
        <PaginationType totalPages = {totalPages} currentPage = {currentPage} setCurrentPage = {setCurrentPage} getCurrentPage = {getCurrentPage}/>
        </>
    )}
}
export default FilmsList