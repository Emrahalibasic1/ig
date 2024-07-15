// collision.js

export function checkCollision(hero, gameOver) {
    const tolerance = 10;
    const heroPos = hero[0].getBoundingClientRect();

    $(".obstacle").each(function () {
        const obstaclePos = this.getBoundingClientRect();

        if (
            !(
                heroPos.right < obstaclePos.left + tolerance ||
                heroPos.left > obstaclePos.right - tolerance ||
                heroPos.bottom < obstaclePos.top ||
                heroPos.top > obstaclePos.bottom
            )
        ) {
            gameOver();
        }
    });
}
