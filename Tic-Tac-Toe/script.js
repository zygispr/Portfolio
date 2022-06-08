// Kvadračiukų elementai
var topLeftSquare = document.getElementById('top-left');
var topSquare = document.getElementById('top');
var topRightSquare = document.getElementById('top-right');
var leftSquare = document.getElementById('left');
var centerSquare = document.getElementById('center');
var rightSquare = document.getElementById('right');
var bottomLeftSquare = document.getElementById('bottom-left');
var bottomSquare = document.getElementById('bottom');
var bottomRightSquare = document.getElementById('bottom-right');

var squaresArray = [topLeftSquare, topSquare, topRightSquare, leftSquare, centerSquare, rightSquare, bottomLeftSquare, bottomSquare, bottomRightSquare];
var markedSquaresArray = ['', '', '', '', '', '', '', '', ''];

var winnerText = document.getElementById('winner-text');
var winningSquares = [];
var counter = 0;
var gameEnd = false;

var xContainer = document.getElementById('x-container');
var yContainer = document.getElementById('y-container');

var score = { x: 0, y: 0 };
var xScore = document.getElementById('x-score');
var yScore = document.getElementById('y-score');

// x elementas, kurį pritaikysiu kvadračiukui
var ximg = document.createElement('img');
ximg.src = 'x.png';
ximg.setAttribute("style", "width: 150px");

// o elementas, kurį pritaikysiu kvadračiukui
var oimg = document.createElement('img');
oimg.src = 'o.png';
oimg.setAttribute("style", "width: 150px");

// squaresArray[1].appendChild(ximg);

xScore.innerHTML = score.x;
yScore.innerHTML = score.y;

function squarePressed(index) {
    counter++;
    if (!markedSquaresArray[index] && !gameEnd) {
        if (counter % 2 != 0) {
            squaresArray[index].innerHTML = '<img src="x.png" />';
            markedSquaresArray[index] = 'x';
        } else {
            squaresArray[index].innerHTML = '<img src="o.png" />';
            markedSquaresArray[index] = 'o';
        }
        checkWinningCondition(markedSquaresArray);
    }
}

function checkWinningCondition(arr) {
    if ((arr[0] == 'x' && arr[1] == 'x' && arr[2] == 'x') || (arr[0] == 'o' && arr[1] == 'o' && arr[2] == 'o')) {
        winningSquares = [0, 1, 2];
        endGame(arr[0], winningSquares);
    } else if ((arr[3] == 'x' && arr[4] == 'x' && arr[5] == 'x') || (arr[3] == 'o' && arr[4] == 'o' && arr[5] == 'o')) {
        winningSquares = [3, 4, 5];
        endGame(arr[3], winningSquares);
    } else if ((arr[6] == 'x' && arr[7] == 'x' && arr[8] == 'x') || (arr[6] == 'o' && arr[7] == 'o' && arr[8] == 'o')) {
        winningSquares = [6, 7, 8];
        endGame(arr[6], winningSquares);
    } else if ((arr[0] == 'x' && arr[3] == 'x' && arr[6] == 'x') || (arr[0] == 'o' && arr[3] == 'o' && arr[6] == 'o')) {
        winningSquares = [0, 3, 6];
        endGame(arr[0], winningSquares);
    } else if ((arr[1] == 'x' && arr[4] == 'x' && arr[7] == 'x') || (arr[1] == 'o' && arr[4] == 'o' && arr[7] == 'o')) {
        winningSquares = [1, 4, 7];
        endGame(arr[1], winningSquares);
    } else if ((arr[2] == 'x' && arr[5] == 'x' && arr[8] == 'x') || (arr[2] == 'o' && arr[5] == 'o' && arr[8] == 'o')) {
        winningSquares = [2, 5, 8];
        endGame(arr[2], winningSquares);
    } else if ((arr[0] == 'x' && arr[4] == 'x' && arr[8] == 'x') || (arr[0] == 'o' && arr[4] == 'o' && arr[8] == 'o')) {
        winningSquares = [0, 4, 8];
        endGame(arr[0], winningSquares);
    } else if ((arr[2] == 'x' && arr[4] == 'x' && arr[6] == 'x') || (arr[2] == 'o' && arr[4] == 'o' && arr[6] == 'o')) {
        winningSquares = [2, 4, 6];
        endGame(arr[2], winningSquares);
    } else if (!arr.includes('')) {
        winnerText.innerHTML = 'Draw!';
        winnerText.setAttribute('style', 'opacity: 1');
    }
}

function endGame(markedSquare, winningSquares) {
    gameEnd = true;
    winnerText.innerHTML = markedSquare + ' wins!';
    winnerText.setAttribute('style', 'opacity: 1');
    squaresArray[winningSquares[0]].setAttribute('style', 'background-color: gray');
    squaresArray[winningSquares[1]].setAttribute('style', 'background-color: gray');
    squaresArray[winningSquares[2]].setAttribute('style', 'background-color: gray');

    if (markedSquare == 'x') {
        score.x++;
        xScore.innerHTML = score.x;
        xContainer.setAttribute('style', 'background-color: lightgray');
        yContainer.setAttribute('style', 'background-color: none');
    } else {
        score.y++;
        yScore.innerHTML = score.y;
        xContainer.setAttribute('style', 'background-color: none');
        yContainer.setAttribute('style', 'background-color: lightgray');
    }
}

function reset() {
    counter = 0;
    gameEnd = false;
    winningSquares = [];
    winnerText.innerHTML = 'Template text';
    winnerText.setAttribute('style', 'opacity: 0');
    for (let i = 0; i < squaresArray.length; i++) {
        squaresArray[i].innerHTML = '';
        markedSquaresArray[i] = '';
        squaresArray[i].setAttribute('style', 'background-color: none');
    }
}

function clearScore() {
    reset();
    score.x = 0;
    score.y = 0;
    xScore.innerHTML = score.x;
    yScore.innerHTML = score.y;
    xContainer.setAttribute('style', 'background-color: none');
    yContainer.setAttribute('style', 'background-color: none');
}