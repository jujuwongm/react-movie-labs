Ideas:
Change fonts all over 
Create logo and add it to the top and to the filter card
adjust the favourite logo 
create a watchlist 
add credits with photos to movie pages
create a hero image that slides with photos of different movies - directs to movie pages

npm install - npm start - npm install semantic-ui-css semantic-ui-react

# Assignment 1 - ReactJS app.

- Name: Juliana Wong Mendonca
- Student Number: 20095922

## Overview.
The Movie app is an app that allows users to search for movies, see which ones are at the top of the ratings, and discover new ones. It also has a movie details page with details about the film, including its budget and genre, the cast and crew, and recommendations for related movies. Users can filter movies based on rating, genre, and year of release. Users can view upcoming movies in chronological order on the upcoming calendar page. Users can view ~~all Godfather movies~~ the top rated movies on TMDB.

### Features.

# New pages
+ Upcoming movies page - Using the Movielist template
+ Now playing movies page - Using the Movielist template
+ Top Rated movies page - Using the Movielist template
+ Upcoming movies calendar
- A page that shows upcoming movies in chronological ascending order grouped by year and month. (Important to keep in mind that unfortunately TMDB upcoming endpoint has an inaccurate list of movies that are coming out, hence the separation by year)
-- **Features:**
--- Link to Movie Details: The semantic ui movie details button is a link that redirects to a page with more information about the movie.
    - The page fetches upcoming movies from an API using the getUpcomingMovies function. Using the same variable from the Upcoming movies page
    - Semantic UI's segment, button and container
    - Grouping the movies by year and month - The accumulator variable is used in the reduce method to group upcoming movies by their release year and month

# Styling changes
+ Montserrat font added all over the web app, in some cases using ThemeProvider and others directly in the elements
+ Changed the arrow colours from primary to color:"#0d253f"
+ Use of semantic UI react in different pages
## Site header:
- Updated the colour to match TMDB's theme colours.
- Added the TMDB logo on the left side, and linked it to the home page.
## Filter card:
- Changed the layout from the same format of the movie poster to an In-line layout.
- Changed the background from yellow to a gradient featuring TMDB's theme colours (I used [cssgradient.io](https://cssgradient.io/) to generate the exact gradient code).
- Removed the image. Adjusted the size of the text boxes to make sure the layout was kept in line.
## Movie card:
- Addition of the circle with the audience score of the movie - depending on the percentage the color of the stroke of the circle changes
- Changed button from MUI to SemanticUI one and the background is the TMDB gradient.
- Removed the vote count and the star.
## Movie details
- Swapped the Paper element to a container one
- Grid for the display of the cast, crew and recommendations - Bold for the Character/Job and Not bold for Name.
- Fab and X Icon for the Share on Twitter button
## Homepage
- Hero image + Hero text

# New features in existing pages
## Site header
- Changed the link to the movie homepage from the house icon to the title of the movie
`<a href="/" style={{ textDecoration: 'none' }}>     </a>`
## Filter Card
### New filters
#### Year filter:
- It allows users to filter movies based on their release year.
- Implemented using a TextField component where users can input a release year.
- The input value triggers the handleYearChange function, updating the state with the new year filter value.
- The TextField restricts input to numbers only and sets a maximum length of 4 digits.

#### Rating filter:
- Enables users to filter movies by a minimum rating.
- Another TextField component is added for users to input the minimum rating.
- The handleRatingChange function verifies the input, then updates the state with the new rating filter value.
- Input is restricted to numbers only, with a maximum length of 1 character to allow ratings from 0 to 9.


