// Here is an example of a new React component that exports the to-do items from Firebase to an Excel file using the xlsx library:
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import * as XLSX from "xlsx";

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

function ExportTodos() {
  const [todos, setTodos] = useState([]);

  // Listen for changes to the 'todos' reference and update the component's state
  todosRef.on("value", (snapshot) => {
    const todos = snapshot.val();
    setTodos(todos);
  });

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the to-do items to an array of objects
    const todoData = todos.map((todo) => ({
      id: todo.id,
      content: todo.content,
    }));

    // Create a new sheet and add the to-do data to it
    const sheet = XLSX.utils.json_to_sheet(todoData);
    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, sheet, "Todo List");

    // Generate the Excel file and download it
    XLSX.writeFile(workbook, "todo-list.xlsx");
  };

  return <button onClick={exportToExcel}>Export Todos to Excel</button>;
}

export default ExportTodos;
