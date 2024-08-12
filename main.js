// Define 10 French questions and correct answers
const questions = [
    { question: "Comment dit-on 'Hello' en français ?", answer: "Bonjour" },
    { question: "Quel est le mot pour 'apple' en français ?", answer: "Pomme" },
    { question: "Comment se dit 'dog' en français ?", answer: "Chien" },
    { question: "Quelle est la traduction de 'book' en français ?", answer: "Livre" },
    { question: "Comment dit-on 'Goodbye' en français ?", answer: "Au revoir" },
    { question: "Quel est le mot pour 'house' en français ?", answer: "Maison" },
    { question: "Comment se dit 'car' en français ?", answer: "Voiture" },
    { question: "Quelle est la traduction de 'friend' en français ?", answer: "Ami" },
    { question: "Comment dit-on 'Thank you' en français ?", answer: "Merci" },
    { question: "Quel est le mot pour 'school' en français ?", answer: "École" }
];

let currentQuestionIndex = 0; // Track the current question
let currentUserIndex = 0; // Track the current user
let users = []; // Store user names and their scores

// Add name to the list of users
document.getElementById('addName').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    if (name === "") {
        alert("Please enter your name.");
        return;
    }
    
    // Add user to the list
    users.push({ name, score: 0 });
    document.getElementById('nameInput').value = '';

    // Show the start quiz button if there's more than one user
    if (users.length > 1) {
        document.getElementById('startQuiz').style.display = 'block';
    }
});

// Start the quiz when the button is clicked
document.getElementById('startQuiz').addEventListener('click', () => {
    if (users.length === 0) {
        alert("Please add at least one user.");
        return;
    }

    // Hide start form and show quiz
    document.getElementById('startForm').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Load the first question
    loadQuestion();
});

// Submit answer when button is clicked
document.getElementById('submitAnswer').addEventListener('click', () => {
    const answer = document.getElementById('answerInput').value.trim();
    if (answer === "") {
        alert("Please enter an answer.");
        return;
    }

    // Check if the answer is correct
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        users[currentUserIndex].score++;
    }

    // Move to the next question or finish quiz
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        // All questions answered; show results
        displayResults();
    } else {
        // Move to the next user's turn
        currentUserIndex = (currentUserIndex + 1) % users.length;
        loadQuestion();
    }
});

// Load a new question for the current user
function loadQuestion() {
    document.getElementById('question').textContent = questions[currentQuestionIndex].question;
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();
}

// Display results at the end of the quiz
function displayResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Show scores and percentages
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    const totalQuestions = questions.length;
    users.forEach(user => {
        const percentage = (user.score / totalQuestions * 100).toFixed(2);
        const li = document.createElement('li');
        li.textContent = `${user.name}: ${user.score} correct (${percentage}%)`;
        resultsList.appendChild(li);
    });
}

// Reset quiz for a new round
document.getElementById('resetQuiz').addEventListener('click', () => {
    currentQuestionIndex = 0;
    currentUserIndex = 0;
    users = [];
    document.getElementById('startForm').style.display = 'block';
    document.getElementById('results').style.display = 'none';
});
