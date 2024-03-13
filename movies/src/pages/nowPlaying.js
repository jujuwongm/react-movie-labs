import React from "react";
import { playing } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const Nowplaying = () => {
  const { data, error, isLoading, isError } = useQuery('playing', playing)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  console.log(data)
  const cinema = data.results;
  
  
  return (
    <>
      

      {/* Movie List */}
      <PageTemplate
        title='Now Playing'
        movies={cinema}

        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
    </>
  );
}

export default Nowplaying;
