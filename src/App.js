import React, { useState, useEffect } from 'react';

const FilmRecommendationApp = () => {
  const [film, setFilm] = useState('');
  const [films, setFilms] = useState([]);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const storedFilms = localStorage.getItem('films');
      const storedUsername = localStorage.getItem('username');
      if (storedFilms) {
        setFilms(JSON.parse(storedFilms));
      }
      if (storedUsername) {
        setUsername(storedUsername);
        setIsUsernameSet(true);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveFilms = () => {
      localStorage.setItem('films', JSON.stringify(films));
    };

    saveFilms();
  }, [films]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const addFilm = () => {
    if (film.trim()) {
      setFilms((prevFilms) => [...prevFilms, { name: film, addedBy: username }]);
      setFilm('');
    }
  };

  const clearFilms = () => {
    setFilms([]);
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  if (!isUsernameSet) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Welcome to Film Recommendations</h1>
        <form onSubmit={handleUsernameSubmit}>
          <input
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username input"
          />
          <button type="submit" aria-label="Submit username">
            Set Username
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Film Recommendations</h1>
      <p style={styles.welcomeText}>Welcome, {username}!</p>
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
          <li key={index} style={styles.listItem}>
            {item.name} <span style={styles.addedBy}>(added by {item.addedBy})</span>
          </li>
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
  welcomeText: {
    fontSize: '18px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  addedBy: {
    fontSize: '14px',
    color: '#666',
    fontStyle: 'italic',
  }
};

export default FilmRecommendationApp;
