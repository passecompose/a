const questions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" }
];

let currentQuestionIndex = 0;
let scores = [];

document.getElementById('startQuiz').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    const quiz = document.getElementById('quiz');
    const startForm = document.getElementById('startForm');
    startForm.style.display = 'none';
    quiz.style.display = 'block';

    loadQuestion(name);
});

document.getElementById('submitAnswer').addEventListener('click', () => {
    const answer = document.getElementById('answerInput').value.trim();
    const name = document.getElementById('nameInput').value.trim();

    if (answer === "") {
        alert("Please enter an answer.");
        return;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();

    scores.push({ name, score: isCorrect ? 1 : 0 });

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(name);
    } else {
        displayResults();
    }
});

function loadQuestion(name) {
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answerInput');

    questionElement.textContent = questions[currentQuestionIndex].question;
    answerInput.value = '';
    answerInput.focus();
}

function displayResults() {
    const results = document.getElementById('results');
    const quiz = document.getElementById('quiz');
    const resultsList = document.getElementById('resultsList');

    quiz.style.display = 'none';
    results.style.display = 'block';

    resultsList.innerHTML = '';
    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        resultsList.appendChild(li);
    });
}

document.getElementById('resetQuiz').addEventListener('click', () => {
    scores = [];
    currentQuestionIndex = 0;
    document.getElementById('startForm').style.display = 'block';
    document.getElementById('results').style.display = 'none';
});
