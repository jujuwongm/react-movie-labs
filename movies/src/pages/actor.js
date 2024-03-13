import React from "react";
import { useParams } from "react-router-dom";
import TemplateActorPage from "../components/templateActorPage";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const ActorPage = () => {
  const { id } = useParams(); // Extract actor ID from URL parameters

  const { data, error, isLoading, isError } = useQuery(
    ["actor", { id }],
    () => getActor(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  };

  const actor = data;

  console.log("Actor data in ActorPage:", actor); // Log the actor data

  return <TemplateActorPage person={actor} />; // Pass actor data to TemplateActorPage
};

export default ActorPage;
