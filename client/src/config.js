// let BASE_URL = "https://post-it-heroku.herokuapp.com/";
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   BASE_URL = "http://localhost:4000/";
// }

// export { BASE_URL };
let BASE_URL = "";

// Check if the app is running in development or production environment
if (process.env.NODE_ENV === "development") {
  // Use localhost when in development mode
  BASE_URL = `http://localhost:${process.env.PORT}/`;
} else {
  // Use the relative URL when in production mode
  BASE_URL = "/";
}

export { BASE_URL };
