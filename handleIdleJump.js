// handleIdleJump.js

// Function to set up jump handling for the hero
export function setupJumpHandling(hero, gameRunning, isJumping, handleJump, touchStartY) {
    // Keydown event listener for jump action using the up arrow key
    $(document).keydown(function (e) {
        if (!gameRunning || isJumping) return; // Prevent jump if game is not running or already jumping

        if (e.key === "ArrowUp") {
            handleJump(); // Call handleJump function when up arrow key is pressed
        }
    });

    // Touchstart event listener for jump action using swipe up gesture
    $(document).on("touchstart", function (e) {
        const touchEndY = e.originalEvent.touches[0].pageY;

        if (touchStartY - touchEndY > 50) { // Swipe up detected
            handleJump(); // Call handleJump function when swipe up is detected
        }
    });

    // Function to handle the hero's jump action
    function handleJump() {
        if (!gameRunning || isJumping) return; // Prevent jump if game is not running or already jumping

        isJumping = true; // Set jumping state to true
        hero.addClass("jump"); // Add the jump class to the hero
        setTimeout(() => {
            hero.removeClass("jump"); // Remove the jump class after 500ms
            isJumping = false; // Set jumping state to false
        }, 500); // Duration of the jump
    }
}
