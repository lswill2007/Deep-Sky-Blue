
const questions = document.querySelectorAll('.question');
let currentPlayer = 1;
let currentQuestion;

questions.forEach(question => {
    question.addEventListener('click', showQuestion, false);
});

function showQuestion(event) {
    this.removeEventListener('click', showQuestion, false);
    currentQuestion = this;
    const questionText = this.getAttribute('data-question');
    this.classList.add('expanded');
    let qt = document.createElement("h2");
    qt.textContent = questionText;
    this.appendChild(qt);
    let input = document.createElement("input");
    input.id = "popupAnswerInput";
    input.setAttribute("placeholder", "Your answer");
    this.appendChild(input);
    let button = document.createElement("button");
    button.id = "popupSubmitAnswer";
    button.textContent = "Submit Answer";
    this.appendChild(button);
    const submitButton = this.querySelector('#popupSubmitAnswer');
    submitButton.addEventListener('click', submitAnswer);
}

function submitAnswer() {
    const answerInput = currentQuestion.querySelector('#popupAnswerInput');
    const answer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentQuestion.getAttribute('data-answer').toLowerCase();
    const value = parseInt(currentQuestion.getAttribute('data-value'));

    if (answer === correctAnswer) {
        const scoreSpan = document.getElementById(`score${currentPlayer}`);
        scoreSpan.textContent = parseInt(scoreSpan.textContent) + value;
    }

    currentQuestion.classList.add('answered');
    currentQuestion.classList.remove('expanded');
    currentQuestion.innerHTML = `$${value}`;

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('turnIndicator').textContent = `Player ${currentPlayer}'s Turn`;
}

