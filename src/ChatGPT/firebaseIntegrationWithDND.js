// Here is the full code for a to-do list in React that integrates with Firebase and allows you to perform CRUD operations using the Firebase database:
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Modal, Form } from "react-bootstrap";

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

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [todoContent, setTodoContent] = useState("");

  // Listen for changes to the 'todos' reference and update the component's state
  todosRef.on("value", (snapshot) => {
    const todos = snapshot.val();
    setTodos(todos);
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, removed);

    setTodos(newTodos);
  };

  const addTodo = (content) => {
    todosRef.push().set({
      id: `todo-${todos.length + 1}`,
      content,
    });
  };

  const updateTodo = (id, content) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    todoToUpdate.content = content;

    todosRef.child(id).update(todoToUpdate);
  };

  const deleteTodo = (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    todosRef.child(id).remove();
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = (todo) => {
    setShowEditModal(true);
    setCurrentTodo(todo);
    setTodoContent(todo.content);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="card mb-3"
                    >
                      <div className="card-body d-flex justify-content-between align-items-center">
                        {todo.content}
                        <div>
                          <Button
                            variant="primary"
                            onClick={() => handleEditModalShow(todo)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button variant="success" onClick={handleCreateModalShow}>
        Create Todo
      </Button>

      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={todoContent}
                onChange={(e) => setTodoContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addTodo(todoContent);
              handleCreateModalClose();
              setTodoContent("");
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={todoContent}
                onChange={(e) => setTodoContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateTodo(currentTodo.id, todoContent);
              handleEditModalClose();
              setTodoContent("");
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoList;
