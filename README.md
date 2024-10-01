# RunTheCity 🏃‍♂️🌆

this project is my submission to the learn-2-build hackathon

[https://learn-2-build-hackathon.devpost.com](https://learn-2-build.devpost.com/)

## Overview

**RunTheCity** is an app designed to turn your business trips and vacations into active explorations. Whether you're a fitness enthusiast, a casual jogger, or someone who just wants to see the best of a city while staying active, RunTheCity helps you explore urban landscapes through running routes. The app is tailored to help you stay fit while discovering landmarks in different cities.

## Tech Stack

- React.js, Vite, Tailwind CSS, Node.js, MongoDB, Clerk, Mapbox API, Geolocation API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/samanthacabrera/learn2build.git
   ```

2. Install frontend dependencies:
   ```bash
   cd learn2build
   npm install
   ```
3. Set up enviornment variables:
   - Create a .env file in the root directory and add your Mapbox API token and Clerk keys.
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token
   VITE_CLERK_FRONTEND_API=your_clerk_frontend_api_key
   ```
4. Start frontend server:
   ```bash
   npm run dev
   ```
5. Start backend server:
   ```bash
   cd ..
   cd server
   node index.js
   ```

Before accessing the application, make sure that both the backend and frontend servers are running. Once both servers are running, open your web browser and navigate to [http://localhost:3000](http://localhost:3000). This URL will load the Recipe Roots platform where you can interact with the application.
