import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: "todo-1", content: "Take out the trash" },
    { id: "todo-2", content: "Do the dishes" },
    { id: "todo-3", content: "Finish homework" },
  ]);

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

  return (
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
                  >
                    {todo.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
