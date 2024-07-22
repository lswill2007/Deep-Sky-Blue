const gameBoard = document.getElementById('gameBoard');
const boardWidth = gameBoard.clientWidth;
const boardHeight = gameBoard.clientHeight;

let character = document.createElement('div');
character.classList.add('character');
gameBoard.appendChild(character);

let characterPosition = {
    x: (boardWidth / 2) - 20,
    y: boardHeight - 40
};

document.addEventListener('keydown', moveCharacter);

function moveCharacter(e) {
    switch(e.key) {
        case 'ArrowUp':
            if (characterPosition.y > 0) characterPosition.y -= 40;
            break;
        case 'ArrowDown':
            if (characterPosition.y < boardHeight - 40) characterPosition.y += 40;
            break;
        case 'ArrowLeft':
            if (characterPosition.x > 0) characterPosition.x -= 40;
            break;
        case 'ArrowRight':
            if (characterPosition.x < boardWidth - 40) characterPosition.x += 40;
            break;
    }
    updateCharacterPosition();
}

function updateCharacterPosition() {
    character.style.left = `${characterPosition.x}px`;
    character.style.bottom = `${characterPosition.y}px`;
}

// Obstacles
function createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * (boardWidth - 60)}px`;
    gameBoard.appendChild(obstacle);

    let obstaclePosition = {
        x: parseFloat(obstacle.style.left),
        y: 0
    };

    function moveObstacle() {
        obstaclePosition.y += 2;
        if (obstaclePosition.y > boardHeight) {
            obstacle.remove();
            clearInterval(obstacleInterval);
        } else {
            obstacle.style.top = `${obstaclePosition.y}px`;
            checkCollision(obstaclePosition);
        }
    }

    let obstacleInterval = setInterval(moveObstacle, 20);
}

function checkCollision(obstaclePosition) {
    if (
        characterPosition.x < obstaclePosition.x + 60 &&
        characterPosition.x + 40 > obstaclePosition.x &&
        characterPosition.y < obstaclePosition.y + 40 &&
        characterPosition.y + 40 > obstaclePosition.y
    ) {
        alert('Game Over!');
        resetGame();
    }
}

function resetGame() {
    characterPosition = {
        x: (boardWidth / 2) - 20,
        y: boardHeight - 40
    };
    updateCharacterPosition();
    let obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());
}

setInterval(createObstacle, 1000);
updateCharacterPosition();
