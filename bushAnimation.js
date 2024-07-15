// bushAnimation.js

export function animateBushes() {
    $(".bush").each(function (index) {
        var $bush = $(this);

        function toggleObstacle() {
            $bush.toggleClass("obstacle monster");
            setTimeout(
                toggleObstacle,
                $bush.hasClass("obstacle monster")
                    ? getToggleTime(index, true)
                    : getToggleTime(index, false)
            );
        }

        toggleObstacle();
    });
}

function getToggleTime(index, isObstacle) {
    var toggleTimes = [
        [3000, 4000], // nth-child(1)
        [4000, 5000], // nth-child(2)...
        [5000, 6500],
        [3500, 4000],
        [6000, 7000]
    ];

    return isObstacle ? toggleTimes[index][0] : toggleTimes[index][1];
}
