// Define questions and correct answers
const questions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" }
];

let currentQuestionIndex = 0; // Track the current question
let scores = []; // Store scores of participants

// Start quiz when button is clicked
document.getElementById('startQuiz').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Hide start form and show quiz
    document.getElementById('startForm').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Load the first question
    loadQuestion(name);
});

// Submit answer when button is clicked
document.getElementById('submitAnswer').addEventListener('click', () => {
    const answer = document.getElementById('answerInput').value.trim();
    const name = document.getElementById('nameInput').value.trim();

    if (answer === "") {
        alert("Please enter an answer.");
        return;
    }

    // Check if the answer is correct
    const correctAnswer = questions[currentQuestionIndex].answer;
    const score = answer.toLowerCase() === correctAnswer.toLowerCase() ? 1 : 0;

    // Store the score
    scores.push({ name, score });

    // Move to the next question or show results
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(name);
    } else {
        displayResults();
    }
});

// Load a new question
function loadQuestion(name) {
    document.getElementById('question').textContent = questions[currentQuestionIndex].question;
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();
}

// Display results at the end of the quiz
function displayResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Show scores
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        resultsList.appendChild(li);
    });
}

// Reset quiz for a new round
document.getElementById('resetQuiz').addEventListener('click', () => {
    scores = [];
    currentQuestionIndex = 0;
    document.getElementById('startForm').style.display = 'block';
    document.getElementById('results').style.display = 'none';
});
