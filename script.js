let gameInProgress = true;

const Player = (name, symbol) => {
    return { name, symbol };
};

const symbolToPlayerMap = {
    'X': 'playerX',
    'O': 'playerO',
};

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const scores = {
        playerX: 0,
        tie: 0,
        playerO: 0,
    };

    const checkForWinner = () => {
        for (let i = 0; i < 9; i += 3) {
            if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
                return board[i]; 
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
                return board[i]; 
            }
        }

        if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
            return board[0]; 
        }

        if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
            return board[2]; 
        }

        return null;
    };

    const checkForTie = () => {
        const allCellsUsed = board.every(cell => cell !== '');
        const noWinner = checkForWinner() === null;

        return allCellsUsed && noWinner;
    };

    const makeMove = (index, symbol) => {
        if (index >= 0 && index < board.length && board[index] === '') {
            board[index] = symbol;
            return true;
        } else {
            return false;
        }
    };

    const resetBoard = () => {
        board.fill('');
    };

    const updateScores = () => {
        const winnerSymbol = checkForWinner();
    
        if (winnerSymbol) {
            const winnerPlayer = symbolToPlayerMap[winnerSymbol];
            scores[winnerPlayer] += 1;
        } else if (checkForTie()) {
            scores.tie += 1;
        }
    };

    return {
        board,
        scores,
        checkForWinner,
        checkForTie,
        makeMove,
        resetBoard,
        updateScores,
    };
})();

const UIController = {
    messageEl: document.querySelector('.message'),

    displayMessage: (message) => {
        UIController.messageEl.textContent = message;
    }
}

const GameController = (() => {
    let gameInProgress = true;
    const modal = document.getElementById('modal');
    const winnerMessage = document.getElementById('winner-message');
    const nextRoundButton = document.getElementById('next-round-btn');
    const quitButton = document.getElementById('quit-btn');

    const showModal = () => {
        modal.style.display = 'block';
    };

    const hideModal = () => {
        modal.style.display = 'none';
    };

    const startNextRound = () => {
        Gameboard.resetBoard();
        document.querySelectorAll('.field').forEach(field => {
            field.textContent = '';
            field.classList.remove('winning-cell');
        });
        const startingPlayer = Math.random() < 0.5 ? Gameboard.players.playerX : Gameboard.players.playerO;
        Gameboard.players.currentPlayer = startingPlayer;
        UIController.displayMessage(`Next round! ${startingPlayer.name} goes first.`);
        gameInProgress = true;
    };

    const resetScores = () => {
        Gameboard.scores.playerX = 0;
        Gameboard.scores.tie = 0;
        Gameboard.scores.playerO = 0;
        updateScoresUI();
    };

    const quitGame = () => {
        document.querySelectorAll('.field').forEach(field => {
            field.textContent = '';
            field.classList.remove('winning-cell');
        });
    
        Gameboard.resetBoard();
        Gameboard.updateScores();
        resetScores();
        gameInProgress = true;

        const startingPlayer = Gameboard.players.currentPlayer.name;
        UIController.displayMessage(`Game has ended. ${startingPlayer} starts the next round.`);
    };

    nextRoundButton.addEventListener('click', () => {
        hideModal();
        startNextRound();
    });

    quitButton.addEventListener('click', () => {
        hideModal();
        quitGame();
    });

    const showWinnerModal = (message) => {
        winnerMessage.innerHTML = `Congratulations! ${message}`;
        showModal();
    };

    const showTieModal = () => {
        winnerMessage.innerHTML = "It's a tie!";
        showModal();
    };
    
    const initializeGame = () => {
        const playerX = Player('Player X', 'X'); 
        const playerO = Player('Player O', 'O');
        
        const gameboardInstance = Gameboard; // Create an instance

        const startingPlayer = Math.random() < 0.5 ? playerX : playerO;

        UIController.displayMessage(`Game started! ${startingPlayer.name} goes first.`);

        gameboardInstance.players = {
            playerX,
            playerO,
            currentPlayer: startingPlayer,
        };

        gameboardInstance.resetBoard(); // Call resetBoard on the instance
    };

    const getWinningCombination = (board) => {
        const winPatterns = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return pattern; // Return the winning combination
            }
        }

        return null; // No winning combination found
    };

    const makeMove = (index) => {
        if (gameInProgress && !Gameboard.checkForWinner() && !Gameboard.checkForTie()) {
            const currentPlayer = Gameboard.players.currentPlayer;

            const moveSuccess = Gameboard.makeMove(index, currentPlayer.symbol);

            if (moveSuccess) {
                const clickedField = document.querySelector(`.field[data-index="${index}"]`);
                clickedField.classList.add('symbol-text');
                clickedField.textContent = currentPlayer.symbol;
                if (Gameboard.checkForWinner()) {
                    const winningCombination = getWinningCombination(Gameboard.board);
                    highlightWinningCells(winningCombination);
                    UIController.displayMessage(`${currentPlayer.name} wins!`);
                    showWinnerModal(`${currentPlayer.name} wins!`);
                } else if (Gameboard.checkForTie()) {
                    UIController.displayMessage("It's a tie!");
                    showTieModal();
                } else {
                    Gameboard.players.currentPlayer =
                        currentPlayer === Gameboard.players.playerX
                            ? Gameboard.players.playerO
                            : Gameboard.players.playerX;

                    UIController.displayMessage(`${Gameboard.players.currentPlayer.name}'s turn.`);
                }

                Gameboard.updateScores();
                updateScoresUI();

            } else {
                UIController.displayMessage('Invalid move. Try again.');
            }
        } else {
            UIController.displayMessage('The game has ended. Restart to play again.');
        }
    };

    const highlightWinningCells = (winningCombination) => {
        if (winningCombination) {
            winningCombination.forEach((index) => {
                const winningCell = document.querySelector(`.field[data-index="${index}"]`);
                winningCell.classList.add('winning-cell');
            });
        }
    };

    const restartGame = () => {
        document.querySelectorAll('.field').forEach(field => {
            field.textContent = '';
            field.classList.remove('winning-cell');
        });

        Gameboard.resetBoard();
        Gameboard.updateScores();
        updateScoresUI();
    };

    const updateScoresUI = () => {
        console.log("Updating scores UI");
        // Update the UI with the scores
        console.log("Player X count:", Gameboard.scores.playerX); 
        console.log("Tie count:", Gameboard.scores.tie);
        console.log("Player O count:", Gameboard.scores.playerO);

        document.querySelector('.playerX-count').textContent = Gameboard.scores.playerX;
        document.querySelector('.tie-count').textContent = Gameboard.scores.tie;
        document.querySelector('.playerO-count').textContent = Gameboard.scores.playerO;
    };

        return {
            initializeGame,
            makeMove,
            restartGame,
        };
})();

document.querySelectorAll('.field').forEach((field, index) => {
    field.addEventListener('click', () => {
        GameController.makeMove(index);
    });

    field.addEventListener('mouseenter', () => {
        if (gameInProgress && !Gameboard.checkForWinner() && !Gameboard.checkForTie() && field.textContent === '') {
            field.classList.add('hover-highlight');
        }
    });

    field.addEventListener('mouseleave', () => {
        field.classList.remove('hover-highlight');
    });
});

document.querySelector('.restart-button').addEventListener('click', () => {
    GameController.restartGame();
});

window.addEventListener('load', () => {
    GameController.initializeGame();
});