const board = document.getElementById('gameBoard');
const cells = [];
let currentPlayer = 'X';

function createBoard() {
    board.style.gridTemplateColumns = 'repeat(3, 100px)';
    board.style.gridTemplateRows = 'repeat(3, 100px)';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.border = '1px solid #000';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.fontSize = '36px';
        cell.style.fontWeight = 'bold';
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => handleClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(index) {
    if (cells[index].textContent === '') {
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
            return;
        }
        if (cells.every(cell => cell.textContent !== '')) {
            setTimeout(() => alert('It\'s a tie!'), 10);
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

createBoard();
