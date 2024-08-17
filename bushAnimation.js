// bushAnimation.js

// Function to animate the bushes by toggling their obstacle/monster class
export function animateBushes() {
    $(".bush").each(function (index) {
        var $bush = $(this);

        // Function to toggle the class of the bush between 'obstacle' and 'monster'
        function toggleObstacle() {
            $bush.toggleClass("obstacle monster");
            setTimeout(
                toggleObstacle,
                // Determine the toggle time based on whether the bush is an obstacle or not
                $bush.hasClass("obstacle monster")
                    ? getToggleTime(index, true)
                    : getToggleTime(index, false)
            );
        }

        // Start the toggling process
        toggleObstacle();
    });
}

// Function to get the toggle time for a bush based on its index and current state (obstacle or not)
function getToggleTime(index, isObstacle) {
    var toggleTimes = [
        [3000, 4000], // nth-child(1)
        [4000, 5000], // nth-child(2)...
        [5000, 6500],
        [3500, 4000],
        [6000, 7000]
    ];

    // Return the appropriate toggle time based on whether the bush is an obstacle or not
    return isObstacle ? toggleTimes[index][0] : toggleTimes[index][1];
}
