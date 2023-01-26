// create a react app which finds my music taste and shows me my summary using spotify APIs

// To create a React app that finds your music taste and displays a summary of the types of music you listen to and their scores using Spotify APIs, you will need to follow these steps:

// Set up a Spotify developer account and create a new application. This will give you access to the Spotify API, which you will use to retrieve data about your music taste.

// Install the necessary libraries and dependencies for your React app. You will need to install React, as well as any other libraries or dependencies that you plan to use in your app.

// Authenticate your app with the Spotify API. You will need to obtain an access token that allows your app to access the API. You can do this by following the authorization guide provided by Spotify.

// Use the Spotify API to retrieve data about your music taste. You can use various API endpoints to retrieve data about your playlists, tracks, and artists. You can also use the API to search for specific tracks or artists.

// Process the data to determine the types of music you listen to and their scores. You will need to analyze the data and determine the types of music you listen to and their scores based on your listening history.

// Display the data in your React app. Use React components to display the data in a user-friendly way. You can use charts or other visualizations to help summarize your music taste.

// Test your app and make any necessary adjustments. Test your app to make sure it is working as expected, and make any necessary adjustments to improve its functionality.

// Here is some sample code that demonstrates how you could use the Spotify API and React to create an app that finds your music taste and displays a summary of the types of music you listen to and their scores:

import React, { useState, useEffect } from "react";

function MusicTasteSummary() {
  const [summary, setSummary] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtain an access token from the Spotify API
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      try {
        // Use the access token to retrieve data about your music taste
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        // Process the data to determine the types of music you listen to and their scores
        const musicTypes = {};
        data.items.forEach((item) => {
          if (item.genres.length > 0) {
            item.genres.forEach((genre) => {
              if (genre in musicTypes) {
                musicTypes[genre] += item.popularity;
              } else {
                musicTypes[genre] = item.popularity;
              }
            });
          }
        });
        setSummary(musicTypes);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <h1>Music Taste Summary</h1>
      {/* Display the summary data in a user-friendly way */}
      {Object.keys(summary).map((key) => (
        <p>
          {key}: {summary[key]}
        </p>
      ))}
    </div>
  );
}

export default MusicTasteSummary;
