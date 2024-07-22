const size = 4;
const board = document.getElementById('gameBoard');
let grid = Array(size).fill().map(() => Array(size).fill(0));

document.addEventListener('keydown', handleKeyPress);

function initBoard() {
    addRandomTile();
    addRandomTile();
    drawBoard();
}

function drawBoard() {
    board.innerHTML = '';
    grid.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = value === 0 ? '' : value;
            tile.style.backgroundColor = getTileColor(value);
            board.appendChild(tile);
        });
    });
}

function getTileColor(value) {
    // Define colors based on tile value
    // For simplicity, you can adjust colors as needed
    switch (value) {
        case 0: return '#ccc0b3';
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#3c3a32';
    }
}

function addRandomTile() {
    let emptyTiles = [];
    grid.forEach((row, rIndex) => {
        row.forEach((tile, cIndex) => {
            if (tile === 0) emptyTiles.push({ row: rIndex, col: cIndex });
        });
    });
    if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function handleKeyPress(event) {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp': moved = moveUp(); break;
        case 'ArrowDown': moved = moveDown(); break;
        case 'ArrowLeft': moved = moveLeft(); break;
        case 'ArrowRight': moved = moveRight(); break;
    }
    if (moved) {
        addRandomTile();
        drawBoard();
    }
}

function moveUp() {
    // Implement the logic to move tiles up
    // Add code to merge tiles and update grid
    return true; // Return true if any tile was moved
}

function moveDown() {
    // Implement the logic to move tiles down
    // Add code to merge tiles and update grid
    return true; // Return true if any tile was moved
}

function moveLeft() {
    // Implement the logic to move tiles left
    // Add code to merge tiles and update grid
    return true; // Return true if any tile was moved
}

function moveRight() {
    // Implement the logic to move tiles right
    // Add code to merge tiles and update grid
    return true; // Return true if any tile was moved
}

initBoard();
