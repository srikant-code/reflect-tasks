// To get a list of the videos that you have added to your YouTube Watch Later playlist in a React application, you will need to use the YouTube Data API. This API allows you to access data from YouTube, including information about your Watch Later playlist.
// Here is an example of how you could use the YouTube Data API to get a list of the videos in your Watch Later playlist in a React application:
// First, you will need to obtain an API key from the Google Cloud Console. This key will be used to authenticate your requests to the YouTube Data API.
// Install the google-api-client library using npm:
// npm install google-api-client

import React from "react";
import { google, youtube_v3 } from "googleapis";

const YOUR_API_KEY = "YOUR_API_KEY";
const YOUR_WATCH_LATER_PLAYLIST_ID = "YOUR_WATCH_LATER_PLAYLIST_ID";

const youtube = google.youtube({
  version: "v3",
  auth: YOUR_API_KEY,
});

function WatchLaterList() {
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    async function fetchVideos() {
      // Use the playlistItems.list method to retrieve the list of videos in your Watch Later playlist. This method requires the playlistId parameter, which is the ID of your Watch Later playlist. You can find this ID by going to your Watch Later playlist on YouTube and looking at the URL. The ID will be the value of the list parameter.
      const res = await youtube.playlistItems.list({
        part: "snippet",
        playlistId: YOUR_WATCH_LATER_PLAYLIST_ID,
      });
      setVideos(res.data.items);
    }
    fetchVideos();
  }, []);

  return (
    <ul>
      {videos.map((video) => (
        <li key={video.id}>
          {/* The videos variable now contains an array of objects, each
          representing a video in your Watch Later playlist. You can access the
          video information, such as the title and thumbnail, using the
          properties of each object. */}
          <img
            src={video.snippet.thumbnails.default.url}
            alt="Video thumbnail"
          />
          <p>{video.snippet.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default WatchLaterList;

// Make sure to replace YOUR_API_KEY and YOUR_WATCH_LATER_PLAYLIST_ID with your own API key and playlist ID, respectively.
