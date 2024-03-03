import React, { useState, useEffect } from 'react';
import './filmslist.css';
import FilmsItem from '../FilmsItem';
import Loader from '../loader';
import LoaderError from '../loaderError';
import PaginationType from '../pagination';
import InputType from '../input';
import { debounce } from 'lodash';
import { getInfo } from '../API';
const FilmsList = ({ guestSession, currentTab }) => {
  const [loadStatus, setLoadStatus] = useState();
  const [filmsInfo, setFilmsInfo] = useState([]);
  const [errorStatus, setErrorStatus] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [apiUrl, setApiUrl] = useState('https://api.themoviedb.org/3/movie/top_rated');
  useEffect(() => {
    if (currentTab === '2') {
      setApiUrl(`https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies`);
    } else setApiUrl('https://api.themoviedb.org/3/movie/top_rated');
  }, [currentTab]);
  useEffect(() => {
    setFilmsInfo([]);
    setLoadStatus(true);
    setErrorStatus(false);
    getInfo(apiUrl)
      .then((films) => {
        setFilmsInfo(films.results);
        if (totalPages === 0) {
          setTotalPages(films.total_pages);
        }
        setLoadStatus(false);
      })
      .then(() => {
        setLoadStatus(false);
      })
      .catch(() => {
        setErrorStatus(true);
      });
      return () => setFilmsInfo(null)
  }, [apiUrl]);
  const [genreInfo, setGenreInfo] = useState([]);
  useEffect(() => {
    getInfo('https://api.themoviedb.org/3/genre/movie/list?language=en')
      .then((genre) => {
        setGenreInfo(genre.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiUrl]);
  function getCurrentPage(page) {
    setCurrentPage(page);
    setApiUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=${currentPage}`);
  }

  const updateQuery = (e) =>
    setApiUrl(
      `https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`
    );
  const debouncedOnChange = debounce(updateQuery, 500);

  return (
    <>
      {currentTab == '1' ? <InputType debouncedOnChange={debouncedOnChange} /> : null}
      {loadStatus === true && errorStatus === false && <Loader />}
      {errorStatus === true && <LoaderError />}
      {!loadStatus && !errorStatus && (
        <>
          <ul className="films">
            {filmsInfo.map((e) => {
              const currentRated = localStorage.getItem(e.id) ? JSON.parse(localStorage.getItem(e.id)) : null
              return (
                <FilmsItem
                  guestSession={guestSession}
                  filmGenres={e.genre_ids.map((ids) => {
                    for (let key = 0; key <= genreInfo.length; key++) {
                      const element = genreInfo[key];
                      if (element?.id === ids) {
                        return element.name;
                      }
                    }
                  })}
                  rated={currentRated ? currentRated.rated : e.rating}
                  getInfo={filmsInfo}
                  film={e}
                  key={e.id}
                />
              );
            })}
          </ul>
          {currentTab == '1' ? (
            <PaginationType
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              getCurrentPage={getCurrentPage}
            />
          ) : null}
        </>
      )}
    </>
  );
};
export default FilmsList;
