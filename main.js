// main.js

import { checkHeroSilhouetteOverlap } from './game.js';
import { handleIdleState } from './handleIdleState.js';
import { animateBushes } from './bushAnimation.js';
import { setupJumpHandling } from './handleIdleJump.js';
import { checkCollision } from './collision.js';
import { checkWin, checkCollisionWrapper, gameOver, gameWin } from './gameLogic.js';
import { startTimer, updateTimer, handleJump, resetGame, pad } from './gameUI.js';

$(document).ready(function () {
    const hero = $("#hero");
    const obstacles = $(".obstacle");
    const bush = $(".bush");
    const floor = $(".floor");
    const object = $(".object");
    const finishLine = $("#finishLine");
    let gameRunning = true;
    let timerStarted = false;
    let startTime, intervalId;
    let highestScore = 0;
    let gameWon = false;
    const scrollSpeed = 30;
    let isJumping = false;
    let lastScrollTime = 0;
    let isRunningRight = false;
    let isRunningLeft = false;
    let lastDirection = "idle-right";
    let touchStartX = 0;
    let touchStartY = 0;

    function setHeroState(state) {
        hero.removeClass("idle-right idle-left running-right running-left");
        hero.addClass(state);
    }

    function handleIdleStateWrapper() {
        handleIdleState(lastDirection, setHeroState);
    }

    setHeroState("idle-right");

    function handleScroll(scrollDirection) {
        if (!gameRunning) return; // Prevent hero from moving when the game is over

        $(".start").fadeOut();

        const now = Date.now();
        if (!gameRunning || now - lastScrollTime < 16) return;
        lastScrollTime = now;

        if (!timerStarted) {
            startTimer(setStartTime, setIntervalId, updateTimer);
            timerStarted = true;
        }

        if (scrollDirection < 0 && !isRunningRight) {
            isRunningRight = true;
            isRunningLeft = false;
            lastDirection = "running-right";
            setHeroState("running-right");
        } else if (scrollDirection > 0 && !isRunningLeft) {
            isRunningLeft = true;
            isRunningRight = false;
            lastDirection = "running-left";
            setHeroState("running-left");
        }

        clearTimeout(hero.data("scrollTimeout"));
        hero.data(
            "scrollTimeout",
            setTimeout(() => {
                isRunningRight = false;
                isRunningLeft = false;
                handleIdleStateWrapper();
            }, 200)
        );

        requestAnimationFrame(() => {
            $(".obstacle, .bush, .floor, .object, #finishLine").each(function () {
                const left = parseInt($(this).css("left"));
                $(this).css("left", left - scrollDirection * scrollSpeed + "px");
            });
            checkWin(hero, finishLine, () => gameWin(setGameRunning, intervalId, startTime, highestScore, pad, setHighestScore, setGameWon));
            checkHeroSilhouetteOverlap(hero);
        });
    }

    $(window).on("mousewheel DOMMouseScroll", function (e) {
        const delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        const scrollDirection = delta < 0 ? 1 : -1;
        handleScroll(scrollDirection);
    });

    $(document).on("touchstart", function (e) {
        touchStartX = e.originalEvent.touches[0].pageX;
        touchStartY = e.originalEvent.touches[0].pageY;
    });

    $(document).on("touchmove", function (e) {
        const touchEndX = e.originalEvent.touches[0].pageX;
        const touchEndY = e.originalEvent.touches[0].pageY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const scrollDirection = deltaX < 0 ? 1 : -1;
            handleScroll(scrollDirection);
        }
    });

    setupJumpHandling(hero, gameRunning, isJumping, () => {
        if (!gameRunning) return; // Prevent jumping when the game is over
        handleJump(hero, gameRunning, isJumping);
    }, touchStartY);

    setInterval(() => checkCollisionWrapper(hero, checkCollision, () => gameOver(setGameRunning, intervalId), gameWon), 100);

    $(".restartButton").click(function () {
        resetGame(hero, setGameRunning, setTimerStarted, intervalId);
        gameWon = false; // Reset gameWon flag when the game is restarted
        $(".game-over, .win").fadeOut();
    });

    $(".obstacle, .bush, .floor, .object, #finishLine").each(function () {
        $(this).data("initialLeft", $(this).css("left"));
    });

    animateBushes();

    setInterval(() => {
        checkHeroSilhouetteOverlap(hero);
    }, 100);

    function setStartTime(value) {
        startTime = value;
    }

    function setIntervalId(value) {
        intervalId = value;
    }

    function setGameRunning(value) {
        gameRunning = value;
    }

    function setTimerStarted(value) {
        timerStarted = value;
    }

    function setHighestScore(value) {
        highestScore = value;
    }

    function setGameWon(value) {
        gameWon = value;
    }
});
