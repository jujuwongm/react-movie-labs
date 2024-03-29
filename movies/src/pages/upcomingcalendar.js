import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import { getUpcomingMovies } from "../api/tmdb-api";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Grid } from 'semantic-ui-react'; // Import Semantic UI button and grid components

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
  },
});

const UpcomingMoviesCalendar = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

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

  // Organize movies by release date
  const moviesByDate = upcomingMovies.reduce((acc, movie) => {
    const releaseDate = new Date(movie.release_date).toLocaleDateString();
    if (!acc[releaseDate]) {
      acc[releaseDate] = [];
    }
    acc[releaseDate].push(movie);
    return acc;
  }, {});

  // Sort the keys of moviesByDate object
  const sortedDates = Object.keys(moviesByDate).sort((a, b) => new Date(a) - new Date(b));

  return (
    <ThemeProvider theme={theme}>
      <div style={{ fontFamily: 'montserrat' }}>
        <div className="container mx-auto" >
          <h2 className="text-2xl font-semibold mb-4" style={{ paddingTop: "25px", fontFamily: "montserrat", textAlign: "center" }}>Upcoming Movies Calendar</h2>
          <Grid columns={7}>
            {sortedDates.map((date) => (
              <Grid.Column key={date}>
                <div className="border p-4" style={{ minHeight: "150px" }}>
                  <p className="text-lg font-semibold mb-2">{date}</p>
                  {/* Render movies for this date */}
                  {moviesByDate[date].map((movie) => (
                    <div key={movie.id} className="mb-2">
                      <p>{movie.title}</p>
                                           <Link to={`/movies/${movie.id}`}>
                        <Button style={{ background: "#90cea1", color: "white", fontFamily: "montserrat" }}>
                          Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UpcomingMoviesCalendar;
