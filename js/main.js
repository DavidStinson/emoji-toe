/*================================ Constants ================================*/

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/*================================ Variables ================================*/

let turn, board, player, winner, playerName, aiGameMode

/*================================= Objects =================================*/

let colorMode = {
  dark: 0,
  light: 1,
  changeColorMode: function () {
    if (colorMode.dark) {
      colorMode.light = true
      colorMode.dark = false
    } else {
      colorMode.light = false
      colorMode.dark = true
    }
    preRender()
  },
}

/*============================= Confetti Objects =============================*/

const baseConfetti = {
  target: "my-canvas",
  size: 2,
  start_from_edge: true,
  rotate: true,
}

const handConfettiSettings = Object.create(baseConfetti)
handConfettiSettings.props = [
  "square",
  "circle",
  "triangle",
  "line",
  {type: "svg", src: "../assets/images/waving-hand.svg", weight: 0.25},
]
handConfettiSettings.colors = [
  [70, 143, 158],
  [20, 43, 61],
]

const footConfettiSettings = Object.create(baseConfetti)
footConfettiSettings.props = [
  "square",
  "circle",
  "triangle",
  "line",
  {type: "svg", src: "../assets/images/foot.svg", weight: 0.25},
]
footConfettiSettings.colors = [
  [138, 62, 59],
  [209, 95, 71],
]

const tieConfettiSettings = Object.create(baseConfetti)
tieConfettiSettings.props = [
  "square",
  "circle",
  "triangle",
  "line",
  {type: "svg", src: "../assets/images/demon.svg", weight: 0.25},
]
tieConfettiSettings.colors = [
  [62, 62, 62],
  [245, 245, 245],
]

const handConfetti = new ConfettiGenerator(handConfettiSettings)
const footConfetti = new ConfettiGenerator(footConfettiSettings)
const tieConfetti = new ConfettiGenerator(tieConfettiSettings)

/*======================== Cached Element References ========================*/

let cells = document.querySelectorAll(".cell")
let message = document.querySelector("#message")
let gameBoard = document.querySelector("#board")
let restart = document.querySelector("#restart")
let restartVsAi = document.querySelector("#restart-vs-ai")
let lmdmBtn = document.querySelector("#lmdm")
// Pull these elements solely to style them.
// They won't be used for game logic.
let body = document.querySelector("body")

/*============================= Event Listeners =============================*/

gameBoard.addEventListener("click", handlePlayerTurn)
restart.addEventListener("click", init)
lmdmBtn.addEventListener("click", colorMode.changeColorMode)
restartVsAi.addEventListener("click", initWithAi)
// handle keyboard Enter/Return keypress for keyboard users
gameBoard.addEventListener("keydown", function (evnt) {
  if (evnt.key === "Enter") handlePlayerTurn(evnt)
})
restart.addEventListener("keydown", function (evnt) {
  if (evnt.key === "Enter") init()
})
restartVsAi.addEventListener("keydown", function (evnt) {
  if (evnt.key === "Enter") initWithAi()
})
lmdmBtn.addEventListener("keydown", function (evnt) {
  if (evnt.key === "Enter") colorMode.changeColorMode(evnt)
})

/*================================ Functions ================================*/

function checkUserLmdm() {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    if (colorMode.light) {
      colorMode.light = false
      colorMode.dark = true
    }
  }
}

function init() {
  aiGameMode = false
  buildGame()
}

function initWithAi() {
  aiGameMode = true
  buildGame()
}

function initAiVsAi() {
  buildGame()
  while (!winner) {
    handleAiTurn()
  }
}

function buildGame() {
  board = new Array(9).fill(0)
  turn = 1
  player = -1
  playerName = "Toes"
  winner = null
  preRender()
}

function handlePlayerTurn(evnt) {
  // Gets the cell number from the target cell,
  // by removing "cell" from the id
  processTurn(evnt.target.id)
  if (aiGameMode && !winner && player === 1) {
    handleAiTurn()
  }
}

function handleAiTurn() {
  emptyCells = []
  board.forEach((cell, idx) => {
    if (!cell) {
      emptyCells.push(idx)
    }
  })
  const aiCellChoice = Math.floor(Math.random() * emptyCells.length)
  processTurn(emptyCells[aiCellChoice])
}

function processTurn(evnt) {
  if (!board[evnt]) {
    board[evnt] = player
    player *= -1
    player === -1 ? (playerName = "Toes") : (playerName = "Fingers")
    winner = checkForWin()
    if (winner) fillBoardWithWinner(winner)
    turn++
  }
  preRender()
}

function checkForWin() {
  for (let i = 0; i < winCombos.length; i++) {
    if (
      board[winCombos[i][0]] +
        board[winCombos[i][1]] +
        board[winCombos[i][2]] ===
      3
    ) {
      return 1
    }
    if (
      board[winCombos[i][0]] +
        board[winCombos[i][1]] +
        board[winCombos[i][2]] ===
      -3
    ) {
      return -1
    }
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

/*================================ Renderers ================================*/

// Added a preRender function to greatly simplify the render function
// ALL functions requiring rendering call this funciton
function preRender() {
  colorMode.dark ? render("dm") : render("")
}

function render(color) {
  body.setAttribute("class", color)
  msgRender()
  cells.forEach(function (cell, idx) {
    board[idx] === -1
      ? (cell.classList.add("toes"),
        (cell.textContent = "🦶"),
        cell.classList.remove("null"),
        cell.classList.remove("fingers"))
      : board[idx] === 1
      ? (cell.classList.add("fingers"),
        (cell.textContent = "👋"),
        cell.classList.remove("null"),
        cell.classList.remove("toes"))
      : board[idx] === 2
      ? (cell.classList.add("tie"),
        (cell.textContent = "👿"),
        cell.classList.remove("null"))
      : (cell.classList.add("null"),
        (cell.textContent = ""),
        cell.classList.remove("tie"),
        cell.classList.remove("fingers"),
        cell.classList.remove("toes"))
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