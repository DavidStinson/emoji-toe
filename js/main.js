/*-----------------------------------------------
=================== Variables ===================
-----------------------------------------------*/

let turn, board, player, winner, playerName

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
=========== Cached Element References ===========
-----------------------------------------------*/

let cells = document.querySelectorAll(".cell")
let message = document.querySelector("#message")
let gameBoard = document.querySelector("#board")
let reset = document.querySelector("#reset")
// Pull these elements solely to style them.
// They won't be used for game logic.
let body = document.querySelector("body")
let header = document.querySelector("h1")

/*-----------------------------------------------
================ Event Listeners ================
-----------------------------------------------*/

gameBoard.addEventListener("click", handleGameBoardSelect)
reset.addEventListener("click", init)
// handle keyboard Enter/Return keypress for keyboard users
gameBoard.addEventListener("keydown", function(evnt) {
  if (evnt.key === "Enter") handleGameBoardSelect(evnt)
})
reset.addEventListener("keydown", function(evnt) {
  if (evnt.key === "Enter") init()
})

/*-----------------------------------------------
=================== Functions ===================
-----------------------------------------------*/

function init() {
  turn = 1
  player = -1
  playerName = "Toes"
  board = [null, null, null, null, null, null, null, null, null]
  winner = null
  preRender()
}

function handleGameBoardSelect(evnt) {
  // Gets the cell number from the target cell,
  // by removing "cell" from the id
  let idx = evnt.target.id.replace("cell", "")
  evnt.target.tabIndex
  if (board[idx] === null) {
    board[idx] = player
    player *= -1
    player === -1 ? (playerName = "Toes") : (playerName = "Fingers")
    winner = checkForWin()
    if (winner) fillBoardWithWinner(winner)
    turn++
  }
  preRender()
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
  if (turn === board.length) {
    return 2
  }
  return 0
}

function fillBoardWithWinner(winner) {
  for (let idx = 0; idx < board.length; idx++) {
    board[idx] = winner
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
  reset.setAttribute("class", color)
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
    message.textContent = `${playerName}, it's your turn!`
  }
}

init()
