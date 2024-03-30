import React, { useContext, useEffect } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button} from 'semantic-ui-react'; // Import Semantic UI button and grid components



//Additions and changes: change font to montserrat, addition of the circle with the audience score of the movie - depending on the percentage the color of the stroke of the circle changes, changed button from MUI to SemanticUI one and the background is the TMDB gradient

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat'
    ].join(','),
  },
});

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  useEffect(() => {
     if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
   }} );

  // Calculate the percentage based on the movie's vote_average. The regular vote count is a number between 1 and 10, by multiplying by 10, it becomes a number between 10 and 100, and then a % is added
  const percentage = Math.round(movie.vote_average * 10); 

  // Determine stroke color based on the percentage range
  let strokeColor;
  if (percentage < 60) {
    strokeColor = '#B2042F'; //green
  } else if (percentage >= 60 && percentage <= 70) {
    strokeColor = '#EDD300'; //yellow
  } else {
    strokeColor = '#90cea1'; //red
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
  {/* First circle: Background white and no stroke*/}
  <circle cx="50" cy="50" r="30" stroke="transparent" strokeWidth="4" fill="white" />

  {/* Second circle: Percentage indicator colour, no fill and stroke color depends on the percentage */}
  <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="4" fill="none" />

  {/* Text to display the percentage */}
  <text 
    fontFamily="montserrat"  
    x="50%" y="50%"  // Position the text at the center of the SVG
    textAnchor="middle"  // Center-align the text horizontally
    stroke="black" strokeWidth="0.5"  // Set stroke color
    dy=".3em"  // Adjust vertical alignment
  >
    {percentage}%  {/* Display the percentage and add the % symbol */}
  </text>
</svg>

{/* Movie release date */}
          <Grid container>
            <Grid item xs={6} marginBottom={-2} marginTop={-1}> 
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions disableSpacing>
          {action(movie)}
          <Link to={`/movies/${movie.id}`}>
          <Button
  style={{
    backgroundImage: 'linear-gradient(90deg, rgba(144,206,161,1) 0%, rgba(1,180,228,1) 100%)',
    color: 'white', // Set text color
    fontFamily: 'Montserrat', // Set font family
    fontWeight: '500'
  }}
>
  Details
</Button>
          </Link>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
