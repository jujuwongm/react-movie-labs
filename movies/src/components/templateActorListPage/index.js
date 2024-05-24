import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid";

const TemplateActorListPage = ({ actors, title }) => {
  return (
    <Grid container spacing={5}>
      {actors.map((actor) => (
        <Grid key={actor.id} item xs={6} sm={4} md={3} lg={2} xl={2}> 
          <ActorCard actor={actor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplateActorListPage;
