const player = function (mark = "x") {
    let selectedBoxes = [];
    let name = "";

    const recordSelectedBox = (boxId) => {
        selectedBoxes.push(boxId);
    };

    const emptySelectedBoxes = () => {
        selectedBoxes = [];
    };

    const getSelectedBoxes = () => {
        return [...selectedBoxes]; // Return a copy to prevent external modification
    };

    const changeName = (newName) => {
        name = newName;
    };

    const getName = () => {
        return name;
    };

    return { mark, name, getSelectedBoxes, recordSelectedBox, emptySelectedBoxes, changeName, getName };
};

const gameboard = (function () {
    const playerX = player("x");
    const playerO = player("o");
    const winningPatterns = ["123", "456", "789", "147", "258", "369", "159", "357"];
    let totalSelectedBoxes = 0;
    let currentPlayer = playerX;

    const hideStartContainer = () => {
        const startBtn = document.querySelector(".start-container");
        startBtn.style.display = "none";
    };

    const showHeader = () => {
        const header = document.querySelector("#header");
        header.style.display = "block";

        const player = document.querySelector("#player");
        if (player) player.innerHTML = currentPlayer.getName();
    };

    const startGame = () => {
        const board = document.querySelector(".gameboard");
        board.style.display = "block";

        const player1 = document.querySelector("#player1");
        playerX.changeName(player1.value);

        const player2 = document.querySelector("#player2");
        playerO.changeName(player2.value);

        hideStartContainer();
        showHeader();
    };

    const restartGame = () => {
        playerX.emptySelectedBoxes();
        playerO.emptySelectedBoxes();

        currentPlayer = playerX;
        currentPlayer.emptySelectedBoxes();

        totalSelectedBoxes = 0;

        const header = document.querySelector("#header");
        header.innerHTML = `Current Player: <span id="player">${currentPlayer.getName()}</span>`;

        const restartContainer = document.querySelector(".restart-container");
        restartContainer.style.display = "none";

        // remove all marks in boxes
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            const p = box.querySelector("p");
            p.innerHTML = "";
        });
    };

    const gameEnded = (isNoAvailableMoves) => {
        const header = document.querySelector("#header");

        if (!isNoAvailableMoves) {
            header.innerHTML = `The game ended! Player ${currentPlayer.getName()} won the game!`;
        } else {
            header.innerHTML = `The game ended! No Player won the game`;
        }

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

    const checkNoAvailableMoves = () => {
        if (totalSelectedBoxes == 9) {
            gameEnded(true);
        }
    };

    const changePlayer = () => {
        if (currentPlayer.getName() == playerX.getName()) {
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }

        const player = document.querySelector("#player");
        if (player) player.innerHTML = currentPlayer.getName();
    };

    const markBox = (event) => {
        const selectedBox = event.target;
        const pTag = selectedBox.querySelector("p");
        const boxId = selectedBox.id;
        if (pTag !== "") pTag.innerHTML = currentPlayer.mark;
        currentPlayer.recordSelectedBox(boxId);
        totalSelectedBoxes++;
        checkWinningPattern();
        checkNoAvailableMoves();
        changePlayer();
    };

    return { startGame, markBox, restartGame };
})();
