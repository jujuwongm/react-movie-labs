import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ActorCard = ({ actor }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/actors/${actor.id}`}>
        <CardMedia
          component="img"
          alt={actor.name}
          height="auto"
          image={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {actor.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActorCard;
