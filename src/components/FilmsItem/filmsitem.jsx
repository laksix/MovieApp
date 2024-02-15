import React, { useState,useEffect } from "react";
import './filmsitem.css'
import { format } from "date-fns";
import { Tag } from 'antd';
const FilmsItem = ({film,filmGenres}) => {
    const overview = `${film.overview.split(' ').splice(0,20).join(' ')}...`;
    const [year,month,day] = film.release_date.split('-');
    let currentDate = null;
    if (year || month || day){
        currentDate = format(new Date(year, month, day), 'MMMMMMM dd,yyyy')
    }

    const [voteColor,setVoteColor] = useState('')
    useEffect(() => {
        if (film.vote_average > 7.5) {
            setVoteColor('Green')
            } else if (film.vote_average < 7.5 && film.vote_average > 3.5){
                setVoteColor('Yellow')
            } else setVoteColor('Red')
    })
    let classTag = 'contanier-vote'
    if (voteColor === 'Green'){
        classTag += ' vote-green'
    } else if (voteColor === 'Yellow'){
        classTag += ' vote-yellow'
    } else classTag += ' vote-red'

    return (
        <>
        <li className="films-item">
            <div className="films-item contanier">
                <img width={187} height={278} src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} className="contanier-img posAb"/>
                <div className="contanier-info">
                  <span className="contanier-name">{film.original_title}</span>
                  <span className="contanier-date">{currentDate ? currentDate : 'No date'}</span>
                  <ul className="contanier-type">{filmGenres.map(e => <Tag><li className="contanier-type-text">{e}</li></Tag> )}</ul>
                  <span className="contanier-description">{overview}</span>
                  <div className={classTag}><div className="contanier-vote-text">{film.vote_average.toFixed(1)}</div></div>
                </div>
            </div>
        </li>
        </>
    )
}
export default FilmsItem