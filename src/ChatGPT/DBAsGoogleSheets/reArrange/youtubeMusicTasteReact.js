// To create a React app that finds your music taste and shows you a summary of the type of music you listen to and its score using YouTube Music APIs, you will need to do the following:

// Set up a React app using the create-react-app command or a similar tool.

// Create a new project in the Google Cloud Platform and enable the YouTube Music API.

// Obtain an API key for the YouTube Music API by following the instructions in the Google Cloud Platform documentation.

// Install the axios library, which will be used to make API calls to the YouTube Music API.

// In your React app, import axios and the API key.

// Use axios to make a GET request to the YouTube Music API to retrieve data on the songs that you have listened to. You can use the API's "recently played" endpoint to get this information.

// Use the data from the API response to determine your music taste and create a summary of the type of music you listen to and its score. This could involve counting the number of times each genre appears in the data and assigning a score based on how frequently it appears.

// Display the summary on the page using React components.

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_API_KEY";

const MusicTaste = () => {
  const [musicTaste, setMusicTaste] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call to YouTube Music API to get recently played songs
        const res = await axios.get(
          `https://music.youtube.com/youtubei/v1/recently_played?key=${API_KEY}`
        );

        // Extract data from API response
        const data = res.data.items;

        // Count the number of times each genre appears in the data
        const genreCounts = data.reduce((acc, curr) => {
          const genre = curr.song.genre;
          if (genre in acc) {
            acc[genre]++;
          } else {
            acc[genre] = 1;
          }
          return acc;
        }, {});

        // Calculate scores for each genre based on how frequently it appears
        const genreScores = Object.entries(genreCounts).map(
          ([genre, count]) => ({
            genre,
            score: count / data.length,
          })
        );

        setMusicTaste({ genreScores });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Music Taste:</h2>
      {musicTaste.genreScores.map(({ genre, score }) => (
        <div key={genre}>
          <p>Genre: {genre}</p>
          <p>Score: {score}</p>
        </div>
      ))}
    </div>
  );
};

export default MusicTaste;

// This code will make an API call to the YouTube Music API to get data on the songs that you have recently played, and then use that data to determine your music taste and create a summary of the type of music you listen to and its score. The summary is displayed on the page using a React component.
