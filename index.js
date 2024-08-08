const gameboard = (function () {
    // start / restart game

    const hideStartButton = () => {
        const startBtn = document.querySelector("#start-btn");
        startBtn.style.display = "none";
    };

    const showBoard = () => {
        const board = document.querySelector(".gameboard");
        board.style.display = "block";
        hideStartButton();
    };

    return { showBoard, hideStartButton };
})();

// player x and player o
const player = function () {
    // add mark in the board
    // add player name
    return {};
};

const playerX = player();
const playerO = player();

// * task 1
// when the player clicks the start button
// then 3x3 box will appear

// * task 2
// shows which player is current playing. starts with player x

// * task 3
// mark a box with the current player.

// * task 4
// add a check that only boxes that is not marked by a player will be mark

// * task 5
// check if there's boxes that contains 3 same mark that you can draw a line
// show which player wons then show the restart button

// * task 6
// check if all the boxes are already marked and the game is still not ended
// -- show restart the game button.
