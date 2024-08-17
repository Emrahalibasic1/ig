// collision.js

// Function to check for collisions between the hero and obstacles
export function checkCollision(hero, gameOver) {
    const tolerance = 10; // Tolerance for collision detection
    const heroPos = hero[0].getBoundingClientRect(); // Get the hero's position

    $(".obstacle").each(function () {
        const obstaclePos = this.getBoundingClientRect(); // Get the obstacle's position

        // Check for collision using bounding rectangles and tolerance
        if (
            !(
                heroPos.right < obstaclePos.left + tolerance ||  
                heroPos.left > obstaclePos.right - tolerance ||  
                heroPos.bottom < obstaclePos.top ||  
                heroPos.top > obstaclePos.bottom  
            )
        ) {
            gameOver(); // Call gameOver function if a collision is detected
        }
    });
}
