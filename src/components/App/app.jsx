import React, { useEffect, useState } from 'react';
import TabsPanel from '../tabs';

const App = () => {
  const [guestSession, setguestSession] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDY5ZWI3ZjJiMTlkNGNiNWU3NDg0MDE3ZTFmMmUyMCIsInN1YiI6IjY1YzY0NzA2YmQ1ODhiMDE4NDQ2MWFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d0o9oYcFMKQcGekYSQGz5pLwfFiZEkHPpJECZUCZw5k',
    },
  };
  useEffect(() => {
    if (!localStorage.getItem('session')) {
      fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
        .then((response) => response.json())
        .then((response) => {
          setguestSession(response.guest_session_id);
          localStorage.setItem('session', response.guest_session_id);
        })
        .catch();
    } else {
      setguestSession(localStorage.getItem('session'));
    }
  }, []);

  return <TabsPanel guestSession={guestSession} />;
};

export default App;
