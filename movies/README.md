Ideas:
Change fonts all over 
Create logo and add it to the top and to the filter card
adjust the favourite logo 
create a watchlist 
add credits with photos to movie pages
create a hero image that slides with photos of different movies - directs to movie pages

npm install - npm start - npm install semantic-ui-css semantic-ui-react

# Assignment 1 - ReactJS app.

Name: Juliana Wong Mendonca
Student Number: 20095922

## Overview.
This is the movie app 

### Features.

## New pages.
+ 1. Upcoming movies page - Using the Movielist template
+ 2. Now playing movies page - Using the Movielist template
+ 3. Top Rated movies page - Using the Movielist template
+ Upcoming movies calendar 
> A page that shows upcoming movies in chronological ascending order grouped by year and month. (Important to keep in mind that unfortunately TMDB upcoming endpoint has an inaccurate list of movies that are coming out, hence the separation by year)
> *Features:* * Link to Movie Details: The movie details button is a link that redirects to a page with more information about the movie.
        > The page fetches upcoming movies from an API using the getUpcomingMovies function. Using the same variable from the Upcoming movies page
        > Semantic UI's segment, button and container 
        > Grouping the movies by year and month - The accumulator variable is used in the reduce method to group upcoming movies by their release year and month


## Styling changes 
1. Montserrat font added all over the web app, in some cases using ThemeProvider and others directly in the elements
2. Changed the arrow colours from primary to color:"#0d253f"
2. **Site header:**
> Updated the colour to match TMDB's theme colours. 
>Added the TMDB logo on the left side, and linked it to the home page. 
3. **Filter card:**
> Changed the layout from the same format of the movie poster to an In-line layout. 
>Changed the background from yellow to a gradient featuring TMDB's theme colours ( I used https://cssgradient.io/ to generate the exact gradient code). 
>Removed the image. Adjusted the size of the text boxes to make sure the layout was kept in line.
4. **Movie card:**  
> Addition of the circle with the audience score of the movie - depending on the percentage the color of the stroke of the circle changes 
> changed button from MUI to SemanticUI one and the background is the TMDB gradient.
> Removed the vote count and the star.
5. **Movie details**
> Swapped the Paper element to a container one
>Grid for the display of the cast, crew and recommendations - Bold for the Character/Job and Not bold for Name. 
> Fab and X Icon for the Share on Twitter button 
6. **Homepage**
> Hero image + Hero text 


### New features in existing pages 
**Movie header** 
>Changed the link to the movie homepage from the house icon to the title of the movie

**Filter Card**
> *New filters*
> > Year filter: 
>>>It allows users to filter movies based on their release year.
>>>Implemented using a TextField component where users can input a release year.
>>>The input value triggers the handleYearChange function, updating the state with the new year filter value.
>>>The TextField restricts input to numbers only and sets a maximum length of 4 digits.

>> Rating filter: 
>>>Enables users to filter movies by a minimum rating.
>>>Another TextField component is added for users to input the minimum rating.
>>>The handleRatingChange function verifies the input, then updates the state with the new rating filter value.
>>>Input is restricted to numbers only, with a maximum length of 1 character to allow ratings from 0 to 9.

**Movie Details**
>*Cast and Crew:*
>>Fetching Data:
>>>Cast and crew data are fetched from the TMDB API using the same API link, however the two are present in a different way as *cast* and *crew*

>>Displaying Data:
>>>Cast and crew information is displayed using a grid layout.
>>>For each cast/crew member, their profile image, name, and character/job title are displayed.
>>>Conditional rendering ensures that only cast/crew members with profile images are displayed. A lot of photos were unavailable and I hated that.

>*Recommendations*
>>Recommendations are wrapped in <Link> components from react-router-dom to redirect users to the respective movie pages within the app when clicked.
>> Movie recommendations are fetched from the TMDB API using a specific endpoint for the given movie. Therefore, some movies do not have proper recommendations 

>*Twitter sharing*
>>The handleTwitterShare function builds a tweet message containing the movie's title and a link to its page on TMDB website. The message is 'I'm kinda obsessed with ${movie.title}❤️✨📽🎞 Check it out at ${tmdbLink}'. 
>>>"I'm kinda obsessed with Her❤️✨📽🎞 Check it out at https://www.themoviedb.org/movie/152601"
>>It utilizes the window.open method to open a new browser window with a Twitter intent link.


**Homepage**



+ Changed the font all over the website to Montserrat
+ 
+ etc

## Setup requirements.
- npm install 
- npm start 
- npm install semantic-ui-css semantic-ui-react


## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

e.g.
+ Discover list of movies - discover/movie


+ Movie details - movie/:id


+ Movie genres = /genre/movie/list


https://imgur.com/a/h8ksp4l - cast & crew

## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /blogs - displays all published blogs.
+ /blogs/:id - displays a particular blog.
+ /blogs/:id/comments - detail view of a particular blog and its comments.
+ etc.

[If relevant, state what aspects of your app are protected (i.e. require authentication) and what is public.]

## Independent learning (If relevant).

https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
https://www.javatpoint.com/random-image-generator-in-javascript
https://www.youtube.com/watch?v=Ynp6Gdd3XVE&ab_channel=JamesQQuick
https://react.semantic-ui.com/
https://www.shecodes.io/athena/67661-how-to-change-background-color-based-on-time-of-day-with-javascript (color changing based on features)

Upcoming movie calendar page: 
https://www.w3schools.com/jsref/jsref_getfullyear.asp
https://www.w3schools.com/jsref/jsref_getmonth.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce - accumulator object 
