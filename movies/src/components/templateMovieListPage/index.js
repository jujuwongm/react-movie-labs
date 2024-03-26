import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

function MovieListPageTemplate({ movies, title, action }) {
  const theme = useTheme();
  const itemsPerPage = 8; // Number of movies per page
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const genreId = Number(genreFilter);

  const filteredMovies = movies
  .filter((m) => {
    return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
  })
  .filter((m) => {
    return genreId > 0 ? m.genre_ids.includes(genreId) : true;
  })
  .filter((m) => {
    return yearFilter !== "" ? m.release_date.includes(yearFilter) : true;
  })
  .filter((m) => {
    return ratingFilter !== "" ? m.vote_average >= Number(ratingFilter) : true;
  });

const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);
const handleChangePage = (_, newPage) => setCurrentPage(newPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const displayedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

const handleChange = (type, value) => {
  if (type === "name") setNameFilter(value);
  else if (type === "genre") setGenreFilter(value);
  else if (type === "year") setYearFilter(value);
  else if (type === "rating") setRatingFilter(value);
  setCurrentPage(1); // Reset current page when filters change
};


  return (
    <Grid container sx={{ padding: '0px', backgroundColor: 'white' }}>
      <Grid item xs={12}>
        <Header title={title} />
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          yearFilter={yearFilter}
          ratingFilter={ratingFilter}
        />
        <br />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(2) }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          size="large"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
          sx={{ '& .Mui-selected': { backgroundColor: theme.palette.primary.main, color: 'white' } }}
        />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
