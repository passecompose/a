// Define 10 questions and correct answers
const questions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 5 + 7?", answer: "12" },
    { question: "What is the chemical symbol for water?", answer: "H2O" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the largest mammal?", answer: "Blue Whale" },
    { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
    { question: "What is the boiling point of water in degrees Celsius?", answer: "100" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" }
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
    if (currentQuestionIndex < questions.length) {
        if (currentQuestionIndex % questions.length === 0) {
            // All users have finished; show results
            displayResults();
        } else {
            // Move to next user's turn
            currentUserIndex = (currentUserIndex + 1) % users.length;
            loadQuestion();
        }
    } else {
        // All questions answered; show results
        displayResults();
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
