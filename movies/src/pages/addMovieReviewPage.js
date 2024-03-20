import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { createTheme, ThemeProvider } from '@mui/material/styles';
 


const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial', // fallback font
    ].join(','),
  },
});

const WriteReviewPage = (props) => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <ThemeProvider theme={theme}>
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
      
    </PageTemplate>
    </ThemeProvider>
  );
};

export default WriteReviewPage;