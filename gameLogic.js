// gameLogic.js

export function checkWin(hero, finishLine, gameWin) {
    const heroPos = hero[0].getBoundingClientRect();
    const finishPos = finishLine[0].getBoundingClientRect();

    if (
        !(
            heroPos.right < finishPos.left ||
            heroPos.left > finishPos.right ||
            heroPos.bottom < finishPos.top ||
            heroPos.top > finishPos.bottom
        )
    ) {
        gameWin();
    }
}

export function checkCollisionWrapper(hero, checkCollision, gameOver) {
    checkCollision(hero, gameOver);
}

export function gameOver(gameRunning, intervalId) {
    if (!gameRunning) return;
    gameRunning = false;
    clearInterval(intervalId);
    $(".start").fadeOut();
    $(".game-over").fadeIn();
}

export function gameWin(setGameRunning, intervalId, startTime, highestScore, pad) {
    setGameRunning(false);
    clearInterval(intervalId);
    const now = Date.now();
    const elapsed = now - startTime;
    if (elapsed < highestScore || highestScore === 0) {
        highestScore = elapsed;
        const minutes = Math.floor(highestScore / (1000 * 60));
        const seconds = Math.floor((highestScore % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((highestScore % 1000) / 10);
        $("#highestScore, .highestScore").text(
            `${pad(minutes, 2)}:${pad(seconds, 2)}`
        );
    }
    $(".win").fadeIn();
    $(".bestTime").fadeIn();
}
