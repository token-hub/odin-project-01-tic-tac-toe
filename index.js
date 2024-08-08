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
        return [...selectedBoxes];
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

    const startContainerDisplay = (hide = false) => {
        startBtn.style.display = hide ? "none" : "block";
    };

    const headerDisplay = (playerName, mark, hide = false) => {
        header.style.display = hide ? "none" : "block";

        const player = document.querySelector("#player");
        if (player) player.innerHTML = `${playerName} (${mark})`;
    };

    const boardGameDisplay = (hide = false) => {
        board.style.display = hide ? "none" : "block";
    };

    const updatePlayerName = (targerPlayer, playerName) => {
        const player = document.querySelector(`#${playerName}`);
        targerPlayer.changeName(player.value);
        player.value = "";
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

    const updateCurrentPlayer = (pname, mark) => {
        if (player) player.innerHTML = `${pname} (${mark})`;
    };

    const markBox = (event, currentPlayer) => {
        const selectedBox = event.target;
        const pTag = selectedBox.querySelector("p");
        const boxId = selectedBox.id;
        if (pTag !== "") pTag.innerHTML = currentPlayer.mark;
        return boxId;
    };

    return {
        startContainerDisplay,
        headerDisplay,
        boardGameDisplay,
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
    let isEnded = false;

    const startGame = () => {
        display.boardGameDisplay();
        display.updatePlayerName(playerX, "player1");
        display.updatePlayerName(playerO, "player2");
        display.startContainerDisplay(true);
        display.headerDisplay(currentPlayer.getName(), currentPlayer.mark);
    };

    const restartGame = () => {
        totalSelectedBoxes = 0;
        isEnded = false;
        playerX.emptySelectedBoxes();
        playerO.emptySelectedBoxes();
        currentPlayer = playerX;
        display.updateHeader(currentPlayer.getName());
        display.restartContainerDisplay(true);
        display.removeAllMarks();
        display.boardGameDisplay(true);
        display.headerDisplay(currentPlayer.getName(), currentPlayer.mark, true);
        display.startContainerDisplay();
    };

    const gameEnded = (isNoAvailableMoves) => {
        isEnded = true;
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

        display.updateCurrentPlayer(currentPlayer.getName(), currentPlayer.mark);
    };

    const markBox = (event) => {
        if (isEnded) return;
        const boxId = display.markBox(event, currentPlayer);
        currentPlayer.recordSelectedBox(boxId);
        totalSelectedBoxes++;
        checkWinningPattern();
        checkNoAvailableMoves();
        changePlayer();
    };

    return { startGame, markBox, restartGame };
})();
