/*-----------------------------------------------
=================== Constants ===================
-----------------------------------------------*/

const darkModeColor = {
  null: "#3e3e3e",
  "-1": "#468F9E",
  "1": "#D15F47",
}

/*-----------------------------------------------
=================== Variables ===================
-----------------------------------------------*/

let turn, board

/*-----------------------------------------------
=========== Cached Element References ===========
-----------------------------------------------*/

// You might choose to put your game status here

/*-----------------------------------------------
================ Event Listeners ================
-----------------------------------------------*/

// This is where you should put the event listener
// for a mouse-click

/*-----------------------------------------------
=================== Functions ===================
-----------------------------------------------*/

function init() {
  turn = 1
  board = [null, null, null, null, null, null, null, null, null]
}

function checkForWin() {
  if (
    board[0] + board[1] + board[2] === 3 ||
    board[3] + board[4] + board[5] === 3 ||
    board[6] + board[7] + board[8] === 3 ||
    board[0] + board[3] + board[6] === 3 ||
    board[1] + board[4] + board[7] === 3 ||
    board[2] + board[5] + board[8] === 3 ||
    board[0] + board[4] + board[8] === 3 ||
    board[6] + board[4] + board[2] === 3
  ) {
    return 1
  }
  if (
    board[0] + board[1] + board[2] === -3 ||
    board[3] + board[4] + board[5] === -3 ||
    board[6] + board[7] + board[8] === -3 ||
    board[0] + board[3] + board[6] === -3 ||
    board[1] + board[4] + board[7] === -3 ||
    board[2] + board[5] + board[8] === -3 ||
    board[0] + board[4] + board[8] === -3 ||
    board[6] + board[4] + board[2] === -3
  ) {
    return -1
  }
  return 0
}

// On-Click function:
// Set up what happens when one of the elements
// is clicked

// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so

// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect
// either X or O depending on whose turn it is
