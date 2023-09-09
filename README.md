NetflixGPT:

Features build in this project:
* Authentication by connecting firebase with react app.
* Protected Routes
* How to handle signup and loggin forms(form handling) 
* Going to use chatGPT APIs to search for movies.

Login/Sign Up
-> Browse page( after authentication)
      -> Header
      -> Main Movie
           - Trailer in Background
           - Title & Description
           - MovieSuggestions 
            - MovieLists
-NetflixGPT
 - Search Bar
 - Movie Suggestions

-> Create react app
-> Configured Tailwind CSS
-> Header
->routing of app
->Login Form
->Sign up
->Form validation
-> useRef hook
-> firebase Setup
-> deploying our app to production
->create signup user account
->implemented signIn user api
->Authentication with firebase
   npm install firebase
   copy configuration file from fire base and create in react
   Select Authentication(based on google, github, yahoo, Email/Password)
   for hosting and deploying the app in fire base
   npm install -g firebase-tools
   firebase login
   firebase init
   ->created redux store
   -> Implemented signout
   ->update profile
   ->Added google authentication.
   Bug fixes:
   ->Sign up user displayName and profile picture update
   ->If the user not logged in redirect/browse to login page or vice-versa
   ->Fetch movies from Tmdb

   Two types of hosting:
   -->1 As soon as code pushed to github, it will automatically deploy
   -->2 deploy our app from the local.

   To deploy the project we use command,
   firebase deploy
   https://netflixgpt-8bc1a.web.app/

   use useEffect for onAuthStateChanged because we didn't call multiple times
   After initial render it will call automatically.

   -> we can't do navigation outside routing
   -> we can do by windows.location.href = path
   -> we can do routing app level and can navigate inside that

***Errors:
   Firebase cannot be loading because running scripts is disabled on this system", VSCode on Windows
   while executing command "firebase login" command