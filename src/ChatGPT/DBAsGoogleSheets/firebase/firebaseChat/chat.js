// To create a full chat feature using Firebase and React, you can follow these steps:
// Set up a Firebase project and install the Firebase SDK in your React project. You can do this by going to the Firebase website, creating a new project, and following the instructions to set up Firebase in your React project.
// Create a Firebase Realtime Database to store your chat messages. In the Firebase console, go to the Database section and create a new Realtime Database.
// Design your chat interface. This will involve creating a React component that displays the chat messages and a form for sending new messages.
// Implement the functionality to send and receive messages. You can do this by using the Firebase Realtime Database API to read and write data to the database.
// Add authentication to your chat feature. You can use Firebase's authentication service to allow users to sign in with their email address and password, or with a third-party authentication provider such as Google or Facebook.
// Test and deploy your chat feature. Make sure to test your chat feature thoroughly before deploying it to ensure that it works as expected. You can use Firebase's hosting service to deploy your chat feature to the web.
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Login from "./Login";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          setUser(result.user);
        }
      });
  }, []);

  useEffect(() => {
    // Get a reference to the Realtime Database
    const db = firebase.database();
    // Create a reference to the messages node
    const messagesRef = db.ref("messages");
    // Listen for changes to the messages node and update the state
    messagesRef.on("value", (snapshot) => {
      setMessages(snapshot.val());
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // Get a reference to the Realtime Database
    const db = firebase.database();
    // Create a reference to the messages node
    const messagesRef = db.ref("messages");
    // Push the new message to the messages node
    messagesRef.push({
      text: formValue,
      author: user.displayName,
      profilePictureUrl: user.photoURL,
      timestamp: Date.now(),
    });
    // Clear the form value
    setFormValue("");
  }

  // To add file upload functionality to your chat feature, you can use Firebase's Cloud Storage service to store the uploaded files. Here is an example of how you can do this:
  // Set up a Cloud Storage bucket in the Firebase console. In the "Storage" section, click the "Get started" button to create a new bucket.
  // Install the firebase-storage package in your project.
  // Modify the Chat component to include a file input field and a button to upload the selected file:
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  // In this example, the handleFileChange function is called when the file input field is changed and updates the file state variable with the selected file. The handleFileUpload function is called when the "Upload" button is clicked and uses the put method from the firebase-storage library to upload the file to the Cloud Storage bucket.
  function handleFileUpload() {
    // Get a reference to the Cloud Storage bucket
    const bucket = storage().ref();
    // Generate a unique filename for the uploaded file
    const filename = `${Date.now()}-${file.name}`;
    // Create a reference to the file in the bucket
    const fileRef = bucket.child(filename);
    // Upload the file to the bucket
    fileRef.put(file).then(() => {
      console.log("File uploaded successfully");
      // Get the URL of the uploaded file
      fileRef.getDownloadURL().then((url) => {
        console.log(url);
        // Add the file to the chat messages
        const db = firebase.database();
        const messagesRef = db.ref("messages");
        messagesRef.push({
          text: "",
          author: firebase.auth().currentUser.email,
          fileUrl: url,
          filename: file.name,
          timestamp: Date.now(),
        });
      });
    });
  }

  const user = firebase.auth().currentUser;
  if (!user) {
    return <Login />;
  }

  function handleSignOut() {
    firebase.auth().signOut();
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.timestamp}>
          {message.fileUrl ? (
            <a href={message.fileUrl} download={message.filename}>
              {message.filename}
            </a>
          ) : (
            <p>{message.text}</p>
          )}
          <p>{message.author}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
        <button type="button" onClick={handleFileUpload}>
          Upload
        </button>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default Chat;

// This code creates a Chat component that displays a list of messages and a form for sending new messages. The useEffect hook is used to listen for changes to the messages node in the Realtime Database and update the component's state with the latest messages. The handleSubmit function is called when the form is submitted and pushes a new message to the messages node in the Realtime Database.
// Keep in mind that this is just a basic example, and you may need to customize the code to fit your specific requirements. For example, you may want to add authentication to allow only authenticated users to send messages, or you may want to add additional features such as the ability to delete messages.
