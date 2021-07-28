// HTML elements

const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// game variables

let gameIsLive = true;
let xIsNext = true;


// game constants
const xSymbol = '×';
const oSymbol = '○';

// functions

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
};

const checkGameStatus = () => {

    // getting cellDivs using for loop below
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    // check winner 

    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);

    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);

    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);

    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);

    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);

    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);

    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);

    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);

    }
    // if above cases is not passed and all values are defined then it will be a tie
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    } else {
        
        xIsNext = !xIsNext;
        
        if (xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};




// event handler

const handleReset = (e) => {
    xIsNext = true;
   
    statusDiv.innerHTML = `${xSymbol} is next`
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');

    }
    gameIsLive = true ;
};

const handleCellClick = (e) => {
    // console.log(e.target.classList); after click there is target attribute inside it we get classlist
    // console.log(e.target.classList);
    const classList = e.target.classList;
    const location = classList[1];
    // console.log(location);

    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    if (xIsNext) {
        classList.add('x');
        checkGameStatus();



    }
    else {
        classList.add('o');
        checkGameStatus();


    }
};



// event listener

resetDiv.addEventListener('click', handleReset)

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}