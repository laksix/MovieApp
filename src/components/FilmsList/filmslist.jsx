import React,{useState,useEffect} from 'react';
import './filmslist.css' 
import FilmsItem from '../FilmsItem';
import Loader from '../loader';
import LoaderError from '../loaderError';
import PaginationType from '../pagination';
import InputType from '../input';
import {debounce} from 'lodash'
const FilmsList = ({guestSession,currentTab}) => {
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
        if (currentTab === '2'){
            setApiUrl(`https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies`)
        } else setApiUrl('https://api.themoviedb.org/3/movie/top_rated')
    },[currentTab])
    useEffect(() => {
        setFilmsInfo([])
        console.log(filmsInfo)
        setLoadStatus(true)
        setErrorStatus(false)
        getInfo(apiUrl)
        .then((films) => {
            setFilmsInfo(films.results)
            if (totalPages === 0) {
                setTotalPages(films.total_pages)
            }
        })
        .then (() => {
            setLoadStatus(false)
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
    function getCurrentPage (page) {
        setCurrentPage(page)
        setApiUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=${currentPage}`)
    }
    
    const updateQuery = (e) => setApiUrl(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`)
    const debouncedOnChange = debounce(updateQuery,500)
    console.log(currentTab)
    
    
        if (loadStatus === true && errorStatus === false){
        return (
            <>
            {currentTab == '1' ? <InputType debouncedOnChange = {debouncedOnChange}/> : null}
            <Loader/>
            </>
        )
    } else if (errorStatus === true){
        return (
            <>
            {currentTab == '1' ? <InputType debouncedOnChange = {debouncedOnChange}/> : null}
            <LoaderError/>
            </>
        )
    }
    else {
    return (
        <>
        {currentTab == '1' ? <InputType debouncedOnChange = {debouncedOnChange}/> : null}
        <ul className='films'>
         {filmsInfo.map(e => {
            
            return (
                <FilmsItem
                guestSession = {guestSession}
                filmGenres = {e.genre_ids.map(ids => {
                    for (let key = 0; key <= genreInfo.length; key++){
                        const element = genreInfo[key];
                        if (element?.id === ids){
                            return element.name
                        }
                    }
                })} rated = {e.rating} getInfo = {filmsInfo} film = {e} key = {e.id}/>
                
            )
         })}
        </ul>
        {currentTab == '1' ? <PaginationType totalPages = {totalPages} currentPage = {currentPage} setCurrentPage = {setCurrentPage} getCurrentPage = {getCurrentPage}/> : null}
        </>
    )}
}
export default FilmsList