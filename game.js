// game.js
export function checkHeroSilhouetteOverlap(hero) {
    const heroPos = hero[0].getBoundingClientRect();
    let heroInFrontOfEyes = false;

    $(".silhouette").each(function () {
        const bushPos = this.getBoundingClientRect();

        if (
            !(
                heroPos.right < bushPos.left ||
                heroPos.left > bushPos.right ||
                heroPos.bottom < bushPos.top ||
                heroPos.top > bushPos.bottom
            )
        ) {
            heroInFrontOfEyes = true;
        }
    });

    if (heroInFrontOfEyes) {
        hero.addClass("invert");
    } else {
        hero.removeClass("invert");
    }
}
