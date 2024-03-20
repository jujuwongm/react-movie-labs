import React, { useContext } from "react";
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
import StarRateIcon from "@mui/icons-material/StarRate";
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
      {/* 
    This SVG element is used to visually represent a percentage circle, which replaces the current grading system.
  */}
  <svg height="100" width="100" style={{marginTop: "-60px", marginLeft: "-20px"}}>
    {/* 
      This circle serves as the background of the percentage circle, filled with white color.
    */}
    <circle cx="50" cy="50" r="30" stroke="transparent" strokeWidth="4" fill="white" />
    
    {/* 
      This circle represents the actual percentage circle, with a dynamic stroke color.
      It appears as an outline due to the "none" fill attribute.
    */}
    <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="4" fill="none" />
    
    {/* 
      This text element displays the percentage value at the center of the circle.
      It uses the "montserrat" font for consistent styling and is positioned in the center.
    */}
    <text fontFamily="montserrat" x="50%" y="50%" textAnchor="middle" stroke="black" strokeWidth="0.5" dy=".3em">
      {/* 
        The percentage value dynamically changes based on the "percentage" variable.
      */}
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
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
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
