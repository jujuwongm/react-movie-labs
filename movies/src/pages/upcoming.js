import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const UpcomingMovies = () => { // Rename function to UpcomingMovies
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  console.log(data)
  const soon = data.results;
  
  
  return (
    <>
      {/* Movie List */}
      <PageTemplate
        title='Coming soon!'
        movies={soon}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
    </>
  );
}

export default UpcomingMovies; // Export UpcomingMovies component
