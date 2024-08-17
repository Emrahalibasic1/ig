// gameLogic.js

// Function to check if the hero has reached the finish line
export function checkWin(hero, finishLine, gameWin) {
    const heroPos = hero[0].getBoundingClientRect(); // Get the hero's position
    const finishPos = finishLine[0].getBoundingClientRect(); // Get the finish line's position

    // Check for overlap between hero and finish line
    if (
        !(
            heroPos.right < finishPos.left ||  
            heroPos.left > finishPos.right ||  
            heroPos.bottom < finishPos.top ||  
            heroPos.top > finishPos.bottom  
        )
    ) {
        gameWin(); // Call gameWin function if the hero reaches the finish line
    }
}

// Wrapper function to check for collisions only if the game is not won
export function checkCollisionWrapper(hero, checkCollision, gameOver, gameWon) {
    if (!gameWon) { // Prevent collision detection if the game is won
        checkCollision(hero, gameOver); // Check for collisions
    }
}

// Function to handle game over state
export function gameOver(setGameRunning, intervalId) {
    setGameRunning(false); // Stop the game
    clearInterval(intervalId); // Clear the game interval
    $(".start").fadeOut(); // Hide the start screen
    $(".game-over").fadeIn(); // Show the game over screen
}

// Function to handle game win state
export function gameWin(setGameRunning, intervalId, startTime, highestScore, pad, setHighestScore, setGameWon) {
    setGameRunning(false); // Stop the game
    setGameWon(true); // Set game won state
    clearInterval(intervalId); // Clear the game interval
    const now = Date.now();
    const elapsed = now - startTime; // Calculate elapsed time
    if (elapsed < highestScore || highestScore === 0) {
        highestScore = elapsed; // Update highest score if current time is better
        setHighestScore(highestScore); // Set the highest score
        const minutes = Math.floor(highestScore / (1000 * 60));
        const seconds = Math.floor((highestScore % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((highestScore % 1000) / 10);
        $("#highestScore, .highestScore").text(
            `${pad(minutes, 2)}:${pad(seconds, 2)}` // Display the highest score
        );
    }
    $(".win").fadeIn(); // Show the win screen
    $(".bestTime").fadeIn(); // Show the best time
}
