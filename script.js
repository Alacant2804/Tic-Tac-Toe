const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

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

    return {
        board,
        checkForWinner,
        checkForTie,
        makeMove,
        resetBoard,
    };
})();


const Player = (name, symbol) => {
    return { name, symbol };
};

const UIController = {
    messageEl: document.querySelector('.message'),

    displayMessage: (message) => {
        UIController.messageEl.textContent = message;
    }
}

const GameController = (() => {
    const initializeGame = () => {
        const player1 = Player('Player 1', 'X'); 
        const player2 = Player('Player 2', 'O');
        
        const gameboardInstance = Gameboard; // Create an instance

        const startingPlayer = Math.random() < 0.5 ? player1 : player2;

        UIController.displayMessage(`Game started! ${startingPlayer.name} goes first.`);

        gameboardInstance.players = {
            player1,
            player2,
            currentPlayer: startingPlayer,
        };

        gameboardInstance.resetBoard(); // Call resetBoard on the instance
};
    

const makeMove = (index) => {
    // Check if the game is still ongoing
    if (!Gameboard.checkForWinner() && !Gameboard.checkForTie()) {
        // Get the current player
        const currentPlayer = Gameboard.players.currentPlayer;

        // Make a move on the board
        const moveSuccess = Gameboard.makeMove(index, currentPlayer.symbol);

        // If the move is successful, check for a winner or tie
        if (moveSuccess) {
            const clickedField = document.querySelector(`.field[data-index="${index}"]`);
            clickedField.textContent = currentPlayer.symbol;
            if (Gameboard.checkForWinner()) {
                UIController.displayMessage(`${currentPlayer.name} wins!`);
                // Handle any additional logic for a win
            } else if (Gameboard.checkForTie()) {
                UIController.displayMessage("It's a tie!");
                // Handle any additional logic for a tie
            } else {
                // Switch players for the next turn
                Gameboard.players.currentPlayer =
                    currentPlayer === Gameboard.players.player1
                        ? Gameboard.players.player2
                        : Gameboard.players.player1;

                // Update the UI with the next player's turn
                UIController.displayMessage(`${Gameboard.players.currentPlayer.name}'s turn.`);
            }

            // Update the display or perform other necessary actions
        } else {
            // Inform the player that the move is invalid (e.g., the cell is already taken)
            UIController.displayMessage('Invalid move. Try again.');
        }
    } else {
        // The game has already ended; display an appropriate message
        UIController.displayMessage('The game has ended. Restart to play again.');
    }
};

const restartGame = () => {
    const restartButton = document.querySelector('.restart-button');

    restartButton.addEventListener('click', () => {
        // Clear the content of each .field element
        document.querySelectorAll('.field').forEach(field => {
            field.textContent = '';
        });

        Gameboard.resetBoard();
    });
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
});

document.querySelector('.restart-button').addEventListener('click', () => {
    GameController.restartGame();
});

window.addEventListener('load', () => {
    GameController.initializeGame();
});
