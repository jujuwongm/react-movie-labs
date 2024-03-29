// import React, { useState, useEffect } from "react";
// import Drawer from "@mui/material/Drawer";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Chip from "@mui/material/Chip";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Fab from "@mui/material/Fab";
// import NavigationIcon from "@mui/icons-material/Navigation";
// import { Link } from "react-router-dom";

// const theme = createTheme({
//   typography: {
//     fontFamily: ["Montserrat", "Arial"].join(","),
//   },
// });

// const root = {
//   display: "flex",
//   justifyContent: "center",
//   flexWrap: "wrap",
//   listStyle: "none",
//   padding: 1.5,
//   margin: 0,
// };

// const chip = { margin: 0.5, background: "#0d253f", color: "white" };

// const ActorPage = ({ actor }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [actorInfo, setActorInfo] = useState(null); // State to store actor information

//   useEffect(() => {
//     const fetchActorInfo = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/person/${actor.id}?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
//         );
//         if (!response.ok) {
//           throw new Error('Failed to fetch actor information');
//         }
//         const data = await response.json();
//         // Update actorInfo state with fetched data
//         setActorInfo(data);
//       } catch (error) {
//         console.error('Error fetching actor information:', error);
//         // Handle error, e.g., display an error message to the user
//       }
//     };

//     if (actor.id) {
//       fetchActorInfo();
//     }
//   }, [actor.id]);

//   return (
//     <ThemeProvider theme={theme}>
//       {/* Render actor information using actorInfo state */}
//       {actorInfo && (
//         <div>
//           <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
//             {actorInfo.name}
//           </Typography>
//           {/* Render other actor information using actorInfo */}
//         </div>
//       )}

//       {/* Additional JSX for rendering actor information */}
//     </ThemeProvider>
//   );
// };

// export default ActorPage;
