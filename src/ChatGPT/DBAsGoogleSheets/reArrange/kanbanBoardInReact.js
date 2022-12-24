import React, { useState } from "react";

function KanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, text: "Task 1" },
        { id: 2, text: "Task 2" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      cards: [{ id: 3, text: "Task 3" }],
    },
    {
      id: 3,
      title: "Done",
      cards: [],
    },
  ]);

  //   The addCard function is a method that allows you to add a new card to the Kanban board. It takes two arguments: the columnId of the column that you want to add the card to, and the cardText, which is the text that you want to display on the card.
  const addCard = (columnId, cardText) => {
    const newColumns = [...columns]; // Make a copy of the columns array
    const columnIndex = newColumns.findIndex(
      (column) => column.id === columnId
    ); // Find the index of the column that the card should be added to
    const newCard = { id: Date.now(), text: cardText }; // Create a new card object with a unique ID and the specified text
    newColumns[columnIndex].cards.push(newCard); // Add the new card to the column
    setColumns(newColumns); // Update the state with the new columns array
  };

  // The moveCard function is a method that allows you to move a card from one column to another. It takes three arguments: the columnId of the column that the card is currently in, the cardId of the card that you want to move, and the direction that you want to move the card in (e.g., left or right).
  const moveCard = (columnId, cardId, direction) => {
    const newColumns = [...columns]; // Make a copy of the columns array
    const columnIndex = newColumns.findIndex(
      (column) => column.id === columnId
    ); // Find the index of the column that the card is in
    const cardIndex = newColumns[columnIndex].cards.findIndex(
      (card) => card.id === cardId
    ); // Find the index of the card within that column
    const card = newColumns[columnIndex].cards[cardIndex]; // Get the card object
    newColumns[columnIndex].cards.splice(cardIndex, 1); // Remove the card from its current column

    // Find the index of the column that the card should be moved to
    let targetColumnIndex;
    if (direction === "left") {
      targetColumnIndex = columnIndex - 1;
    } else if (direction === "right") {
      targetColumnIndex = columnIndex + 1;
    }

    // Add the card to the new column
    newColumns[targetColumnIndex].cards.push(card);

    setColumns(newColumns); // Update the state with the new columns array
  };
  // This function first makes a copy of the columns array and then finds the index of the column and the card within that column. It removes the card from its current column and then adds it to the new column based on the direction that was passed in. Finally, it updates the component's state with the new columns array.

  const onDrop = (event, targetColumnId) => {
    const data = event.dataTransfer.getData("cardId");
    const cardId = Number(data);
    const columnId = columns.find((column) =>
      column.cards.some((card) => card.id === cardId)
    ).id;
    moveCard(columnId, cardId, targetColumnId > columnId ? "right" : "left");
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <div
          className="column"
          key={column.id}
          onDrop={(event) => onDrop(event, column.id)}
          onDragOver={onDragOver}
        >
          <div className="column-header">{column.title}</div>
          {column.cards.map((card) => (
            <div
              className="card"
              key={card.id}
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("cardId", card.id)
              }
            >
              {card.text}
            </div>
          ))}
          <button onClick={() => addCard(column.id, "New Card")}>
            Add Card
          </button>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
