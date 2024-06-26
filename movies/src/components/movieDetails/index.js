import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate"; // Import StarRateIcon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import CalendarTodayIcon
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import XIcon from '@mui/icons-material/X';
import { Container } from "@mui/material";


 //Changes and additions: Font montserrat all over, Cast - name, character name in bold, Crew - name, job in bold, Recommendations with poster - clicking on the poster or the name leads to a movie page within the app 


const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Arial', // fallback font
    ].join(','),
  },
});


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};



const chip = { margin: 0.5, background:'#0d253f', color: 'white' };





const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [recommendations, setRecommendations] = useState([]);



  useEffect(() => {

    const fetchCredits = async () => {
      try {
        // Fetch cast data from TMDB API
        const responseCast = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const dataCast = await responseCast.json();  // Parse response to JSON
        setCast(dataCast.cast);  // Update cast state
  
        // Fetch crew data from TMDB API
        const responseCrew = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const dataCrew = await responseCrew.json();  // Parse response to JSON
        setCrew(dataCrew.crew);  // Update crew state

        //they are fetched from the same TMDB API endpoint but stored in separate state variables (cast and crew).


  
        // Fetch movie recommendations from TMDB API
        const responseRecommendations = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const dataRecommendations = await responseRecommendations.json();  // Parse response to JSON
        setRecommendations(dataRecommendations.results);  // Update recommendations state
      } catch (error) {
        console.error('Error fetching data:', error);  // Log error if fetching fails
      }
    };
  
    fetchCredits();
  }, [movie.id]);
  const handleTwitterShare = () => {
    const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`;
    const tweetMessage = `I'm kinda obsessed with ${movie.title}❤️✨📽🎞 Check it out at ${tmdbLink}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetMessage)}`;
    window.open(shareUrl, '_blank');
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" component="h3" sx={{ fontWeight: 500 }} >
        Overview
      </Typography>

      <Typography variant="h6" component="p" sx={{ fontWeight: 400 }}>
  {movie.overview}
</Typography>


      <Container 
        component="ul" 
        sx={{...root}}
      >
        
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Container>
      <Container component="ul" sx={{...root, marginTop: "-1"}}>
        <Chip icon={<AccessTimeIcon style={{ color: '#0d253f' }} />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon style={{ color: '#0d253f' }} />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRateIcon style={{ color: '#0d253f' }} />} // Set color to #0d253f
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
  <Chip icon={<CalendarTodayIcon style={{ color: '#0d253f' }} />} label={`Released: ${movie.release_date}`} /> {/* Add CalendarTodayIcon */}
      </Container>
      <Fab
         style={{ backgroundColor: 'black', color: 'white' }}
        variant="extended"
        onClick={handleTwitterShare}
        sx={{
          position: 'fixed',
          bottom: '1em',
          left: '2em'
        }}
      >
        Share on 
        <XIcon />
      </Fab>


      {/* CAST PICTURES, CHARACTER NAMES AND ACTOR NAMES*/}
      <br></br>
      <Typography variant="h5" component="h3" sx={{ fontWeight: 500 }}>Cast </Typography>
      <div style={{margin: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {cast.map((person) => (
          person.profile_path && (
            <div key={person.id} style={{ padding: '10px' }}>
              <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} style={{ width: '100%', marginBottom: '10px' }} />
              <p style={{ fontWeight: 'bold', marginBottom: '0', marginTop: '0', fontFamily: 'montserrat'}}>{person.character}</p>
              <p style={{  marginBottom: '5px', fontFamily: 'montserrat' }}>{person.name}</p>
            </div>
          )
        ))}
      </div>
{/* CREW */}
      <Typography  variant="h5" component="h3" sx={{ fontWeight: 500 }}>Crew </Typography>
      <div style={{margin: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {crew.map((person) => (
          person.profile_path && (
            <div key={person.id} style={{ padding: '10px' }}>
              <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} style={{ width: '100%', marginBottom: '10px' }} />
              <p style={{ fontWeight: 'bold', marginBottom: '0', marginTop: '0', fontFamily: 'montserrat'}}>{person.job}</p>
              <p style={{  marginBottom: '5px', fontFamily: 'montserrat' }}>{person.name}</p>
            </div>
          )
        ))}
      </div>



{/* Section for displaying recommendations */}
<Typography variant="h5" component="h3" sx={{ fontWeight: 500 }}>Recommendations</Typography>
<div style={{margin: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
  {recommendations.map((recommendation) => (
    <div key={recommendation.id} style={{ padding: '10px' }}>
      <Link to={`/movies/${recommendation.id}`} target="_blank" rel="noopener noreferrer">
        <img src={`https://image.tmdb.org/t/p/w200${recommendation.poster_path}`} alt={recommendation.title} style={{ width: '100%', marginBottom: '10px' }} />
      </Link>
      <p style={{ fontWeight: 'bold', marginBottom: '0', marginTop: '0', fontFamily: 'montserrat'}}>
        <Link to={`/movies/${recommendation.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          {recommendation.title}
        </Link>
      </p>
    </div>
  ))}
</div>



      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </ThemeProvider>
  );
};

export default MovieDetails;