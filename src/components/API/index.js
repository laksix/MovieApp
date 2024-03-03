export const postRated = (currentRated, film, guestSession) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDY5ZWI3ZjJiMTlkNGNiNWU3NDg0MDE3ZTFmMmUyMCIsInN1YiI6IjY1YzY0NzA2YmQ1ODhiMDE4NDQ2MWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d0o9oYcFMKQcGekYSQGz5pLwfFiZEkHPpJECZUCZw5k',
    },
    body: `{"value":"${currentRated}","filmId":"${film.id}"}`,
  };

  fetch(`https://api.themoviedb.org/3/movie/${film.id}/rating?guest_session_id=${guestSession}`, options);
};

export const getInfo = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDY5ZWI3ZjJiMTlkNGNiNWU3NDg0MDE3ZTFmMmUyMCIsInN1YiI6IjY1YzY0NzA2YmQ1ODhiMDE4NDQ2MWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d0o9oYcFMKQcGekYSQGz5pLwfFiZEkHPpJECZUCZw5k',
    },
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` + `recevied ${res.status}`);
  }
  const films = await res.json();
  return films;
};
