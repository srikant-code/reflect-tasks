// Here is the complete code for the exportTodosToCSV function that exports the to-do items from Firebase to a CSV file:
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

export function exportTodosToCSV() {
  todosRef.once("value").then((snapshot) => {
    const todos = snapshot.val();
    let csv = "ID,Content\n";

    todos.forEach((todo) => {
      csv += `${todo.id},${todo.content}\n`;
    });

    // Generate the CSV file and download it
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "todo-list.csv";
    hiddenElement.click();
  });
}

// This function retrieves the to-do items from the todos reference in Firebase and generates a CSV file with the to-do data. It then creates a hidden a element, sets the href attribute to the CSV data, and clicks the element to trigger the download.
// You can use this function to export the to-do list to a CSV file by calling it in your code. For example:

// import { exportTodosToCSV } from "./exportTodosToCSV";
exportTodosToCSV();
