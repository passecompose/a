document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const completionMessage = document.getElementById('completion-message');
    const completionScore = document.getElementById('completion-score');
    const completionTime = document.getElementById('completion-time');
    const completionStreak = document.getElementById('completion-streak');

    completionMessage.textContent = `Congratulations ${username}! You have completed the game.`;
    // You can also fetch and display actual game results from local storage or other storage methods if needed
});
