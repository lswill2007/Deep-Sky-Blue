document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    let currentPlayer = 1;
    let currentQuestion;

    questions.forEach(question => {
        question.addEventListener('click', () => {
            if (question.classList.contains('answered')) return;
            showQuestion(question);
        });
    });

    function showQuestion(question) {
        currentQuestion = question;
        const questionText = question.getAttribute('data-question');
        question.classList.add('expanded');
        question.innerHTML = `
            <h2>${questionText}</h2>
            <input type="text" id="popupAnswerInput" placeholder="Your answer">
            <button id="popupSubmitAnswer">Submit Answer</button>
        `;

        const submitButton = question.querySelector('#popupSubmitAnswer');
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
});
