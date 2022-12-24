// npm install react-bootstrap react-datepicker
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoList() {
  // State for the modal
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [timeLimit, setTimeLimit] = useState(null);
  const [deadline, setDeadline] = useState(null);

  // Open the modal
  const handleModalOpen = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  // Set the time limit
  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  // Set the deadline
  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  // Save the time limit and deadline
  const handleSave = () => {
    // Update the to-do item in the database
    setTimeLimitAndDeadline(selectedTodo.id, timeLimit, deadline);

    // Close the modal
    handleModalClose();
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.content}
          <Button onClick={() => handleModalOpen(todo)}>
            Set Time Limit and Deadline
          </Button>
        </div>
      ))}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Time Limit and Deadline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="timeLimit">
              <Form.Label>Time Limit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter time limit"
                onChange={handleTimeLimitChange}
              />
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <DatePicker
                selected={deadline}
                onChange={handleDeadlineChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
