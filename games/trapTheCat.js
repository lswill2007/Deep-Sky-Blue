const gameBoard = document.getElementById('gameBoard');
const boardSize = 11;
let catPosition = { x: 5, y: 5 };
let obstacles = [];

for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => addObstacle(row, col));
        gameBoard.appendChild(cell);
    }
}

function addObstacle(row, col) {
    if (row === catPosition.y && col === catPosition.x) return;

    const cells = document.getElementsByClassName('cell');
    let cell = null;
    for (let i = 0; i < cells.length; i++) {
        if (parseInt(cells[i].dataset.row) === row && parseInt(cells[i].dataset.col) === col) {
            cell = cells[i];
            break;
        }
    }

    if (!cell.classList.contains('obstacle')) {
        cell.classList.add('obstacle');
        obstacles.push({ x: col, y: row });
        moveCat();
    }
}

function countAdjacentObstacles(x, y) {
    const directions = [
        { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 },
        { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }
    ];
    let count = 0;

    for (let dir of directions) {
        const newX = x + dir.x;
        const newY = y + dir.y;
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize &&
            obstacles.some(obstacle => obstacle.x === newX && obstacle.y === newY)) {
            count++;
        }
    }

    return count;
}

function moveCat() {
    const bestMove = findBestMove(catPosition.x, catPosition.y);
    if (bestMove) {
        updateCatPosition(bestMove.x, bestMove.y);
    } else {
        alert('You trapped the cat!');
    }
}

function findBestMove(startX, startY) {
    const directions = [
        { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 },
        { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }
    ];

    let stack = [{ x: startX, y: startY, path: [] }];
    let visited = new Set();
    visited.add(`${startX},${startY}`);

    while (stack.length > 0) {
        let { x, y, path } = stack.pop();

        if (x === 0 || x === boardSize - 1 || y === 0 || y === boardSize - 1) {
            return path.length > 0 ? path[0] : { x, y };
        }

        for (let dir of directions) {
            const newX = x + dir.x;
            const newY = y + dir.y;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize &&
                !obstacles.some(obstacle => obstacle.x === newX && obstacle.y === newY) &&
                !visited.has(`${newX},${newY}`)) {
                
                stack.push({ x: newX, y: newY, path: [...path, { x: newX, y: newY }] });
                visited.add(`${newX},${newY}`);
            }
        }
    }

    return null;
}

function updateCatPosition(newX, newY) {
    const cells = document.getElementsByClassName('cell');
    let oldCatCell = null;
    for (let i = 0; i < cells.length; i++) {
        if (parseInt(cells[i].dataset.row) === catPosition.y && parseInt(cells[i].dataset.col) === catPosition.x) {
            oldCatCell = cells[i];
            break;
        }
    }
    oldCatCell.classList.remove('cat');

    catPosition.x = newX;
    catPosition.y = newY;

    let newCatCell = null;
    for (let i = 0; i < cells.length; i++) {
        if (parseInt(cells[i].dataset.row) === catPosition.y && parseInt(cells[i].dataset.col) === catPosition.x) {
            newCatCell = cells[i];
            break;
        }
    }
    newCatCell.classList.add('cat');

    if (newX === 0 || newX === boardSize - 1 || newY === 0 || newY === boardSize - 1) {
        alert('The cat escaped!');
        resetGame();
    }
}

// Function to reset the game
function resetGame() {
    catPosition = { x: 5, y: 5 };
    obstacles = [];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('obstacle');
        cell.classList.remove('cat');
    });
    updateCatPosition(catPosition.x, catPosition.y);
    blockini();
}

// Function to initialize the game with 10 random obstacles
function blockini() {
    let addedObstacles = 0;
    while (addedObstacles < 30) {
        const randomRow = Math.floor(Math.random() * boardSize);
        const randomCol = Math.floor(Math.random() * boardSize);

        if (randomRow === catPosition.y && randomCol === catPosition.x) continue;

        const cells = document.getElementsByClassName('cell');
        let cell = null;
        for (let i = 0; i < cells.length; i++) {
            if (parseInt(cells[i].dataset.row) === randomRow && parseInt(cells[i].dataset.col) === randomCol) {
                cell = cells[i];
                break;
            }
        }

        if (!cell.classList.contains('obstacle')) {
            cell.classList.add('obstacle');
            obstacles.push({ x: randomCol, y: randomRow });
            addedObstacles++;
        }
    }
}

updateCatPosition(catPosition.x, catPosition.y);
blockini();
