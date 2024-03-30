import React from "react";
import { top_rated } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 
//new page

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial', // fallback font
    ].join(','),
  },
});

const TopMovies = () => {
  const { data, error, isLoading, isError } = useQuery('top movies', top_rated);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(data);
  const Rated = data.results;
  
  return (
    <ThemeProvider theme={theme}>
    <>
      {/* Movie List */}
      <PageTemplate
        title='Top Rated'
        movies={Rated}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
    </>
    </ThemeProvider>
  );
}

export default TopMovies;
