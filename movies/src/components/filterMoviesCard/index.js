import React from "react";
import Card from "@mui/material/Card";
import { getGenres } from "../../api/tmdb-api";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const formControl = 
  {
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleYearChange = (e) => {
    handleChange(e, "year", e.target.value);
  };

  return (
    <Card 
      sx={{
        Width: 1000,
        background: 'linear-gradient(90deg, rgba(144,206,161,1) 0%, rgba(1,180,228,1) 100%)',
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon padding='0 px' fontSize="large" />
          Filter
        </Typography>

        {/* Existing TextField */}
        <TextField
          sx={{
            width: '500px',
            ...formControl 
          }}
          id="filled-search"
          label="Search for a movie..."
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/* Existing FormControl for genre */}
        <FormControl sx={{  width: '300px', marginLeft:'50px', ...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* New TextField for year filter */}
        <TextField
          sx={{
            width: '300px', 
            marginLeft: '50px', 
            ...formControl
          }}
          id="filled-year"
          label="Release Year"
          type="number"
          variant="filled"
          value={props.yearFilter}
          onChange={handleYearChange}
        />
      </CardContent>
    </Card>
  );
};
