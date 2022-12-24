// To create a screen sharing React app, you will need to use the WebRTC (Web Real-Time Communication) technology. WebRTC enables real-time communication between web browsers, and it includes features such as audio and video streaming, data transfer, and screen sharing.
// Here is a high-level overview of the steps you can follow to create a screen sharing React app:
// Set up a React project using a tool such as create-react-app.
// Install the necessary dependencies for WebRTC, such as the peerjs library, which provides an easy-to-use interface for working with WebRTC.
// Set up the user interface for your screen sharing app. This might include elements such as buttons for starting and stopping the screen sharing, as well as a video element to display the shared screen.
// Implement the WebRTC functionality for screen sharing. This will involve setting up a Peer connection and using the getUserMedia() method to access the user's screen.
// Test your app to make sure it is working as expected.
// Here is some sample code that demonstrates how you can set up a Peer connection and use the getUserMedia() method to access the user's screen in a React app:

// To add the ability to record the screen share and save it as an MP4 file, you will need to use the MediaRecorder API. The MediaRecorder API allows you to record audio and video streams, and it can save the recorded data in a variety of formats, including MP4.
// Here is a modified version of the App component that adds functionality to record the screen share and save it as an MP4 file:
import React, { useState, useEffect } from "react";
import Peer from "peerjs";

function App() {
  const [peer, setPeer] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
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

      setPeer(newPeer);
    }
  }, [screenStream]);

  function startRecording() {
    setRecording(true);
    const newRecorder = new MediaRecorder(screenStream, {
      mimeType: "video/mp4",
    });
    newRecorder.start();
    setRecorder(newRecorder);
  }

  function stopRecording() {
    setRecording(false);
    recorder.stop();
  }

  function toggleMute() {
    setMuted(!muted);
    screenStream.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  }

  function downloadRecording() {
    const recordedBlob = new Blob(recorder.recordedBlobs, {
      type: "video/mp4",
    });
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recording.mp4";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  return (
    <div>
      {screenStream && (
        <video
          style={{ width: "100%", height: "100%" }}
          srcObject={screenStream}
          autoPlay
          muted={muted}
        />
      )}
      <button onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
      {/* This code will create a full-screen video element that displays the shared
      screen. The srcObject prop of the video element is set to the
      screenStream, which is a MediaStream object that contains the audio and
      video tracks of the shared screen. The autoPlay and muted props are set to
      ensure that the video plays automatically and is muted (since the audio
      from the shared screen is not typically useful). */}
      {!recording && <button onClick={startRecording}>Start recording</button>}
      {recording && <button onClick={stopRecording}>Stop recording</button>}
      <button onClick={downloadRecording}>Download recording</button>
      {/* This code adds a muted state variable to track the mute status of the
      shared screen, and a toggleMute function that toggles the mute status and
      enables or disables the audio tracks of the screenStream accordingly. It
      also adds a button that calls the toggleMute function to allow the user to
      mute or unmute the shared screen. To integrate with Firebase, you will
      need to set up a Firebase project and install the Firebase SDK. Then, you
      can use the firebase.firestore() method to access the Firestore database
      and use the db.collection('peers').doc(newPeer.id).set() method to save
      the signal data for the peer in the database. On the other end, you can
      use the `db.collection('peers'). */}
    </div>
  );
}

export default App;
// This code adds a recorder state variable to hold a reference to the MediaRecorder object, and a recording state variable to track the recording status. It also adds three buttons: one to start the
