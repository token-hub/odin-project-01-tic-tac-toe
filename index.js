// player x and player o
const player = function (name) {
    // add mark in the board
    // add player name

    let selectedBoxes = [];

    const recordSelectedBox = (boxId) => {
        selectedBoxes.push(boxId);
    };

    return { name, selectedBoxes, recordSelectedBox };
};

const gameboard = (function () {
    // start / restart game
    const playerX = player("x");
    const playerO = player("0");
    const winningPatterns = ["123", "456", "789", "147", "258", "369", "159", "357"];

    // if player x click box 1.
    // if the total count of player marks is => 3
    // -- loop through the winning patterns
    // -- each winning pattern will need to be loop again 3 times.
    // if a all the box numbers of the current winning pattern matches with the current player clicked boxes then it's a win.

    // * new task
    // record each box clicked by the current player.
    let currentPlayer = playerX;

    const hideStartButton = () => {
        const startBtn = document.querySelector("#start-btn");
        startBtn.style.display = "none";
    };

    const showHeader = () => {
        const header = document.querySelector("#header");
        header.style.display = "block";

        const player = document.querySelector("#player");
        player.innerHTML = currentPlayer.name;
    };

    const showBoard = () => {
        const board = document.querySelector(".gameboard");
        board.style.display = "block";
        hideStartButton();
        showHeader();
    };

    const markBox = (event) => {
        const selectedBox = event.target;
        const pTag = selectedBox.querySelector("p");
        const boxId = selectedBox.id;
        if (pTag !== "") pTag.innerHTML = currentPlayer.name;
        currentPlayer.recordSelectedBox(boxId);
        console.log(currentPlayer.selectedBoxes);
    };

    return { showBoard, markBox };
})();

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
