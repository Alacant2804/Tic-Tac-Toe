const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const checkForWinner = () => {
        // Check rows, columns, and diagonals for a winner
        // ...

        return null; // No winner
    };

    const checkForTie = () => {
        // Check if all cells are used
        const allCellsUsed = board.every(cell => cell !== '');

        // Check if there is no winner
        const noWinner = checkForWinner() === null;

        // If all cells are used and there is no winner, it's a tie
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
