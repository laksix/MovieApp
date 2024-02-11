import React from "react";
import './filmsitem.css'
import { format } from "date-fns";
const FilmsItem = ({film}) => {
    
    // const [genreInfo,setGenreInfo] = useState([])
    // useEffect(() => {
    //     getInfo('https://api.themoviedb.org/3/genre/movie/list?language=en')
    //     .then((genre) => {
    //         setGenreInfo(genre.genres)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // },[])
   
    const overview = `${film.overview.split(' ').splice(0,50).join(' ')}...`;
    const [year,month,day] = film.release_date.split('-');
    const currentDate = format(new Date(year, month, day), 'MMMMMMM dd,yyyy')


    return (
        <>
        <li className="films-item">
            <div className="films-item contanier">
                <img src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} className="contanier-img" alt="Name of film" />
                <div className="contanier-info">
                  <span className="contanier-name">{film.original_title}</span>
                  <span className="contanier-date">{currentDate}</span>
                  <span className="contanier-type"></span>
                  <span className="contanier-description">{overview}</span>
                </div>
            </div>
        </li>
        </>
    )
}
export default FilmsItem