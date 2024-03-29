import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();

  return (
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>



      <div style={{fontFamily:'montserrat'}}>
      <Typography variant="h4" component="h3" sx={{ color: 'black' }}>
      <a href={movie.homepage} style={{ fontFamily:'montserrat',textDecoration: 'none', color: 'inherit', transition: 'color 0.3s' }}>
          {movie.title}
      </a>

        <br />
        
        {/* // <span sx={{ fontSize: "1.5rem", fontFamily:"montserrat" }}>{`   "${movie.tagline}"`} </span> */}
      </Typography>
      </div>
      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
      </Paper>
  );
};

export default MovieHeader;