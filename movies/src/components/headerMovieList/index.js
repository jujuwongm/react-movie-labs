import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

//Change colours of the arrows and changed font to montserrat

const Header = (props ) => {
  const title = props.title
  const navigate = useNavigate();
  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
        flexWrap: "wrap",
        marginTop: 1.5,
        marginBottom: 1.5,
        color: "#0d253f",
        fontFamily: "montserrat"
      }}
      >
         <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon style={{ color: '#90cea1' }} fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton
      
        aria-label="go forward"
        
      >
        <ArrowForwardIcon style={{ color: '#01b4e4' }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;