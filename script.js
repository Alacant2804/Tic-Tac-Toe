const myName = function(_default = 'Player') {
    const playerName = prompt("Player's name: ") || _default;
    return playerName;
}

const mySymbol = function() {
    let playerSymbol;
    do {
        playerSymbol = prompt("Player's symbol (X or O): ");
        if (playerSymbol !== 'X' && playerSymbol !== 'O') {
            alert('Invalid symbol, try again!');
        }
    } while (playerSymbol !== 'X' && playerSymbol !== 'O');

    return playerSymbol;
}


const gameboard = {
    board: [ , , ,
      , , ,    
      , , ,]
}

const players = {
    name: myName,
    symbol: mySymbol
}

const game = {

}