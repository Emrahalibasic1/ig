// handleIdleJump.js

export function setupJumpHandling(hero, gameRunning, isJumping, handleJump, touchStartY) {
    $(document).keydown(function (e) {
        if (!gameRunning || isJumping) return;

        if (e.key === "ArrowUp") {
            handleJump();
        }
    });

    $(document).on("touchstart", function (e) {
        const touchEndY = e.originalEvent.touches[0].pageY;

        if (touchStartY - touchEndY > 50) { // Swipe up detected
            handleJump();
        }
    });

    function handleJump() {
        if (!gameRunning || isJumping) return;

        isJumping = true;
        hero.addClass("jump");
        setTimeout(() => {
            hero.removeClass("jump");
            isJumping = false;
        }, 500); // Duration of the jump
    }
}
