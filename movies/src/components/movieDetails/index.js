import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
  
};
const chip = { margin: 0.5 };
const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
         // Fetching cast data from TMDB API
        const responseCast = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const dataCast = await responseCast.json();
        setCast(dataCast.cast); // Setting cast data to state


        // Fetching crew data from TMDB API (same endpoint as cast)
        const responseCrew = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const dataCrew = await responseCrew.json();
        setCrew(dataCrew.crew); // Setting crew data to state
//they are fetched from the same TMDB API endpoint but stored in separate state variables (cast and crew).
        

        // Fetching movie recommendations
        const responseRecommendations = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const dataRecommendations = await responseRecommendations.json();
        setRecommendations(dataRecommendations.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCredits();
  }, [movie.id]);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Typography variant="h5" component="h3">Cast </Typography>
      <div style={{margin: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {cast.map((person) => (
          person.profile_path && (
            <div key={person.id} style={{ padding: '10px' }}>
              <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} style={{ width: '100%', marginBottom: '10px' }} />
              <p style={{ fontWeight: 'bold', marginBottom: '0', marginTop: '0'}}>{person.character}</p>
              <p style={{  marginBottom: '5px' }}>{person.name}</p>
            </div>
          )
        ))}
      </div>

      <Typography  variant="h5" component="h3">Crew </Typography>
      <div style={{margin: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {crew.map((person) => (
          person.profile_path && (
            <div key={person.id} style={{ padding: '10px' }}>
              <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} style={{ width: '100%', marginBottom: '10px' }} />
              <p style={{ fontWeight: 'bold', marginBottom: '0', marginTop: '0'}}>{person.job}</p>
              <p style={{  marginBottom: '5px' }}>{person.name}</p>
            </div>
          )
        ))}
      </div>

       {/* Section for displaying recommendations */}
       <Typography variant="h5" component="h3">Recommendations</Typography>
      <Slider > {/* Use the Slider component with settings */}
        {recommendations.map((recommendation) => (
          <div key={recommendation.id}>
            <img src={`https://image.tmdb.org/t/p/w200${recommendation.poster_path}`} alt={recommendation.title} />
            <p>{recommendation.title}</p>
          </div>
        ))}
      </Slider>

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
    </>
  );
};

export default MovieDetails;
