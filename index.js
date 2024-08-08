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

const displayController = function () {
    const startBtn = document.querySelector(".start-container");
    const header = document.querySelector("#header");
    const board = document.querySelector(".gameboard");
    const restartContainer = document.querySelector(".restart-container");
    const boxes = document.querySelectorAll(".box");
    const player = document.querySelector("#player");

    const hideStartContainer = () => {
        startBtn.style.display = "none";
    };

    const showHeader = (playerName) => {
        header.style.display = "block";

        const player = document.querySelector("#player");
        if (player) player.innerHTML = playerName;
    };

    const showBoardGame = () => {
        board.style.display = "block";
    };

    const updatePlayerName = (targerPlayer, playerName) => {
        const player = document.querySelector(`#${playerName}`);
        targerPlayer.changeName(player.value);
    };

    const updateHeader = (playerName) => {
        header.innerHTML = `Current Player: <span id="player">${playerName}</span>`;
    };

    const restartContainerDisplay = (hide = false) => {
        restartContainer.style.display = hide ? "none" : "block";
    };

    const removeAllMarks = () => {
        boxes.forEach((box) => {
            const p = box.querySelector("p");
            p.innerHTML = "";
        });
    };

    const showEndedGameMessage = (playerName, isNoAvailableMoves) => {
        if (!isNoAvailableMoves) {
            header.innerHTML = `The game ended! Player ${playerName} won the game!`;
        } else {
            header.innerHTML = `The game ended! No Player won the game`;
        }
    };

    const updateCurrentPlayer = (pname) => {
        if (player) player.innerHTML = pname;
    };

    const markBox = (event, currentPlayer) => {
        const selectedBox = event.target;
        const pTag = selectedBox.querySelector("p");
        const boxId = selectedBox.id;
        if (pTag !== "") pTag.innerHTML = currentPlayer.mark;
        return boxId;
    };

    return {
        hideStartContainer,
        showHeader,
        showBoardGame,
        updatePlayerName,
        updateHeader,
        restartContainerDisplay,
        removeAllMarks,
        showEndedGameMessage,
        updateCurrentPlayer,
        markBox
    };
};

const gameboard = (function () {
    const playerX = player("x");
    const playerO = player("o");
    const display = displayController();
    const winningPatterns = ["123", "456", "789", "147", "258", "369", "159", "357"];
    let totalSelectedBoxes = 0;
    let currentPlayer = playerX;

    const startGame = () => {
        display.showBoardGame();
        display.updatePlayerName(playerX, "player1");
        display.updatePlayerName(playerO, "player2");
        display.hideStartContainer();
        display.showHeader(currentPlayer.getName());
    };

    const restartGame = () => {
        totalSelectedBoxes = 0;
        playerX.emptySelectedBoxes();
        playerO.emptySelectedBoxes();
        currentPlayer = playerX;
        display.updateHeader(currentPlayer.getName());
        display.restartContainerDisplay(true);
        display.removeAllMarks();
    };

    const gameEnded = (isNoAvailableMoves) => {
        display.showEndedGameMessage(currentPlayer.getName(), isNoAvailableMoves);
        display.restartContainerDisplay();
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

        display.updateCurrentPlayer(currentPlayer.getName());
    };

    const markBox = (event) => {
        const boxId = display.markBox(event, currentPlayer);
        currentPlayer.recordSelectedBox(boxId);
        totalSelectedBoxes++;
        checkWinningPattern();
        checkNoAvailableMoves();
        changePlayer();
    };

    return { startGame, markBox, restartGame };
})();
