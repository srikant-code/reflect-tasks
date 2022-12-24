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

export function setTimeLimitAndDeadline(todoId, timeLimit, deadline) {
  // Update the to-do item in Firebase
  todosRef.child(todoId).update({
    timeLimit: timeLimit,
    deadline: deadline,
  });
}

// This function takes in the todoId, timeLimit, and deadline for a to-do item and updates the corresponding fields in the Firebase database using the update method.
// You can use this function to set the time limit and deadline for a to-do item by calling it in your code. For example:

// import { setTimeLimitAndDeadline } from "./setTimeLimitAndDeadline";
setTimeLimitAndDeadline("todo1", "1 hour", "2022-12-31");
