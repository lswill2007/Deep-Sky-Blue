const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 100;
const cellSize = 15;
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
let interval;

canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = grid[y][x] ? 'green' : 'white';
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
                [-1, -1],   [-1, 0],    [-1, 1],
                [0, -1],                [0, 1],
                [1, -1],    [1, 0],     [1, 1]
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

function loadPattern(pattern) {
    clearGrid();
    pattern.forEach(([x, y]) => {
        grid[y][x] = true;
    });
    drawGrid();
}

const gliderGunPattern = [
    [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7],
    [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6],
    [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3],
    [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6],
    [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3],
    [36, 4]
];

const gliderPattern = [
    [51, 50], [52, 51], [52, 52], [51, 52], [50, 52]
];


const pulsarPattern = [
    [4, 2], [5, 2], [6, 2], [10, 2], [11, 2], [12, 2],
    [2, 4], [7, 4], [9, 4], [14, 4],
    [2, 5], [7, 5], [9, 5], [14, 5],
    [2, 6], [7, 6], [9, 6], [14, 6],
    [4, 7], [5, 7], [6, 7], [10, 7], [11, 7], [12, 7],
    [4, 9], [5, 9], [6, 9], [10, 9], [11, 9], [12, 9],
    [2, 10], [7, 10], [9, 10], [14, 10],
    [2, 11], [7, 11], [9, 11], [14, 11],
    [2, 12], [7, 12], [9, 12], [14, 12],
    [4, 14], [5, 14], [6, 14], [10, 14], [11, 14], [12, 14]
];

const pentadecathlonPattern = [
    [24, 22], [24, 23], [24, 24], [24, 25], [24, 26], [24, 27], [24, 28], [24, 29], [24, 30], [24, 31], [25, 22], [25, 23], [25, 24], [25, 25], [25, 26], [25, 27], [25, 28], [25, 29], [25, 30], [25, 31],
    [26, 21], [26, 32], [27, 22], [27, 23], [27, 24], [27, 25], [27, 26], [27, 27], [27, 28], [27, 29], [27, 30], [27, 31], [28, 21], [28, 32], [29, 22], [29, 23], [29, 24], [29, 25], [29, 26], [29, 27], [29, 28], [29, 29], [29, 30], [29, 31],
    [30, 22], [30, 23], [30, 24], [30, 25], [30, 26], [30, 27], [30, 28], [30, 29], [30, 30], [30, 31]
];

const simkinGliderGunPattern = [
    [61, 61], [62, 61], [61, 62], [62, 62], [68, 61], [69, 61], [68, 62], [69, 62], [65, 64], [66, 64], 
    [65, 65], [66, 65], [92, 72], [93, 72], [92, 73], [93, 73], [83, 70], [84, 70], [86, 70], [87, 70],
    [82, 71], [88, 71], [89, 72], [88, 73], [87, 74], [84, 73], [83, 73], [82, 73], [82, 72],
    [85, 79], [87, 79], [88, 79], [85, 80], [86, 80], [88, 80]
];

const hwssPattern = [
    [79, 71], [79, 72], [80, 72], [81, 71], [80, 73], [71, 75], [72, 75], [73, 75], [73, 76], [72, 77], [76, 77], [77, 77], [78, 77], [78, 78], [77, 79]
];

const breeder1Pattern = [
    [51, 51], [52, 51], [53, 51], [51, 52], [51, 53], [55, 51], [55, 52], [55, 53], [56, 51], [57, 51],
    [58, 51], [57, 52], [57, 53], [62, 51], [62, 52], [62, 53], [61, 51], [60, 51], [59, 51],
    [61, 52], [61, 53]
];

const twinBeesShuttlePatternDown = [
    [56, 60], [57, 60], [58, 61], [58, 62], [58, 63], [57, 64], [56, 64], [55, 63], [55, 62], [55, 61],
    [61, 60], [62, 60], [63, 61], [63, 62], [63, 63], [62, 64], [61, 64], [60, 63], [60, 62], [60, 61],
    [53, 62], [52, 62], [51, 62], [50, 62], [64, 62], [65, 62], [66, 62], [67, 62]
];






document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);
document.getElementById('clearButton').addEventListener('click', clearGrid);
document.getElementById('gliderGunButton').addEventListener('click', () => loadPattern(gliderGunPattern));
document.getElementById('gliderButton').addEventListener('click', () => loadPattern(gliderPattern));
document.getElementById('pulsarButton').addEventListener('click', () => loadPattern(pulsarPattern));
document.getElementById('pentadecathlonButton').addEventListener('click', () => loadPattern(pentadecathlonPattern));
document.getElementById('breeder1Button').addEventListener('click', () => loadPattern(breeder1Pattern));
document.getElementById('hwssButton').addEventListener('click', () => loadPattern(hwssPattern));
document.getElementById('twinBeesShuttleButton').addEventListener('click', () => loadPattern(twinBeesShuttlePattern));
document.getElementById('simkinGliderGunButton').addEventListener('click', () => loadPattern(simkinGliderGunPattern));
canvas.addEventListener('click', toggleCell);

drawGrid();
