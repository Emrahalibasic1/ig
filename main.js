// main.js

import { checkHeroSilhouetteOverlap } from './game.js';
import { handleIdleState } from './handleIdleState.js';
import { animateBushes } from './bushAnimation.js';
import { setupJumpHandling } from './handleIdleJump.js';
import { checkCollision } from './collision.js'; // Import funkcije za detekciju kolizije

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

    function startTimer() {
        startTime = Date.now();
        intervalId = setInterval(updateTimer, 100);
    }

    function updateTimer() {
        const now = Date.now();
        const elapsed = now - startTime;

        const minutes = Math.floor(elapsed / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((elapsed % 1000) / 100);

        $("#chronometer, .chronometer").text(`${pad(minutes, 2)}:${pad(seconds, 2)}`);
    }

    function pad(number, length) {
        return number.toString().padStart(length, "0");
    }

    function handleScroll(scrollDirection) {
        $(".start").fadeOut();

        const now = Date.now();
        if (!gameRunning || now - lastScrollTime < 16) return;
        lastScrollTime = now;

        if (!timerStarted) {
            startTimer();
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
            checkWin();
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

    setupJumpHandling(hero, gameRunning, isJumping, handleJump, touchStartY);

    function handleJump() {
        if (!gameRunning || isJumping) return;

        isJumping = true;
        hero.addClass("jump");
        setTimeout(() => {
            hero.removeClass("jump");
            isJumping = false;
        }, 500);
    }

    function checkCollisionsWrapper() {
        checkCollision(hero, gameOver);
    }

    setInterval(checkCollisionsWrapper, 100);

    function checkWin() {
        const heroPos = hero[0].getBoundingClientRect();
        const finishPos = finishLine[0].getBoundingClientRect();

        if (
            !(
                heroPos.right < finishPos.left ||
                heroPos.left > finishPos.right ||
                heroPos.bottom < finishPos.top ||
                heroPos.top > finishPos.bottom
            )
        ) {
            gameWin();
        }
    }

    function gameOver() {
        if (!gameRunning) return;
        gameRunning = false;
        clearInterval(intervalId);
        $(".start").fadeOut();
        $(".game-over").fadeIn();
    }

    function gameWin() {
        if (!gameRunning) return;
        gameRunning = false;
        clearInterval(intervalId);
        const now = Date.now();
        const elapsed = now - startTime;
        if (elapsed < highestScore || highestScore === 0) {
            highestScore = elapsed;
            const minutes = Math.floor(highestScore / (1000 * 60));
            const seconds = Math.floor((highestScore % (1000 * 60)) / 1000);
            const milliseconds = Math.floor((highestScore % 1000) / 10);
            $("#highestScore, .highestScore").text(
                `${pad(minutes, 2)}:${pad(seconds, 2)}`
            );
        }
        $(".win").fadeIn();
        $(".bestTime").fadeIn();
    }

    $(".restartButton").click(function () {
        resetGame();
        $(".game-over, .win").fadeOut();
    });

    function resetGame() {
        gameRunning = true;
        timerStarted = false;
        clearInterval(intervalId);
        $("#chronometer, .chronometer").text("00:00");

        hero.css("top", "calc(50% + 200px)");
        hero.removeClass("invert");

        $(".obstacle, .bush, .floor, .object, #finishLine").each(function () {
            $(this).css("left", $(this).data("initialLeft"));
        });
    }

    $(".obstacle, .bush, .floor, .object, #finishLine").each(function () {
        $(this).data("initialLeft", $(this).css("left"));
    });

    animateBushes();

    setInterval(() => {
        checkHeroSilhouetteOverlap(hero);
    }, 100);
});
