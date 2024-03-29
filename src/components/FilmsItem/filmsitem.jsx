import React, { useState, useEffect } from 'react';
import './filmsitem.css';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { Rate } from 'antd';
import { postRated } from '../API';


const FilmsItem = ({ film, filmGenres, guestSession, rated }) => {
  const overview = `${film.overview.split(' ').splice(0, 30).join(' ')}...`;
  const [year, month, day] = film.release_date.split('-');
  let currentDate = null;
  if (year || month || day) {
    currentDate = format(new Date(year, month, day), 'MMMMMMM dd,yyyy');
  }

  const [currentRated, setCurrentRated] = useState(0);
 

  useEffect(() => {
    if (currentRated > 0) {
      postRated(currentRated, film, guestSession);
  }}, [currentRated]);
 


  const [rating, setRating] = useState(0);
  const [voteColor, setVoteColor] = useState('');
  useEffect(() => {
    setRating(rated);
  }, [rated]);
  useEffect(() => {
    if (film.vote_average > 7) {
      setVoteColor('Green');
    } else if (film.vote_average < 7 && film.vote_average > 5) {
      setVoteColor('Yellow');
    } else if (film.vote_average < 5 && film.vote_average > 3) {
      setVoteColor('Red');
    } else setVoteColor('Bad');
  });
  let classTag = 'contanier-vote';
  if (voteColor === 'Green') {
    classTag += ' vote-green';
  } else if (voteColor === 'Yellow') {
    classTag += ' vote-yellow';
  } else if (voteColor === 'Red') {
    classTag += ' vote-red';
  } else classTag += ' vote-bad';
  return (
    <li className="films-item">
      <div className="films-item contanier">
        <img
          width={250}
          height={250}
          src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
          className="contanier-img posAb"
        />
        <div className="contanier-info">
          <span className="contanier-name">{film.original_title}</span>
          <span className="contanier-date">{currentDate ? currentDate : 'No date'}</span>
          <ul className="contanier-type">
            {filmGenres.map((e) => (
              <Tag key={Math.random()}>
                <li className="contanier-type-text">{e}</li>
              </Tag>
            ))}
          </ul>
          <span className="contanier-description">{overview}</span>
          <div className={classTag}>
            <div className="contanier-vote-text">{film.vote_average.toFixed(1)}</div>
          </div>
          <div className="contanier-rated">
            <Rate
              style={{ fontSize: 14 }}
              value={rating}
              onChange={(value) => {
                setRating(value);
                setCurrentRated(value);
                localStorage.setItem(`${film.id}`,JSON.stringify({id:film.id,rated:value}))
              }}
              count={10}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
export default FilmsItem;
