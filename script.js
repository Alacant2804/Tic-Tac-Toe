const gameboard = {

}

const players = {
    name: myName(),
    symbol: mySymbol
}

const game = {

}

const myName = function(_default = 'Player') {
    const playerName = prompt("Player's name: ") || _default;
    return playerName;
}

const mySymbol = function() {
    const playerSymbol = prompt("Player's symbol: ");
    if (playerSymbol != 'X' && playerSymbol != 'O') {
        alert('Invalid symbol, try again!');
    }
    return playerSymbol;
}