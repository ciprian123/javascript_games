import * as Config from "./config.js"

const userScore = document.querySelector("#score");
const gameMap = document.querySelector("#map");

let tmpScore = 0;
let gameOver = false;

const mapWidth = 17;
const mapHeight = 17;

let playerIndex = 144;

function renderMap() {
    for (let i = 0; i < Config.map.length; ++i) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        if (Config.map[i] == 1) {
            // wall tile
            tile.classList.add('wallTile');
        }
        else if (Config.map[i] == 2) {
            // point tile
            tile.classList.add('pointTile');
        }
        else if (Config.map[i] == 3) {
            // wall tile
            tile.classList.add('roadTile')
        }
        else if (Config.map[i] == 0) {
            // player tile
            tile.classList.add('playerTile');
        }
        gameMap.appendChild(tile);
        Config.tiles.push(tile);
        Config.defaultTiles.push(tile);
        Config.eatenPointsSoRar.push(false);
    }
}

function updateUserScore() {
    if (Config.tiles[playerIndex].classList.contains('pointTile')) {
        Config.tiles[playerIndex].classList.remove('pointTile');
        tmpScore++;
        Config.eatenPointsSoRar[playerIndex] = true;
    }
    userScore.innerHTML = tmpScore;
}

function resetOrientation() {
    Config.tiles[playerIndex].classList.remove('move_up');
    Config.tiles[playerIndex].classList.remove('move_down');
    Config.tiles[playerIndex].classList.remove('move_left');
    Config.tiles[playerIndex].classList.remove('move_right');
}

