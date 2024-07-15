// handleIdleState.js

export function handleIdleState(lastDirection, setHeroState) {
    if (lastDirection === "running-right") {
        setHeroState("idle-right");
    } else if (lastDirection === "running-left") {
        setHeroState("idle-left");
    } else {
        setHeroState("idle-right");
    }
}
