# GamersTribe

GamersTribe is a web application designed to connect gamers worldwide. It allows users to create and share posts, search for other gamers, and communicate through a messenger feature. This project is built with a React front-end and an Express back-end.

## Table of Contents

- [GamersTribe](#gamerstribe)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Live Demo](#live-demo)

## Features

- **User Authentication:** Sign up and log in to access all features.
- **Create Posts:** Share your thoughts and updates with other gamers.
- **Explore Posts:** Browse posts from other gamers.
- **User Profiles:** View and edit your profile.
- **Search:** Find other gamers and posts.
- **Messenger:** Real-time chat with other users.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/arvindchauhan1/gamerstribe
   cd gamerstribe
   ```

2. **Backend Setup:**

   ```sh
   npm install
   ```

3. **Frontend Setup:**

   ```sh
   cd client
   npm install
   ```

4. **Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGO_URI=mongodb://127.0.0.1:27017/gamers-tribe
   TOKEN_KEY=your-secret-key
   PORT=4000
   NODE_ENV=production
   ```

## Usage

1. **Run the backend server:**

   ```sh
   npm run server
   ```

2. **Run the frontend app:**

   ```sh
   cd client
   npm start
   ```

3. **Build the frontend app:**

   ```sh
   npm run build
   ```

## Technologies Used

- **Frontend:**

  - React
  - Material-UI
  - React Router
  - Socket.io-client

- **Backend:**
  - Express
  - Mongoose
  - JWT
  - Socket.io

## Contributing

We welcome contributions to GamersTribe! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add your feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Live Demo

Check out the live demo of GamersTribe [here](https://gamerszoo.onrender.com/).
