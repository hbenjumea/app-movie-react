import { useState } from 'react';
import './MovieApp.css';

export const MovieApp = () => {

  const [search, setSearch] = useState('')
  const [movieList, setMovieList] = useState([])

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const token = 'your_token_here'

  const handleInputChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    fetchMovies()
  }

  const fetchMovies = async () => {
    const url = `${urlBase}?query=${search}`
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
    const data = await response.json()
    setMovieList(data.results)
  }


  return (
    <div className='container'>
      <h1>Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Buscar película...'
          value={search}
          onChange={handleInputChange} />
        <button type='submit'>Buscar</button>
      </form>
      {movieList &&
        <div className='movie-list'>
          {movieList.map((movie) => (
            <div key={movie.id} className='movie-card'>
              <h2>{movie.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
