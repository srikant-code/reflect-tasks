// To get the current music playing in Spotify in a React application, you can use the Spotify Web Playback SDK. This is a JavaScript library that allows you to control playback of Spotify tracks and receive real-time events from the player.

// Here is an example of how you can use the Spotify Web Playback SDK in a React application:

// First, you will need to install the spotify-web-playback-sdk package:
// npm install spotify-web-playback-sdk

// To get the current music playing, you can use the getCurrentState method of the SpotifyPlayer instance:
// this.player.getCurrentState().then(state => {
//   if (state) {
//     console.log('Currently playing:', state.track_window.current_track.name);
//   }
// });

// Note that you will need to have a valid OAuth token to use the Spotify Web Playback SDK. You can get an OAuth token by redirecting the user to the Spotify authorization page and then exchanging the authorization code for an access token on your backend server. You can find more information about the authorization process in the Spotify Web Playback SDK documentation.
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#authentication

// To use the Spotify Web Playback SDK, you will need to register your application with Spotify and obtain a client ID. You can do this by going to the Spotify Developer Dashboard (https://developer.spotify.com/dashboard/login) and creating a new project.

// In order to use the Spotify Web Playback SDK, you will need to include the spotify-player.js script in your HTML file:
// <script src="https://sdk.scdn.co/spotify-player.js"></script>

// To control playback, you can use the following methods of the SpotifyPlayer instance:
// play(trackUri: string): plays the specified track
// pause(): pauses playback
// resume(): resumes playback
// seek(positionMs: number): seeks to the specified position in the current track
// previousTrack(): plays the previous track in the queue
// nextTrack(): plays the next track in the queue
// You can also register event listeners to receive updates about the player state. For example, you can use the onPlayerStateChanged event to get notified when the player state changes:

import React, { useEffect, useState } from "react";
import { SpotifyPlayer } from "spotify-web-playback-sdk";

const MyComponent = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Initialize the Spotify player
    const player = new SpotifyPlayer({
      name: "My Player",
      getOAuthToken: (cb) => {
        // You can get the OAuth token by calling an endpoint on your backend server
        fetch("/api/spotify/oauth-token")
          .then((res) => res.json())
          .then(({ token }) => {
            cb(token);
          });
      },
    });

    // Connect to the player
    player.connect().then((success) => {
      if (success) {
        console.log("Successfully connected to Spotify!");
      }
    });

    // Register event listeners
    player.onPlayerStateChanged((state) => {
      console.log("Player state changed:", state);
    });

    setPlayer(player);

    // Disconnect from the player when the component unmounts
    return () => player.disconnect();
  }, []);

  const playTrack = (trackUri) => {
    player.play(trackUri).then(() => {
      console.log("Playing track:", trackUri);
    });
  };

  const pause = () => {
    player.pause().then(() => {
      console.log("Paused playback");
    });
  };

  const resume = () => {
    player.resume().then(() => {
      console.log("Resumed playback");
    });
  };

  const seek = (positionMs) => {
    player.seek(positionMs).then(() => {
      console.log(`Seeked to position ${positionMs}`);
    });
  };

  const previousTrack = () => {
    player.previousTrack().then(() => {
      console.log("Playing previous track");
    });
  };

  const nextTrack = () => {
    player.nextTrack().then(() => {
      console.log("Playing next track");
    });
  };

  return (
    <div>
      {player && (
        <SpotifyPlayer
          player={player}
          view={"list"}
          theme={"white"}
          width={"100%"}
          height={80}
        />
      )}
      <button onClick={() => playTrack("spotify:track:7xGfFoTpQ2E7fRF5lN10tr")}>
        Play track
      </button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => seek(30000)}>Seek 30s</button>
      <button onClick={previousTrack}>Previous track</button>
      <button onClick={nextTrack}>Next track</button>
    </div>
  );
};
