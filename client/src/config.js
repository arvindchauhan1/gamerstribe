// export { BASE_URL };
let BASE_URL = "http://localhost:4000/";

const production = true;

if (production) {
  BASE_URL = "/";
}

export { BASE_URL };
