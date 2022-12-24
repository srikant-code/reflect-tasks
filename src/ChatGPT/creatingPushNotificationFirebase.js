// Here is an example of a new function that uses the Firebase Cloud Messaging (FCM) API to send push notifications to the browser when a to-do item's deadline is approaching:
import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyCQzQ2nT1TcW1-vL3qoKxlX9K9Y4e4p6C4",
  authDomain: "my-todo-list-project.firebaseapp.com",
  databaseURL: "https://my-todo-list-project.firebaseio.com",
  projectId: "my-todo-list-project",
  storageBucket: "my-todo-list-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghijklmnopqrstuvwxyz",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const database = firebase.database();
const todosRef = database.ref("todos");

export function setupDeadlineNotifications() {
  // Request permission to show notifications
  messaging
    .requestPermission()
    .then(() => {
      console.log("Notification permission granted.");

      // Get the token that identifies this device
      messaging.getToken().then((token) => {
        console.log("FCM token:", token);

        // Save the token to the database
        todosRef.child("fcmTokens").child(token).set(true);
      });
    })
    .catch((err) => {
      console.log("Unable to get permission to notify.", err);
    });

  // Handle incoming messages
  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    alert(payload.notification.body);
  });
}

//This function first requests permission from the user to show notifications, and then retrieves the FCM token that identifies the device. It saves the token to the Firebase database so that it can be used to send push notifications to the device.
// The function also sets up a listener for incoming messages and displays an alert with the notification body when a message is received.
// To send a push notification when a to-do item's deadline is approaching, you can set up a function that listens for changes to the todos reference in Firebase and sends a notification if the deadline is within a certain time period. Here is an example of such a function:

import firebase from "firebase/app";
import "firebase/database";

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyCQzQ2nT1TcW1-vL3qoKxlX9K9Y4e4p6C4",
  authDomain: "my-todo-list-project.firebaseapp.com",
  databaseURL: "https://my-todo-list-project.firebaseio.com",
  projectId: "my-todo-list-project",
  storageBucket: "my-todo-list-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghijklmnopqrstuvwxyz",
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const todosRef = database.ref("todos");
const fcmTokensRef = database.ref("fcmTokens");

export function listenForDeadlineApproaching() {
  todosRef.on("value", (snapshot) => {
    const todos = snapshot.val();

    todos.forEach((todo) => {
      if (todo.deadline) {
        const deadline = new Date(todo.deadline);
        const timeUntilDeadline = deadline.getTime() - Date.now();
        const timeUntilDeadlineMinutes = Math.ceil(
          timeUntilDeadline / (1000 * 60)
        );

        // Send a notification if the deadline is within one hour
        if (timeUntilDeadlineMinutes <= 60) {
          fcmTokensRef.once("value").then((snapshot) => {
            const fcmTokens = snapshot.val();

            // Get the FCM tokens for all devices
            const tokens = Object.keys(fcmTokens);

            // Send a notification to each device
            const payload = {
              notification: {
                title: "Deadline approaching!",
                body: `${todo.content} is due in ${timeUntilDeadlineMinutes} minutes.`,
                click_action: "http://localhost:3000",
              },
            };

            firebase.messaging().sendToDevice(tokens, payload);
          });
        }
      }
    });
  });
}

// This function listens for changes to the todos reference in Firebase and checks the deadline for each to-do item. If the deadline is within one hour, it retrieves the FCM tokens for all devices from the database and sends a notification to each device using the `sendToDevice
