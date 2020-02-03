/*-----------------------------------------------
=================== Variables ===================
-----------------------------------------------*/

let turn, board, player, winner, playerName

/*-----------------------------------------------
==================== Objects ====================
-----------------------------------------------*/

let colorMode = {
  dark: 0,
  light: 1,
  changeColorMode: function() {
    if (colorMode.dark) {
      colorMode.light = 1
      colorMode.dark = 0
    } else {
      colorMode.light = 0
      colorMode.dark = 1
    }
    preRender()
  },
}

// ============== Confetti Objects ==============

var handConfettiSettings = {
  target: "my-canvas",
  size: 2,
  start_from_edge: true,
  props: [
    "square",
    "circle",
    "triangle",
    "line",
    {type: "svg", src: "..\\images\\waving-hand.svg", weight: 0.25},
  ],
  rotate: true,
  colors: [
    [70, 143, 158],
    [20, 43, 61],
  ],
}
var footConfettiSettings = {
  target: "my-canvas",
  size: 2,
  start_from_edge: true,
  props: [
    "square",
    "circle",
    "triangle",
    "line",
    {type: "svg", src: "..\\images\\foot.svg", weight: 0.25},
  ],
  rotate: true,
  colors: [
    [138, 62, 59],
    [209, 95, 71],
  ],
}
var tieConfettiSettings = {
  target: "my-canvas",
  size: 2,
  start_from_edge: true,
  props: [
    "square",
    "circle",
    "triangle",
    "line",
    {type: "svg", src: "..\\images\\demon.svg", weight: 0.25},
  ],
  rotate: true,
  colors: [
    [62, 62, 62],
    [245, 245, 245],
  ],
}
var handConfetti = new ConfettiGenerator(handConfettiSettings)
var footConfetti = new ConfettiGenerator(footConfettiSettings)
var tieConfetti = new ConfettiGenerator(tieConfettiSettings)

/*-----------------------------------------------
=========== Cached Element References ===========
-----------------------------------------------*/

let cells = document.querySelectorAll(".cell")
let message = document.querySelector("#message")
let gameBoard = document.querySelector("#board")
let reset = document.querySelector("#reset")
let lmdmBtn = document.querySelector("#lmdm")
// Pull these elements solely to style them.
// They won't be used for game logic.
let body = document.querySelector("body")
let header = document.querySelector("h1")

/*-----------------------------------------------
================ Event Listeners ================
-----------------------------------------------*/

gameBoard.addEventListener("click", handleGameBoardSelect)
reset.addEventListener("click", init)
lmdmBtn.addEventListener("click", colorMode.changeColorMode)
// handle keyboard Enter/Return keypress for keyboard users
gameBoard.addEventListener("keydown", function(evnt) {
  if (evnt.key === "Enter") handleGameBoardSelect(evnt)
})
reset.addEventListener("keydown", function(evnt) {
  if (evnt.key === "Enter") init()
})
lmdmBtn.addEventListener("keydown", function(evnt) {
  if (evnt.key === "Enter") colorMode.changeColorMode(evnt)
})

/*-----------------------------------------------
=================== Functions ===================
-----------------------------------------------*/

function checkUserLmdm() {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    if (colorMode.light) {
      colorMode.light = 0
      colorMode.dark = 1
    }
  }
}

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
  lmdmBtn.setAttribute("class", color)
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
      ? ((message.textContent = "Toes win!"), footConfetti.render())
      : winner === 1
      ? ((message.textContent = "Fingers win!"), handConfetti.render())
      : ((message.textContent = "Oh no, it's a tie!"), tieConfetti.render())
  } else {
    message.textContent = `${playerName}, it's your turn!`
  }
}

checkUserLmdm()
init()
