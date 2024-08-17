// game.js

// Function to check if the hero overlaps with any silhouettes
export function checkHeroSilhouetteOverlap(hero) {
    const heroPos = hero[0].getBoundingClientRect(); // Get the hero's position
    let heroInFrontOfEyes = false; // Flag to check if hero overlaps with any silhouette

    $(".silhouette").each(function () {
        const bushPos = this.getBoundingClientRect(); // Get the silhouette's position

        // Check for overlap between hero and silhouette
        if (
            !(
                heroPos.right < bushPos.left || 
                heroPos.left > bushPos.right || 
                heroPos.bottom < bushPos.top || 
                heroPos.top > bushPos.bottom 
            )
        ) {
            heroInFrontOfEyes = true; // Set flag to true if overlap is detected
        }
    });

    // Add or remove 'invert' class based on overlap detection
    if (heroInFrontOfEyes) {
        hero.addClass("invert");
    } else {
        hero.removeClass("invert");
    }
}
