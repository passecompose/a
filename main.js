// Array of verbs with their attributes
const verbs = [
    { inf: "aller", part: "allé", aux: "être", diff: "easy", eng: "to go" },
    { inf: "avoir", part: "eu", aux: "avoir", diff: "easy", eng: "to have" },
    { inf: "être", part: "été", aux: "avoir", diff: "easy", eng: "to be" },
    { inf: "faire", part: "fait", aux: "avoir", diff: "easy", eng: "to do/make" },
    { inf: "venir", part: "venu", aux: "être", diff: "easy", eng: "to come" },
    { inf: "voir", part: "vu", aux: "avoir", diff: "medium", eng: "to see" },
    { inf: "prendre", part: "pris", aux: "avoir", diff: "medium", eng: "to take" },
    { inf: "pouvoir", part: "pu", aux: "avoir", diff: "medium", eng: "to be able to" },
    { inf: "savoir", part: "su", aux: "avoir", diff: "medium", eng: "to know (a fact)" },
    { inf: "vouloir", part: "voulu", aux: "avoir", diff: "medium", eng: "to want" },
    { inf: "devoir", part: "dû", aux: "avoir", diff: "hard", eng: "to have to/must" },
    { inf: "falloir", part: "fallu", aux: "avoir", diff: "hard", eng: "to be necessary" },
    { inf: "pleuvoir", part: "plu", aux: "avoir", diff: "hard", eng: "to rain" },
    { inf: "mourir", part: "mort", aux: "être", diff: "hard", eng: "to die" },
    { inf: "naître", part: "né", aux: "être", diff: "hard", eng: "to be born" }
];

// List of subjects for conjugation
const subjects = ["Je", "Tu", "Il/Elle", "Nous", "Vous", "Ils/Elles"];

// Initialize game variables
let currentVerb, currentSubject, score, questionCount, startTime, gameInterval, streak = 0, level = 1;

// Utility function to get element by ID
const $ = id => document.getElementById(id);

// Utility function to get a random element from an array
const random = arr => arr[Math.floor(Math.random() * arr.length)];

// Start the game
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
}

// Generate the next question
function nextQuestion() {
    if (questionCount >= 20) return endGame();
    questionCount++;
    currentVerb = random(verbs.filter(v => v.diff === $('difficulty').value));
    currentSubject = random(subjects);
    $('question').innerHTML = `<strong>Question ${questionCount}/20:</strong><br>Translate to French (Passé Composé):<br>"${currentSubject} ${currentVerb.eng}"`;
    $('answer').value = '';
    $('feedback').textContent = '';
    $('feedback').className = 'feedback';
    updateScore();
    updateProgress();
}

// Check the user's answer
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

// Get the correct auxiliary verb for the current question
function getAuxiliary() {
    const auxConj = {
        être: ["suis", "es", "est", "sommes", "êtes", "sont"],
        avoir: ["ai", "as", "a", "avons", "avez", "ont"]
    };
    return auxConj[currentVerb.aux][subjects.indexOf(currentSubject)];
}

// Get the correct past participle form
function getParticiple() {
    let part = currentVerb.part;
    if (currentVerb.aux === "être") {
        if (["Je", "Tu", "Il/Elle"].includes(currentSubject)) part += "e";
        if (["Nous", "Vous", "Ils/Elles"].includes(currentSubject)) part += "s";
    }
    return part;
}

// Update the score display
function updateScore() {
    $('score').textContent = `Score: ${score}/${questionCount}`;
}

// Update the streak display
function updateStreak() {
    $('streak').textContent = `Streak: ${streak}`;
}

// Update the progress bar
function updateProgress() {
    const progress = (questionCount / 20) * 100;
    $('progress').style.width = `${progress}%`;
}

// Handle the game level up
function levelUp() {
    level++;
    $('level-indicator').textContent = `Level Up! Now at Level ${level}`;
    $('level-indicator').style.display = 'block';
    setTimeout(() => $('level-indicator').style.display = 'none', 2000);
}

// End the game and show the final score
function endGame() {
    clearInterval(gameInterval);
    $('question').innerHTML = `<strong>Game Over!</strong><br>Your final score is ${score}/20.`;
    $('submitBtn').style.display = 'none';
    $('hintBtn').style.display = 'none';
}

// Update the timer every second
function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    $('time').textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Add event listeners to buttons when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    $('startBtn').addEventListener('click', startGame);
    $('submitBtn').addEventListener('click', checkAnswer);
    $('hintBtn').addEventListener('click', showHint);
});

// Display a hint
function showHint() {
    $('feedback').textContent = `Hint: The verb "${currentVerb.inf}" means "${currentVerb.eng}" in English.`;
    $('feedback').className = 'feedback hint';
}
