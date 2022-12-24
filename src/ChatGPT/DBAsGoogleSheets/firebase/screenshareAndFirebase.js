// To create a screen sharing React app, you will need to use the WebRTC (Web Real-Time Communication) technology. WebRTC enables real-time communication between web browsers, and it includes features such as audio and video streaming, data transfer, and screen sharing.
// Here is a high-level overview of the steps you can follow to create a screen sharing React app:
// Set up a React project using a tool such as create-react-app.
// Install the necessary dependencies for WebRTC, such as the peerjs library, which provides an easy-to-use interface for working with WebRTC.
// Set up the user interface for your screen sharing app. This might include elements such as buttons for starting and stopping the screen sharing, as well as a video element to display the shared screen.
// Implement the WebRTC functionality for screen sharing. This will involve setting up a Peer connection and using the getUserMedia() method to access the user's screen.
// Test your app to make sure it is working as expected.
// Here is some sample code that demonstrates how you can set up a Peer connection and use the getUserMedia() method to access the user's screen in a React app:

import React, { useState, useEffect } from "react";
import Peer from "peerjs";
import firebase from "firebase/app";
import "firebase/firestore";

function App() {
  const [peer, setPeer] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    async function getScreen() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          mediaSource: "screen",
        },
      });
      setScreenStream(stream);
    }

    getScreen();
  }, []);

  useEffect(() => {
    if (screenStream) {
      const newPeer = new Peer({
        initiator: true,
        stream: screenStream,
      });

      newPeer.on("signal", (data) => {
        // send the signal data to the peer you want to connect with
        // you can use Firebase to send the data to the other peer
        const db = firebase.firestore();
        db.collection("peers").doc(newPeer.id).set({
          signal: data,
        });
      });

      newPeer.on("stream", (stream) => {
        // display the shared screen in a video element
        setScreenStream(stream);
      });

      setPeer(newPeer);
    }
  }, [screenStream]);

  function toggleMute() {
    setMuted(!muted);
    screenStream.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {screenStream && (
        <video
          style={{ width: "100%", height: "100%" }}
          srcObject={screenStream}
          autoPlay
          muted={muted}
        />
      )}
      <button onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
    </div>
  );
}

export default App;
// This code will create a full-screen video element that displays the shared screen. The srcObject prop of the video element is set to the screenStream, which is a MediaStream object that contains the audio and video tracks of the shared screen. The autoPlay and muted props are set to ensure that the video plays automatically and is muted (since the audio from the shared screen is not typically useful).
// This code adds a muted state variable to track the mute status of the shared screen, and a toggleMute function that toggles the mute status and enables or disables the audio tracks of the screenStream accordingly. It also adds a button that calls the toggleMute function to allow the user to mute or unmute the shared screen.
// To integrate with Firebase, you will need to set up a Firebase project and install the Firebase SDK. Then, you can use the firebase.firestore() method to access the Firestore database and use the db.collection('peers').doc(newPeer.id).set() method to save the signal data for the peer in the database. On the other end, you can use the `db.collection('peers').
