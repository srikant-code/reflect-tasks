// Create a 3x3 board
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// Define the symbols for the players
var X = "X";
var O = "O";

// Keep track of the current player
var currentPlayer = X;

// Keep track of the game status
var gameOver = false;

// Create a function to display the board
function displayBoard() {
  console.log(board[0].join(" | "));
  console.log("---------");
  console.log(board[1].join(" | "));
  console.log("---------");
  console.log(board[2].join(" | "));
}

// Create a function to check if a player has won
function checkWin(symbol) {
  // Check horizontal lines
  for (var i = 0; i < 3; i++) {
    if (
      board[i][0] == symbol &&
      board[i][1] == symbol &&
      board[i][2] == symbol
    ) {
      return true;
    }
  }
  // Check vertical lines
  for (var j = 0; j < 3; j++) {
    if (
      board[0][j] == symbol &&
      board[1][j] == symbol &&
      board[2][j] == symbol
    ) {
      return true;
    }
  }
  // Check diagonal lines
  if (board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol) {
    return true;
  }
  if (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol) {
    return true;
  }
  // No win condition found
  return false;
}

// Create a function to check if the board is full
function checkFull() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        return false;
      }
    }
  }
  return true;
}

// Create a function to make a move
function makeMove(row, col) {
  // Check if the move is valid
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    console.log("Invalid move. Please enter a row and column between 0 and 2.");
    return;
  }
  if (board[row][col] != "") {
    console.log("Invalid move. That cell is already occupied.");
    return;
  }
  if (gameOver) {
    console.log("Invalid move. The game is over.");
    return;
  }
  // Make the move
  board[row][col] = currentPlayer;
  // Display the board
  displayBoard();
  // Check if the current player has won
  if (checkWin(currentPlayer)) {
    console.log(currentPlayer + " has won the game!");
    gameOver = true;
    return;
  }
  // Check if the board is full
  if (checkFull()) {
    console.log("The game is a tie!");
    gameOver = true;
    return;
  }
  // Switch the current player
  if (currentPlayer == X) {
    currentPlayer = O;
  } else {
    currentPlayer = X;
  }
  // Prompt the next player to make a move
  console.log(
    "It is " +
      currentPlayer +
      "'s turn. Please enter a row and column between 0 and 2."
  );
}

// Start the game
console.log("Welcome to tic tac toe!");
console.log(
  "Player X goes first. Please enter a row and column between 0 and 2."
);
