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
    displayMessage: (message) => {
        const messageEl = document.querySelector('.message');
        const para = document.createElement('p');
        para.textContent = message;
        messageEl.appendChild(para);
    }
}

const GameController = (() => {
    const initializeGame = () => {
        const player1 = Player('Player 1', 'X');
        const player2 = Player('Player 2', 'O');
        
        const gameboardInstance = Gameboard(); // Create an instance

        gameboardInstance.resetBoard(); // Call resetBoard on the instance

        const startingPlayer = Math.random() < 0.5 ? player1 : player2;

        UIController.displayMessage(`Game started! ${startingPlayer.name} goes first.`);

        gameboardInstance.players = {
            player1,
            player2,
            startingPlayer,
        };
};
    

    const makeMove = (index) => {
        // Make a move on the board
        // Example: Gameboard.makeMove(index, currentPlayer.symbol);
        // Example: Check for winner or tie
        // Example: Switch players
    };

    const restartGame = () => {
        // Restart the game
        // Example: Gameboard.resetBoard();
        // Example: Reset scores or any other game-related data
        // Example: Set currentPlayer to playerX
    };

    return {
        initializeGame,
        makeMove,
        restartGame,
    };
})();

// Event listeners for interactive elements
document.querySelectorAll('.field').forEach((field, index) => {
    field.addEventListener('click', () => {
        GameController.makeMove(index);
        // Update the display or any other necessary actions
    });
});

document.querySelector('.restart-button').addEventListener('click', () => {
    GameController.restartGame();
    // Update the display or any other necessary actions
});

// Initialize the game when the page loads
window.addEventListener('load', () => {
    GameController.initializeGame();
    // Update the display or any other necessary actions
});
