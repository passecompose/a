document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGameBtn');
    const viewCompletedBtn = document.getElementById('viewCompletedBtn');
    const usernameInput = document.getElementById('username');
    const feedback = document.getElementById('feedback');

    startGameBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem('username', username);
            window.location.href = 'game.html';
        } else {
            feedback.textContent = 'Please enter a username.';
            feedback.className = 'feedback incorrect';
        }
    });

    viewCompletedBtn.addEventListener('click', () => {
        window.location.href = 'completed.html';
    });
});
