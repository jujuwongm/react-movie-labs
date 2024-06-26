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

//Additions: change in the layout, turning it into an in-line design, background in gradient and font to montserrat && addition of the year filter and the rating filter (based on the vote count, not the percentage)

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


const handleRatingChange = (e) => {
  // Get the input value from the event
  const inputValue = e.target.value;
  // Regular expression pattern to match only single digits
  const regex = /^[0-9]$/;
  // Check if the input value matches the regex pattern
  if (regex.test(inputValue)) {
    // If it matches, call handleChange function with the event, "rating" as the field name, and the input value
    handleChange(e, "rating", inputValue);
  }
};

  return (
    <Card 
      sx={{
        Width: 1000,
        background: 'linear-gradient(90deg, rgba(144,206,161,1) 0%, rgba(1,180,228,1) 100%)',
      }} 
      variant="outlined">
      <CardContent >
        <Typography variant="h5" component="h1">
          <SearchIcon padding='0 px' fontSize="large" />
          Filter
        </Typography>

        
        <TextField
          sx={{
            width: '400px',
            ...formControl 
          }}
          id="filled-search"
          label="Search for a movie..."
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/*FormControl for genre */}
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

        {/* Year filter */}
      
        <TextField
          sx={{
            width: '300px', 
            marginLeft: '50px', 
            ...formControl
          }}
          id="filled-year"
          label="Release Year"
          type="number" // numbers only for input
          variant="filled"
          value={props.yearFilter}
          onChange={handleYearChange}
          inputProps={{ maxLength: 4 }} // Input limit is 4 digits
        />

        {/* New TextField for rating filter */}
        {/*Important to keep in mind that is based on the rating average, not the percentage circle*/}
        <TextField
  sx={{
    width: '300px', 
    marginLeft: '50px', 
    ...formControl
  }}
  id="filled-rating"
  label="Minimum Rating"
  type="number" // Toggle and only numbers accepted 
  variant="filled"
  value={props.ratingFilter}
  onChange={handleRatingChange}
  inputProps={{ maxLength: 1 }} // Limit input to one character so the limit is 9
/>

      </CardContent>
    </Card>
  );
};
