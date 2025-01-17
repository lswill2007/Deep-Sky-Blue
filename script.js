
const gameBoard = document.getElementById('gameBoard');
const boardSize = 11;
let catPosition = { x: 5, y: 5 };
let obstacles = [];

// Initialize the game board
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

// Function to add obstacle
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

// Function to move the cat
function moveCat() {
    const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1},
        { x: -1, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1},
    ];
    let cntmin = 8;
    for (let dir of directions) {
        let decideX = 0;
        let decideY = 0;
        let newX = catPosition.x + dir.x;
        let newY = catPosition.y + dir.y;
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize &&
            !obstacles.some(obstacle => obstacle.x === newX && obstacle.y === newY)) {
                if(countBlockAdj(newX, newY) < cntmin){
                    decideX = newX;
                    decideY = newY;
                    cntmin = countBlockAdj(newX, newY);
            }
        }
        updateCatPosition(decideX, decideY);
        return;
    }
    alert('You trapped the cat!');
}
function countBlockAdj(x,y){
    const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1},
        { x: -1, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1},
    ];
    let cnt = 0;
    for(let dir of directions){
        let newX = x + dir.x;
        let newY = y + dir.y;
        if(newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize){
            if(obstacles.some(obstacle => obstacle.x === newX && obstacle.y === newY)){
                cnt++;
            }
        }
    }
    return cnt;
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

// Function to initialize the game with 8 random obstacles
function blockini() {
    let addedObstacles = 0;
    while (addedObstacles < 8) {
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

// Set initial cat position and fill the board with initial obstacles
updateCatPosition(catPosition.x, catPosition.y);
blockini();
