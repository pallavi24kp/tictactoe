const cells = document.querySelectorAll('.cell');
const message = document.getElementById('game-message');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

// Check for winner
function checkWinner(){
  return winPatterns.some((pattern) => {
    return pattern.every((index) => board[index] === currentPlayer);
  });
}

function checkDraw(){
  return board.every((cell) => cell !== '');
}

function handleClick(e){
  const cell = e.target;
  const index = cell.dataset.cellIndex;

  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} wins! 🏆`;
    isGameActive = false;
    return;
  }

  if (checkDraw()) {
    message.textContent = "Draw! 👏";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function restart(){
  board.fill('');
  cells.forEach((cell) => (cell.textContent = ''));
  currentPlayer = 'X';
  isGameActive = true;
  message.textContent = "Let's play!";
}

cells.forEach((cell) =>
  cell.addEventListener('click', handleClick)
);

restartBtn.addEventListener('click', restart);
