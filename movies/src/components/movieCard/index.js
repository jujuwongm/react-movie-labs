import React, { useContext, useState, useEffect } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial', // fallback font
    ].join(','),
  },
});

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function fetchWatchProviders() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=YOUR_API_KEY`);
        const data = await response.json();
        if (data.results) {
          setProviders(data.results);
        }
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      }
    }

    fetchWatchProviders();
  }, [movie.id]);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  // Calculate the percentage based on the movie's vote_average
  const percentage = Math.round((movie.vote_average / 10) * 100);

  // Determine stroke color based on the percentage range
  let strokeColor;
  if (percentage < 55) {
    strokeColor = 'red';
  } else if (percentage >= 55 && percentage <= 70) {
    strokeColor = 'yellow';
  } else {
    strokeColor = 'green';
  }

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            movie.favorite ? (
              <Avatar sx={{ backgroundColor: 'red' }}>
                <FavoriteIcon />
              </Avatar>
            ) : null
          }
          title={
            <Typography variant="h5" component="p">
              {movie.title}{" "}
            </Typography>
          }
        />
        <CardMedia
          sx={{ height: 500 }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
        />

        <CardContent>
          <svg height="100" width="100" style={{ marginTop: "-60px", marginLeft: "-20px" }}>
            <circle cx="50" cy="50" r="30" stroke="transparent" strokeWidth="4" fill="white" />
            <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="4" fill="none" />
            <text fontFamily="montserrat" x="50%" y="50%" textAnchor="middle" stroke="black" strokeWidth="0.5" dy=".3em">
              {percentage}%
            </text>
          </svg>

          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
              </Typography>
            </Grid>
          </Grid>

          {/* Display watch providers */}
          <Grid container spacing={1} alignItems="center">
            {providers.map(provider => (
              <Grid item key={provider.provider_id}>
                <a href={provider.link}>
                  <img src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} alt={provider.provider_name} style={{ width: "30px", height: "auto" }} />
                </a>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardActions disableSpacing>
          {action(movie)}
          <Link to={`/movies/${movie.id}`}>
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
