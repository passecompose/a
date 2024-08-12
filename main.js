// Function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name') || 'Player',
        correct_questions: parseInt(params.get('correct_questions')) || 0
    };
}

// Function to update UI with query parameters
function updateUIWithParams() {
    const { name, correct_questions } = getQueryParams();
    
    // Display personalized welcome message and correct questions
    $('question').innerHTML = `Welcome, ${name}! You have answered ${correct_questions} questions correctly so far.`;

    // If needed, you can also use these values to initialize game state or other UI elements
}

// Function to start the game
function startGame() {
    score = 0;
    questionCount = 0;
    streak = 0;
    level = 1;
    startTime = Date.now();
    gameInterval = setInterval(updateTime, 1000);
    nextQuestion();
    $('startBtn').style.display = 'none';
    $('submitBtn').style.display = 'inline-block';
    $('hintBtn').style.display = 'inline-block';
    $('answer').style.display = 'block';
    $('feedback').textContent = `Good luck, ${getQueryParams().name}!`;
}

// Function to check the answer
function checkAnswer() {
    const userAnswer = $('answer').value.trim().toLowerCase();
    const correctAnswer = `${currentSubject.toLowerCase()} ${getAuxiliary()} ${getParticiple()}`.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    $('feedback').textContent = isCorrect ? 'Correct! Well done!' : `Not quite. The correct answer is: "${correctAnswer}"`;
    $('feedback').className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    if (isCorrect) {
        score++;
        streak++;
        if (streak % 5 === 0) levelUp();
    } else {
        streak = 0;
    }
    updateStreak();
    setTimeout(nextQuestion, 2000);
}

// Function to show a hint
function showHint() {
    $('feedback').textContent = `Hint: This verb uses "${currentVerb.aux}" as its auxiliary. The past participle is "${currentVerb.part}".`;
    $('feedback').className = 'feedback hint';
}

// Initialize game settings and UI
document.addEventListener('DOMContentLoaded', () => {
    updateUIWithParams();
    $('startBtn').addEventListener('click', startGame);
    $('submitBtn').addEventListener('click', checkAnswer);
    $('hintBtn').addEventListener('click', showHint);
});
