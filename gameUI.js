// gameUI.js

export function startTimer(setStartTime, setIntervalId, updateTimer) {
    const startTime = Date.now();
    const intervalId = setInterval(() => updateTimer(startTime), 100);
    setStartTime(startTime);
    setIntervalId(intervalId);
}

export function updateTimer(startTime) {
    const now = Date.now();
    const elapsed = now - startTime;

    const minutes = Math.floor(elapsed / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsed % 1000) / 100);

    $("#chronometer, .chronometer").text(`${pad(minutes, 2)}:${pad(seconds, 2)}`);
}

export function pad(number, length) {
    return number.toString().padStart(length, "0");
}

export function handleJump(hero, gameRunning, isJumping) {
    if (!gameRunning || isJumping) return;

    isJumping = true;
    hero.addClass("jump");
    setTimeout(() => {
        hero.removeClass("jump");
        isJumping = false;
    }, 500);
}

export function resetGame(hero, setGameRunning, setTimerStarted, intervalId) {
    setGameRunning(true);
    setTimerStarted(false);
    clearInterval(intervalId);
    $("#chronometer, .chronometer").text("00:00");

    hero.css("top", "calc(50% + 200px)");
    hero.removeClass("invert");

    $(".obstacle, .bush, .floor, .object, #finishLine").each(function () {
        $(this).css("left", $(this).data("initialLeft"));
    });
}
