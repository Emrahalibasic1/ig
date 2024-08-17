// handleIdleState.js

// Function to set the hero's state to idle based on the last direction they were moving
export function handleIdleState(lastDirection, setHeroState) {
    if (lastDirection === "running-right") {
        setHeroState("idle-right");  
    } else if (lastDirection === "running-left") {
        setHeroState("idle-left");  
    } else {
        setHeroState("idle-right"); // Default to idle facing right if no direction is specified
    }
}
