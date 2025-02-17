import React, { useState, useEffect } from 'react';

const FilmRecommendationApp = () => {
  const [film, setFilm] = useState('');
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const loadFilms = () => {
      const storedFilms = localStorage.getItem('films');
      if (storedFilms) {
        setFilms(JSON.parse(storedFilms));
      }
    };

    loadFilms();
  }, []);

  useEffect(() => {
    const saveFilms = () => {
      localStorage.setItem('films', JSON.stringify(films));
    };

    saveFilms();
  }, [films]);

  const addFilm = () => {
    if (film.trim()) {
      setFilms((prevFilms) => [...prevFilms, film]);
      setFilm('');
    }
  };

  const clearFilms = () => {
    setFilms([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Film Recommendations</h1>
      <input
        style={styles.input}
        placeholder="Enter a film name"
        value={film}
        onChange={(e) => setFilm(e.target.value)}
        aria-label="Film name input"
      />
      <button onClick={addFilm} aria-label="Add film button">Add Film</button>
      <button onClick={clearFilms} aria-label="Clear films button">Clear Films</button>
      <ul>
        {films.map((item, index) => (
          <li key={index} style={styles.listItem}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    borderWidth: '1px',
    borderColor: '#ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  listItem: {
    fontSize: '18px',
    padding: '10px',
    borderBottomWidth: '1px',
    borderBottomColor: '#ddd',
  },
};

export default FilmRecommendationApp;
