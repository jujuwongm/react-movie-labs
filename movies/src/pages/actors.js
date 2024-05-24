import React from "react";
import { top_rated_actors } from "../api/tmdb-api";
import PageTemplate from '../components/templateActorListPage';  // This component needs to be created
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// New theme configuration
const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial', // fallback font
    ].join(','),
  },
});

const TopActors = () => {
  const { data, error, isLoading, isError } = useQuery('top actors', top_rated_actors);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const Actors = data.results;

  return (
    
    <ThemeProvider theme={theme}>
      <>
        {/* Actor List */}
        <PageTemplate
          title='Top Rated Actors'
          actors={Actors}
        />
      </>
    </ThemeProvider>
  );
}

export default TopActors;
