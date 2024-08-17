// gameUI.js

// Function to start the game timer
export function startTimer(setStartTime, setIntervalId, updateTimer) {
    const startTime = Date.now(); // Get the current time as the start time
    const intervalId = setInterval(() => updateTimer(startTime), 100); // Update the timer every 100ms
    setStartTime(startTime); // Store the start time
    setIntervalId(intervalId); // Store the interval ID
}

// Function to update the timer display
export function updateTimer(startTime) {
    const now = Date.now(); // Get the current time
    const elapsed = now - startTime; // Calculate elapsed time since the start

    const minutes = Math.floor(elapsed / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsed % 1000) / 100);

    // Update the timer display with padded minutes and seconds
    $("#chronometer, .chronometer").text(`${pad(minutes, 2)}:${pad(seconds, 2)}`);
}

// Function to pad numbers with leading zeros
export function pad(number, length) {
    return number.toString().padStart(length, "0");
}

// Function to handle the hero's jump action
export function handleJump(hero, gameRunning, isJumping) {
    if (!gameRunning || isJumping) return; // Prevent jump if game is not running or already jumping

    isJumping = true; // Set jumping state to true
    hero.addClass("jump"); // Add the jump class to the hero
    setTimeout(() => {
        hero.removeClass("jump"); // Remove the jump class after 500ms
        isJumping = false; // Set jumping state to false
    }, 500);
}

// Function to reset the game to its initial state
export function resetGame(hero, setGameRunning, setTimerStarted, intervalId) {
    setGameRunning(true); // Start the game
    setTimerStarted(false); // Stop the timer
    clearInterval(intervalId); // Clear the timer interval
    $("#chronometer, .chronometer").text("00:00"); // Reset the timer display

    hero.css("top", "calc(50% + 200px)"); // Reset hero's position
    hero.removeClass("invert"); // Remove any invert class from the hero

    // Reset positions of obstacles, bushes, floor, objects, and finish line
    $(".obstacle, .bush, .floor, .object, #finishLine").each(function () {
        $(this).css("left", $(this).data("initialLeft"));
    });
}
