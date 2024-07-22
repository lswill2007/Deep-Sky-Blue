// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 50;
const cellSize = 15;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
let interval;

canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x] ? 'black' : 'white';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function updateGrid() {
    const newGrid = grid.map(row => row.slice());
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const neighbors = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1], [1, 0], [1, 1]
            ].reduce((sum, [dy, dx]) => {
                const ny = y + dy;
                const nx = x + dx;
                if (ny >= 0 && ny < gridSize && nx >= 0 && nx < gridSize) {
                    sum += grid[ny][nx] ? 1 : 0;
                }
                return sum;
            }, 0);

            if (grid[y][x]) {
                newGrid[y][x] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[y][x] = neighbors === 3;
            }
        }
    }
    grid = newGrid;
    drawGrid();
}

function toggleCell(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    grid[y][x] = !grid[y][x];
    drawGrid();
}

function startGame() {
    if (!interval) {
        interval = setInterval(updateGrid, 100);
    }
}

function stopGame() {
    clearInterval(interval);
    interval = null;
}

function clearGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
    drawGrid();
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);
document.getElementById('clearButton').addEventListener('click', clearGrid);
canvas.addEventListener('click', toggleCell);

drawGrid();
