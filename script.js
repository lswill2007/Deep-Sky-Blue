const gameBoard = document.getElementById('gameBoard');
const boardSize = 20;
const boardWidth = gameBoard.clientWidth / boardSize;
const boardHeight = gameBoard.clientHeight / boardSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * boardWidth), y: Math.floor(Math.random() * boardHeight) };
let direction = { x: 0, y: 0 };
let gameInterval;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * boardWidth), y: Math.floor(Math.random() * boardHeight) };
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight || isCollision()) {
        alert('Game Over!');
        clearInterval(gameInterval);
        resetGame();
    }
}

function isCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function drawBoard() {
    gameBoard.innerHTML = '';

    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * boardSize}px`;
        snakeElement.style.top = `${segment.y * boardSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * boardSize}px`;
    foodElement.style.top = `${food.y * boardSize}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = { x: Math.floor(Math.random() * boardWidth), y: Math.floor(Math.random() * boardHeight) };
    gameInterval = setInterval(gameLoop, 200);
}

function gameLoop() {
    updateSnake();
    drawBoard();
}

resetGame();
