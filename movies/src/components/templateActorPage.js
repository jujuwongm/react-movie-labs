import React from "react";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const TemplateActorPage = ({ person }) => {
  console.log("Actor data:", person); // Log the person prop

  const { data , error, isLoading, isError } = useQuery(
    ["actorImages", { id: person.id }],
    getActor
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  };

  const images = data.profiles;

  return (
    <>
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.file_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {/* Actor Header Section */}
          <div>
            <h1>{person.name}</h1>
            <p>{person.biography}</p>
            {/* Add more actor header information here */}
          </div>

          {/* Add more actor information here if needed */}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;


// const TemplateActorPage = ({ person }) => {
//   const { data , error, isLoading, isError } = useQuery(
//     ["actorImages", { id: person.id }],
//     getActor
//   );

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (isError) {
//     return <h1>{error.message}</h1>;
//   };

//   const images = data.profiles;

//   return (
//     <>
//       <Grid container spacing={5} sx={{ padding: "15px" }}>
//         <Grid item xs={3}>
//           <div sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "space-around",
//           }}>
//             <ImageList cols={1}>
//             {images && images.map((image) => (
//   <ImageListItem key={image.file_path} cols={1}>
//     <img
//       src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
//       alt={image.file_path}
//     />
//   </ImageListItem>
// ))}

//             </ImageList>
//           </div>
//         </Grid>

//         <Grid item xs={9}>
//           {/* Actor Header Section */}
//           <div>
//             <h1>{person.name}</h1>
//             <p>{person.biography}</p>
//             {/* Add more actor header information here */}
//           </div>

//           {/* Add more actor information here if needed */}
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default TemplateActorPage;
