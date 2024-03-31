//This page assumes that the TMDB upcoming page would follow a chronological linear upcoming movie page - I do recognize that the current organisation shows movies from previous years, but it does the job well 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingMovies } from "../api/tmdb-api";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Container } from 'semantic-ui-react';

// Create a theme with Montserrat font
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
});

const UpcomingMoviesCalendar = () => {
  // State to store upcoming movies
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  // Fetch upcoming movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getUpcomingMovies();
        setUpcomingMovies(response.results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Organize movies by release year and month
  // Using the reduce method to group upcoming movies by their release year and month
const moviesByYearAndMonth = upcomingMovies.reduce((accumulator, movie) => {
  // Extracting the release year and month from the movie's release date
  const releaseYear = new Date(movie.release_date).getFullYear();
  const releaseMonth = new Date(movie.release_date).getMonth();

  // Grouping movies by release year and month
  // Initializing the accumulator object 
  accumulator[releaseYear] = accumulator[releaseYear] || {};
  // Initializing the array for the release month 
  // and adding the current movie to it
  accumulator[releaseYear][releaseMonth] = [...(accumulator[releaseYear][releaseMonth] || []), movie];

  // Returning the accumulator object for the next iteration
  return accumulator;
}, {});

// The moviesByYearAndMonth object now contains upcoming movies grouped by their release year and month

  // Sort years in ascending order
  const sortedYears = Object.keys(moviesByYearAndMonth).sort((a, b) => a - b);

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ fontFamily: 'Montserrat' }}>
        {/* Display title */}
        <h2 className="text-2xl font-semibold mb-4" style={{ paddingTop: "25px", textAlign: "center" }}>Upcoming Movies Calendar</h2>
        {/* Display boxes for movie years */}
        {sortedYears.map((year) => (
          <div key={year}  style={{ marginBottom: "20px" }}>
            <h3 className="text-lg font-semibold mb-2" style={{fontFamily:"montserrat"}}>{year}</h3>
            {/* Display boxes for movie months */}
            <div className="ui segments">
              {Object.keys(moviesByYearAndMonth[year]).map((month) => (
                <div key={month} className="ui segment" style={{ marginBottom: "10px" }}>
                  <p className="text-base font-bold mb-2">{new Date(0, month).toLocaleString('default', { month: 'long' })}</p>
                  {/* Render movies for this month */}
                  {moviesByYearAndMonth[year][month].map((movie) => (
                    <div key={movie.id} className="mb-2">
                      {/* Display movie name and release date */}
                      <p>
                        <strong>{new Date(movie.release_date).toLocaleDateString()}</strong> - {movie.title}
                        {/* Link to movie details */}
                        <Link to={`/movies/${movie.id}`} style={{ marginLeft: "10px" }}>
                          {/* Button for movie details */}
                          <Button style={{ background: "#90cea1", color: "white", fontFamily: "Montserrat", padding: "-1" }}>
                            Details
                          </Button>
                        </Link>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default UpcomingMoviesCalendar;
