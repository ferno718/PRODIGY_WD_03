const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConds = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
let opt = ["", "", "", "", "", "", "", "", ""];
let curr = "X";
let running = false;

initGame();

function initGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${curr}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (opt[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    opt[index] = curr;
    cell.textContent = curr;
}

function changePlayer() {
    curr = (curr == "X") ? "O" : "X";
    statusText.textContent = `${curr}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConds.length; i++) {
        const condition = winConds[i];
        const cellA = opt[condition[0]];
        const cellB = opt[condition[1]];
        const cellC = opt[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${curr} wins!`;
        running = false;
    } else if (!opt.includes("")) {
        statusText.textContent = `It's a Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    curr = "X";
    opt = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${curr}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}