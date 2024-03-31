import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";


// can only be done within the favourites page

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`}
      state={{
          movieId: movie.id,
      }}
    >
      <RateReviewIcon fontSize="large" sx={{color:"#01b4e4"}}/>
    </Link>
  );
};

export default WriteReviewIcon;