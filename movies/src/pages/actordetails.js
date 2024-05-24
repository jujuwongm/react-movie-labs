import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { getActor } from '../api/tmdb-api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MovieHeader from '../components/headerMovie'; // Import MovieHeader component

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
  },
});

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActor
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movieCredits = actor.movie_credits ? actor.movie_credits.cast : [];

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Integrate MovieHeader component */}
        <MovieHeader movie={{ title: actor.name }} />
        <br></br>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '20px', fontFamily: 'Montserrat' }}>
          <div>
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} style={{ width: '100%', marginBottom: '10px', marginLeft: '10px' }} />
          </div>
          <div>
            {/* <h1>{actor.name}</h1> */}
            <br></br>
            <p style={{ fontFamily: 'montserrat', fontSize: '16px' }}>{actor.biography}</p>
            <h3 style={{ fontFamily: 'montserrat' }}>Filmography</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {movieCredits.map(movie => (
                movie.poster_path && (  // Check if poster_path exists
                  <div key={movie.id} style={{ padding: '10px' }}>
                    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ width: '100%', marginBottom: '10px' }} />
                    </Link>
                    <p>{movie.title}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ActorDetailsPage;