## Movie Details
### Cast and Crew:
#### Fetching Data:
- Cast and crew data are fetched from the TMDB API using the same API link, however, the two are present in a different way as *cast* and *crew*
#### Displaying Data:
- Cast and crew information is displayed using a grid layout.
- For each cast/crew member, their profile image, name, and character/job title are displayed.
- Conditional rendering ensures that only cast/crew members with profile images are displayed. A lot of photos were unavailable and I hated that.
### Recommendations
- Recommendations are wrapped in <Link> components from react-router-dom to redirect users to the respective movie pages within the app when clicked.
- Movie recommendations are fetched from the TMDB API using a specific endpoint for the given movie. Therefore, some movies do not have proper recommendations
### Twitter sharing
- The handleTwitterShare function builds a tweet message containing the movie's title and a link to its page on TMDB website. The message is `I'm kinda obsessed with ${movie.title}❤️✨📽🎞 Check it out at ${tmdbLink}`;.
> I'm kinda obsessed with Road House❤️✨📽🎞 Check it out at https://www.themoviedb.org/movie/359410 
- It utilizes the window.open method to open a new browser window with a Twitter intent link.

## Homepage
### Hero Image Randomizer:
- Displays a different background image each time.
- `const randomIndex = Math.floor(Math.random() * movies.length);`
- Generates a random index within the range of the movie list's length. This index is used to select a random movie from the list.
- `const heroMovie = movies[randomIndex];`
    - Retrieves the movie object from the list using the randomly generated index.
    - The URL of the backdrop image is obtained from the backdrop_path property of the heroMovie object.

### Pagination
- Items per page: 8
- Used the pagination element alongside the variables pagecount and currentpage.


## Movie card
### Percentage circles:
- Visually represent the audience score percentage of each movie on the movie card.
- The percentage is calculated based on the movie's vote_average * 10 and then add a % symbol
- The stroke color of the circle dynamically changes based on the percentage range. Under 60 shows red, between 60 and 73 is yellow and under 60 is red.
   `if (percentage < 60) {
    strokeColor = '#B2042F'; //green
  } else if (percentage >= 60 && percentage <= 73) {
    strokeColor = '#EDD300'; //yellow
  } else {
    strokeColor = '#90cea1'; //red
  }`


# Setup requirements.
-   npm install 
-   npm start 
-   npm install semantic-ui-css semantic-ui-react


# API endpoints.

### Homepage
+ **Hero Image** - https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}
    -- More information: https://developer.themoviedb.org/docs/image-basics

### Movie details

- **Cast** 
 https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}
 - **Crew** 
https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY} 
+ *Images* 
https://image.tmdb.org/t/p/w200${person.profile_path}
> Despite coming from the same endpoint, I found it easier to fetch the endpoint twice, since in the database itself, the cast and crew are store in different collections. In this image, you can see how they are stored: https://imgur.com/a/h8ksp4l 

 - **Recommendations** 
  https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}
+ *Images*
https://image.tmdb.org/t/p/w200${recommendation.poster_path}


### Now playing
- (Inaccurate) List of movies that are currently in theatres
https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1

## Upcoming
- (Inaccurate) List of movies that are being released soon.
https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&sort_by=release_date.asc


## Top Rated
- List of movie ordered by vote count average 
https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&sort_by=vote_average.desc

## Routing.

+ **Now Playing in Cinemas**
    path="/movies/playing"  - Movies currently in the cinemas
 + **Upcoming movies page with posters**
    path="/movies/upcoming"  Movies being released soon 
+ **Upcoming movies calendar**
    path="/movies/calendar" - Calendar of Upcoming movies grouped by year and month
+  **Top Rated**
path="/movies/toprated" - Top rated by users movies 

## Independent learning (If relevant).

- https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
- https://www.javatpoint.com/random-image-generator-in-javascript
- https://www.youtube.com/watch?v=Ynp6Gdd3XVE&ab_channel=JamesQQuick
- https://react.semantic-ui.com/
- https://www.shecodes.io/athena/67661-how-to-change-background-color-based-on-time-of-day-with-javascript (color changing based on features)


+ Upcoming movie calendar page: 
- https://www.w3schools.com/jsref/jsref_getfullyear.asp
- https://www.w3schools.com/jsref/jsref_getmonth.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce - accumulator object 