function movePlayerUp() {
    Config.tiles[playerIndex].classList.add('move_up');
    if (playerIndex - mapHeight >= 0 && !Config.tiles[playerIndex - mapHeight].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        Config.tiles[playerIndex].classList.add('roadTile');
        resetOrientation();
        playerIndex -= mapHeight;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_up');
    }
    else if (playerIndex == 8) {
        // move from top to bottom
        Config.tiles[playerIndex].classList.remove('playerTile');
        resetOrientation();
        playerIndex = 263;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_up');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
}

function movePlayerDown() {
    Config.tiles[playerIndex].classList.add('move_down');
    if (playerIndex + mapHeight < Config.tiles.length && !Config.tiles[playerIndex + mapHeight].classList.contains('wallTile')) {
        
        Config.tiles[playerIndex].classList.remove('playerTile');
        Config.tiles[playerIndex].classList.add('roadTile');
        resetOrientation();
        playerIndex += mapHeight;

        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_down');
    }
    else if (playerIndex == 263) {
        // move from top to bottom
        Config.tiles[playerIndex].classList.remove('playerTile');
        resetOrientation();
        playerIndex = 8;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_down');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
}

function movePlayerLeft() {
    Config.tiles[playerIndex].classList.add('move_right');
    if (playerIndex == 136) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        resetOrientation();
        playerIndex = 152;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_right');
        Config.tiles[playerIndex].classList.remove('playerTile');
    }
    else if (!Config.tiles[playerIndex - 1].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        resetOrientation();
        playerIndex--;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_right');
    }
}

function movePlayerRight() {
    Config.tiles[playerIndex].classList.add('move_left');
    if (playerIndex == 152) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        resetOrientation();
        playerIndex = 136;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_left');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
    else if (!Config.tiles[playerIndex + 1].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        resetOrientation();
        playerIndex++;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('move_left');
    }
}

function movePlayer(event) {
    resetOrientation();
    if (event.keyCode == 38) {
        movePlayerUp();
    }
    else if (event.keyCode == 40) {
        movePlayerDown();
    }
    else if (event.keyCode == 37) {
        movePlayerLeft();
    }
    else if (event.keyCode == 39) {
        movePlayerRight();
    }
    if (Config.tiles[playerIndex].classList.contains('pinky') ||
        Config.tiles[playerIndex].classList.contains('inky') ||
        Config.tiles[playerIndex].classList.contains('blinky') ||
        Config.tiles[playerIndex].classList.contains('clyde') ) {
        alertGameOver();
    }

    console.log(Config.tiles[playerIndex].classList);
}

renderMap(); 

document.addEventListener('keyup', movePlayer);


// the ghost are spamming in the map corners, not in the center of the map
let ghostIndex1 = 18;
let ghostIndex2 = 32;
let ghostIndex3 = 236;
let ghostIndex4 = 239;

Config.tiles[ghostIndex1].classList.add('blinky');
Config.tiles[ghostIndex2].classList.add('inky');
Config.tiles[ghostIndex3].classList.add('pinky');
Config.tiles[ghostIndex4].classList.add('clyde');

// function to reset powerUps
function resetPoweUps() {
    Config.tiles.forEach(tile => {
        if (tile.classList.contains('powerUpTile')) {
            tile.classList.remove('powerUpTile');
        }
    })
}

// function to generate random 5 power ups
function generatePoweUps() {
    resetPoweUps();
    let availablePositions = Config.tiles.filter(tile => !tile.classList.contains('playerTile') &&
                                                        !tile.classList.contains('wallTile') &&
                                                        !tile.classList.contains('ghostTile')
                                                );

    let powerUpIndex1 = parseInt(Math.random() * availablePositions.length);
    let powerUpIndex2 = parseInt(Math.random() * availablePositions.length);
    let powerUpIndex3 = parseInt(Math.random() * availablePositions.length);
    let powerUpIndex4 = parseInt(Math.random() * availablePositions.length);
    let powerUpIndex5 = parseInt(Math.random() * availablePositions.length);


    availablePositions[powerUpIndex1].classList.add('powerUpTile');
    availablePositions[powerUpIndex2].classList.add('powerUpTile');
    availablePositions[powerUpIndex3].classList.add('powerUpTile');
    availablePositions[powerUpIndex4].classList.add('powerUpTile');
    availablePositions[powerUpIndex5].classList.add('powerUpTile');
}


function isValidGhostMoveIndex(index) {
    return index >= 0 && 
           index < Config.tiles.length &&
           !Config.tiles[index].classList.contains('wallTile') &&
           !Config.tiles[index].classList.contains('ghostTile') &&
           !Config.tiles[index].classList.contains('clyde') &&
           !Config.tiles[index].classList.contains('pinky') &&
           !Config.tiles[index].classList.contains('blinky') &&
           !Config.tiles[index].classList.contains('inky');
}

function rotateArray(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function clearGhost(index) {
    Config.tiles[index].classList.remove('blinky');
    Config.tiles[index].classList.remove('inky');
    Config.tiles[index].classList.remove('pinky');
    Config.tiles[index].classList.remove('clyde');
}

function getGhost(index) {
    if (Config.tiles[index].classList.contains('blinky')) {
        return 'blinky';
    }
    if (Config.tiles[index].classList.contains('pinky')) {
        return 'pinky';
    }
    if (Config.tiles[index].classList.contains('inky')) {
        return 'inky';
    }
    if (Config.tiles[index].classList.contains('clyde')) {
        return 'clyde';
    }
    return '';
}

function alertGameOver() {
    gameOver = true;
    Config.tiles[playerIndex].classList.add('gameOverPlayer');

    // adding a small delay defore showing game over pop up
    setTimeout(function(){
        window.alert('GAME OVER!');
        window.location.href = window.location.href;
    }, 1000);
}

function moveGhostEasyDifficulty(ghostIndex) {
    let directions = [];

    if (isValidGhostMoveIndex(ghostIndex + 1)) {
        directions.push(1);
    }
    if (isValidGhostMoveIndex(ghostIndex - 1)) {
        directions.push(-1);
    }
    if (isValidGhostMoveIndex(ghostIndex + mapWidth)) {
        directions.push(mapWidth);
    }
    if (isValidGhostMoveIndex(ghostIndex - mapWidth)) {
        directions.push(-mapWidth);
    }

    const direction = directions[parseInt(Math.random() * directions.length)];
    let ghostName = getGhost(ghostIndex);
    clearGhost(ghostIndex);
    if (Config.eatenPointsSoRar[ghostIndex] == false && !Config.tiles[ghostIndex].classList.contains('roadTile')) {
        Config.tiles[ghostIndex].classList.add('pointTile');
    }
    ghostIndex += direction;
    if (Config.tiles[ghostIndex].classList.contains('move_up') ||
        Config.tiles[ghostIndex].classList.contains('move_down') ||
        Config.tiles[ghostIndex].classList.contains('move_left') ||
        Config.tiles[ghostIndex].classList.contains('move_right')) {
            alertGameOver();
    }
    Config.tiles[ghostIndex].classList.remove('pointTile');
    Config.tiles[ghostIndex].classList.add(ghostName);
    rotateArray(directions);

    return ghostIndex;
}


generatePoweUps();

const moveGhost1 = setInterval(() => {
    if (!gameOver) {
        ghostIndex1 = moveGhostEasyDifficulty(ghostIndex1);
    } else {
        clearInterval(moveGhost1);
    }
    for (let i = 0; i < Config.tiles.length; ++i) {
        if (Config.tiles[i].classList.contains('inky') ||
            Config.tiles[i].classList.contains('pinky') ||
            Config.tiles[i].classList.contains('blinky') ||
            Config.tiles[i].classList.contains('clyde') ) {
            console.log(i);
        }
    }
    console.log("*************************");
}, 1500);

const moveGhost2 = setInterval(() => {
    if (!gameOver) {
        ghostIndex2 = moveGhostEasyDifficulty(ghostIndex2);
    } else {
        clearInterval(moveGhost2);
    }
}, 2000);

const moveGhost3 = setInterval(() => {
    if (!gameOver) {
        ghostIndex3 = moveGhostEasyDifficulty(ghostIndex3);
    } else {
        clearInterval(moveGhost3);
    }
}, 2500);

const moveGhost4 = setInterval(() => {
    if (!gameOver) {
        ghostIndex4 = moveGhostEasyDifficulty(ghostIndex4);
    } else {
        clearInterval(ghostIndex4);
    }
}, 2700);

const generatePowers = setInterval(() => {
    if (!gameOver) {
        generatePoweUps();
    } else {
        clearInterval(generatePoweUps);
    }
}, 25000);