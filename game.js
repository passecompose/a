const verbs = [
    // Same verbs array as before
];

const subjects = ["Je", "Tu", "Il/Elle", "Nous", "Vous", "Ils/Elles"];
let currentVerb, currentSubject, score, questionCount, startTime, gameInterval, streak = 0, level = 1;

const $ = id => document.getElementById(id);
const random = arr => arr[Math.floor(Math.random() * arr.length)];

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

function getAuxiliary() {
    const auxConj = {
        être: ["suis", "es", "est", "sommes", "êtes", "sont"],
        avoir: ["ai", "as", "a", "avons", "avez", "ont"]
    };
    return auxConj[currentVerb.aux][subjects.indexOf(currentSubject)];
}

function getParticiple() {
    let part = currentVerb.part;
    if (currentVerb.aux === "être") {
        if (["Je", "Tu", "Il/Elle"].includes(currentSubject)) part += "e";
        if (["Nous", "Vous", "Ils/Elles"].includes(currentSubject)) part += "s";
    }
    return part;
}

function showHint() {
    $('feedback').textContent = `Hint: This verb uses "${currentVerb.aux}" as its auxiliary. The past participle is "${currentVerb.part}".`;
    $('feedback').className = 'feedback hint';
}

function updateScore() {
    $('score').textContent = `Score: ${score}/${questionCount}`;
}

function updateTime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    $('time').textContent = `Time: ${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}`;
}

function updateStreak() {
    $('streak').textContent = `Streak: ${streak}`;
}

function updateProgress() {
    const progress = (questionCount / 20) * 100;
    $('progress').style.width = `${progress}%`;
}

function levelUp() {
    level++;
    $('level-indicator').textContent = `Level Up! Now at Level ${level}`;
    $('level-indicator').style.display = 'block';
    setTimeout(() => $('level-indicator').style.display = 'none', 2000);
}

function endGame() {
    clearInterval(gameInterval);
    $('completion-message').textContent = 'Congratulations! You have completed the game.';
    $('completion-score').textContent = `Final Score: ${score}/20`;
    $('completion-time').textContent = `Time Taken: ${$('time').textContent.split(' ')[1]}`;
    $('completion-streak').textContent = `Streak: ${streak}`;
    window.location.href = 'completed.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = $('startBtn');
    const submitBtn = $('submitBtn');
    const hintBtn = $('hintBtn');

    startBtn.addEventListener('click', startGame);
    submitBtn.addEventListener('click', checkAnswer);
    hintBtn.addEventListener('click', showHint);
});
