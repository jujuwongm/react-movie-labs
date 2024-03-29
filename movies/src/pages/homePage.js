import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Spinner from '../components/spinner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 


const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial', // fallback font
    ].join(','),
  },
});



const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;
  const randomIndex = Math.floor(Math.random() * movies.length); // Generate a random index
  const heroMovie = movies[randomIndex]; // Select the movie at the random index

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <ThemeProvider theme={theme}>
      {/* Hero Image */}
      <div className="hero-image" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`, height: '80vh', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <h3 className="hero-title" style={{fontFamily: 'montserrat', paddingTop: '30vh', margin:'-10px' ,textAlign: 'center', fontSize: '7vh', color: 'white', fontWeight: '400'}}> A movie recommendation for you: </h3>
        <h1 className="hero-title" style={{ margin:'-10px' ,textAlign: 'center',fontFamily: 'montserrat', fontSize: '17vh', color: 'white'}}> {heroMovie.title}</h1>
      </div>

      {/* Movie List */}
      <PageTemplate
        title='Discover Movies'
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
    </ThemeProvider>
  );
}

export default HomePage;
