// To create a feedback system in React and Node, you will need to perform the following steps:

// Set up a basic React application using a tool such as create-react-app.

// Create a form in your React application that allows users to submit feedback. The form should include input fields for the user's name, email, and feedback message.

// Create a Node.js server that will handle the submission of feedback from the form. You can do this using a framework such as Express.

// Set up a database to store the feedback submissions. You can use a database such as MongoDB or MySQL for this purpose.

// Modify your Node server to store the feedback submissions in the database. You will need to use a database library such as Mongoose or Sequelize to connect to the database and save the submissions.

// Create an admin panel in your React application that displays all of the feedback submissions. You can use a library such as React-Table to display the data in a table.

// Modify your Node server to fetch the feedback submissions from the database and send them to the admin panel. You will need to create a route that sends a GET request to the server and returns the feedback data.


// To use Firebase as the database for your feedback system and store user data, you will need to perform the following steps:

// Set up a Firebase project and create a Firestore database. Follow the instructions in the Firebase documentation to set up a Firebase project and create a Firestore database.

// Install the Firebase SDK in your Node.js server. Run the following command to install the Firebase SDK:
npm install firebase

// SERVER
const express = require('express');
const firebase = require('firebase');

const app = express();

// Initialize the Firebase SDK
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

firebase.initializeApp(firebaseConfig);

// Set up the middleware to parse request bodies as JSON
app.use(express.json());

// Create a route to handle feedback submissions
app.post('/submit-feedback', (req, res) => {
  const feedback = req.body;
  const feedbackCollection = firebase.firestore().collection('feedback');
  feedbackCollection.add(feedback).then(() => {
    res.send('Feedback submitted successfully');
  }).catch(err => {
    res.send(err);
  });
});

// Create a route to retrieve all feedback submissions
app.get('/get-feedback', (req, res) => {
  const feedbackCollection = firebase.firestore().collection('feedback');
  feedbackCollection.get().then(snapshot => {
    const feedback = [];
    snapshot.forEach(doc => {
      feedback.push(doc.data());
    });
    res.send(feedback);
  }).catch(err => {
    res.send(err);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// This server has two routes: /submit-feedback, which handles POST requests and stores the request body (which should contain the feedback data) in the Firestore database, and /get-feedback, which handles GET requests and retrieves all of the feedback submissions from the database.

// React code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-table';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the feedback submissions from the server
    axios.get('/get-feedback').then(res => {
      setFeedback(res.data);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // Submit the feedback to the server
    axios.post('/submit-feedback', { name, email, message }).then(res => {
      console.log(res);
      setName('');
      setEmail('');
      setMessage('');
    });
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h1>Admin Panel</h1>
      <Table data={feedback} columns={[
        {
          Header: 'Name',
          accessor: 'name'
        },
        {
          Header: 'Email',
          accessor: 'email'
        },
        {
          Header: 'Message',
          accessor: 'message'
        }
      ]} />
    </div>
  );
};

export default Feedback;
// This component has a form that allows users to enter their name, email, and message, and a submit button to send the feedback to the server. It also has a table that displays the feedback submissions using the react-table library. The component fetches the feedback submissions from the server when it mounts, and updates the feedback state with the retrieved data. When the form is submitted, it sends a POST request to the server with the feedback data.