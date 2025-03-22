const cells = document.querySelectorAll('.box1');
const statusText = document.querySelector('.statusText');
const replaybtn = document.querySelector('#replay-btn');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let choices = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked)); 
    replaybtn.addEventListener('click', restartGame); 
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
   }

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (choices[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    choices[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.fontWeight = "bold"; 
    cell.style.fontSize = "30px";   
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundwon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = choices[condition[0]];
        const cellB = choices[condition[1]];
        const cellC = choices[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundwon = true;
            break;
        }
    }

    if (roundwon) {
        statusText.textContent = `${currentPlayer} wins`;
        running = false;
    } else if (!choices.includes("")) { // Fixed draw condition
        statusText.textContent = 'Draw!';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    choices = ["", "", "", "", "", "", "", "", ""]; // Fixed resetting array
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true; // Allow game to continue
}
