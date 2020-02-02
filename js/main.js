/*-----------------------------------------------
=================== Constants ===================
-----------------------------------------------*/

const darkModeColor = {
  null: "white",
  "1": "#468F9E",
  "-1": "#D15F47",
  T: "#9E7E5B",
}

/*-----------------------------------------------
=================== Variables ===================
-----------------------------------------------*/

let turn, board, player, winner, currentPlayerName

/*-----------------------------------------------
=========== Cached Element References ===========
-----------------------------------------------*/

let cells = document.querySelectorAll(".cell")
let message = document.querySelector("#message")
// Pull these elements solely to style them.
// They won't be used for game logic.
let body = document.querySelector("body")
let header = document.querySelector("h1")

/*-----------------------------------------------
================ Event Listeners ================
-----------------------------------------------*/

// This is where you should put the event listener
// for a mouse-click

/*-----------------------------------------------
==================== Objects ====================
-----------------------------------------------*/

let colorMode = {
  dark: 1,
  light: 0,
  changeColorMode: function() {
    if (dark) {
      this.light = 1
      this.dark = 0
    } else {
      this.light = 0
      this.dark = 1
    }
  },
}

/*-----------------------------------------------
=================== Functions ===================
-----------------------------------------------*/

function init() {
  turn = 1
  player = -1
  currentPlayerName = "Toes"
  board = [null, null, null, null, null, null, null, null, null]
  winner = null
  preRender()
}

player === -1 ? (currentPlayerName = "Toes") : (currentPlayerName = "Fingers")
winner = checkForWin()
if (winner) fillBoardWithWinner(winner)

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
  if (turn === 9) {
    return 2
  }
  return 0
}

function fillBoardWithWinner(winner) {
  for (cell of board) {
    cell = winner
  }
}

//================== Renderers ==================

// Added a preRender function to greatly simplify the render function
// ALL functions requiring rendering call this funciton
function preRender() {
  colorMode.dark ? render("dm") : render("lm")
}

function render(color) {
  body.setAttribute("class", color)
  header.setAttribute("class", color)
  msgRender()
  cells.forEach(function(cell, idx) {
    board[idx] === -1
      ? (cell.setAttribute("class", `${color}-foot`), (cell.textContent = "🦶"))
      : board[idx] === 1
      ? (cell.setAttribute("class", `${color}-hand`), (cell.textContent = "👋"))
      : board[idx] === 2
      ? (cell.setAttribute("class", `${color}-tie`), (cell.textContent = "👿"))
      : (cell.setAttribute("class", `${color}-null`), (cell.textContent = ""))
  })
}

// functionalized message rendering with msgRender function
function msgRender() {
  if (winner) {
    winner === -1
      ? (message.textContent = "Toes win!")
      : winner === 1
      ? (message.textContent = "Fingers win!")
      : (message.textContent = "Oh no, it's a tie!")
  } else {
    message.textContent = `${currentPlayerName}, it's your turn!`
  }
}

init()

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
