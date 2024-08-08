const player = function (name) {
    let selectedBoxes = [];

    const recordSelectedBox = (boxId) => {
        selectedBoxes.push(boxId);
    };

    const emptySelectedBoxes = () => {
        selectedBoxes = [];
    };

    const getSelectedBoxes = () => {
        return [...selectedBoxes]; // Return a copy to prevent external modification
    };

    return { name, getSelectedBoxes, recordSelectedBox, emptySelectedBoxes };
};

const gameboard = (function () {
    // start / restart game
    const playerX = player("x");
    const playerO = player("0");
    const winningPatterns = ["123", "456", "789", "147", "258", "369", "159", "357"];

    let currentPlayer = playerX;

    const hideStartButton = () => {
        const startBtn = document.querySelector("#start-btn");
        startBtn.style.display = "none";
    };

    const showHeader = () => {
        const header = document.querySelector("#header");
        header.style.display = "block";

        const player = document.querySelector("#player");
        if (player) player.innerHTML = currentPlayer.name;
    };

    const showBoard = () => {
        const board = document.querySelector(".gameboard");
        board.style.display = "block";
        hideStartButton();
        showHeader();
    };

    const restartGame = () => {
        playerX.emptySelectedBoxes();
        playerO.emptySelectedBoxes();

        currentPlayer = playerX;
        currentPlayer.emptySelectedBoxes();

        const header = document.querySelector("#header");
        header.innerHTML = `Current Player: <span id="player">${currentPlayer.name}</span>`;

        const restartContainer = document.querySelector(".restart-container");
        restartContainer.style.display = "none";

        // remove all marks in boxes
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            const p = box.querySelector("p");
            p.innerHTML = "";
        });
    };

    const gameEnded = () => {
        const header = document.querySelector("#header");
        header.innerHTML = `The game ended! Player ${currentPlayer.name} won the game!`;

        const restartContainer = document.querySelector(".restart-container");
        restartContainer.style.display = "block";
    };

    const checkWinningPattern = () => {
        if (currentPlayer.getSelectedBoxes().length >= 3) {
            // -- loop through the winning patterns
            winningPatterns.forEach((pattern) => {
                // compare the current player's selected boxes with the current winning pattern.
                // if the count of duplicate id's is 3 then the current player won the game
                const duplicates = currentPlayer.getSelectedBoxes().filter((item) => pattern.includes(item));
                if (duplicates.length == 3) {
                    gameEnded();
                }
            });
        }
    };

    const markBox = (event) => {
        const selectedBox = event.target;
        const pTag = selectedBox.querySelector("p");
        const boxId = selectedBox.id;
        if (pTag !== "") pTag.innerHTML = currentPlayer.name;
        currentPlayer.recordSelectedBox(boxId);
        checkWinningPattern();
    };

    return { showBoard, markBox, restartGame };
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
