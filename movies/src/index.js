import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import Nowplaying from "./pages/nowPlaying";
import UpcomingMovies from "./pages/upcoming";
import TopMovies from "./pages/topRated";
import UpcomingMoviesCalendar from "./pages/upcomingcalendar";
import ActorPage from "./pages/actordetails";
import TopActors from "./pages/actors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/playing" element={<Nowplaying />} />
            <Route path="/movies/upcoming" element={<UpcomingMovies />} />
            <Route path="/movies/calendar" element={<UpcomingMoviesCalendar />} />
            <Route path="/movies/toprated" element={<TopMovies />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/actors" element={<TopActors />} />
            <Route path="/actors/:id" element={<ActorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
