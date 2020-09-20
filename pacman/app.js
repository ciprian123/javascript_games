import * as Config from "./config.js"

const userScore = document.querySelector("#score");
const gameMap = document.querySelector("#map");

let tmpScore = 0;

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
        else if (Config.map[i] == 4) {
            // ghost tile
            tile.classList.add('ghostTile');
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

function movePlayerUp() {
    if (playerIndex - mapHeight >= 0 && !Config.tiles[playerIndex - mapHeight].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        Config.tiles[playerIndex].classList.add('roadTile');

        playerIndex -= mapHeight;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
    }
    else if (playerIndex == 8) {
        // move from top to bottom
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex = 263;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
}

function movePlayerDown() {
    if (playerIndex + mapHeight < Config.tiles.length && !Config.tiles[playerIndex + mapHeight].classList.contains('wallTile')) {
        
        Config.tiles[playerIndex].classList.remove('playerTile');
        Config.tiles[playerIndex].classList.add('roadTile');

        playerIndex += mapHeight;

        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
    }
    else if (playerIndex == 263) {
        // move from top to bottom
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex = 8;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
}

function movePlayerLeft() {
    if (playerIndex == 136) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex = 152;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
    else if (!Config.tiles[playerIndex - 1].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex--;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
    }
}

function movePlayerRight() {
    if (playerIndex == 152) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex = 136;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
        Config.tiles[playerIndex].classList.remove('pointTile');
    }
    else if (!Config.tiles[playerIndex + 1].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex++;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
    }
}

function movePlayer(event) {
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
}

function resetMap() {
    Config.tiles = [...Config.defaultTiles]
}

renderMap(); 

document.addEventListener('keyup', movePlayer);


// the ghost are spamming in the map corners, not in the center of the map
let ghostIndex1 = 18;
let ghostIndex2 = 32;
let ghostIndex3 = 236;
let ghostIndex4 = 239;

function isValidGhostMoveIndex(index) {
    return index >= 0 && 
           index < Config.tiles.length &&
           !Config.tiles[index].classList.contains('wallTile') &&
           !Config.tiles[index].classList.contains('ghostTile');
}

function rotateArray(arr) {
    let tmp = arr[0];
    arr.pop();
    arr.push(tmp);
}

function moveGhostEasyDifficulty(ghostIndex) {
    const directions = [1, -1, mapHeight, -mapHeight];
    for (let i = 0; i < directions.length; ++i) {
        if (isValidGhostMoveIndex(ghostIndex + directions[i])) {
            Config.tiles[ghostIndex].classList.remove('ghostTile');
            if (Config.eatenPointsSoRar[ghostIndex] == false) {
                Config.tiles[ghostIndex].classList.add('pointTile');
            }
            ghostIndex += directions[i];
            Config.tiles[ghostIndex].classList.remove('pointTile');
            Config.tiles[ghostIndex].classList.add('ghostTile');
            break;
        }
    }
    return ghostIndex;
}

setInterval(() => {
    ghostIndex1 = moveGhostEasyDifficulty(ghostIndex1);
    console.log(1);
}, 700);

setInterval(() => {
    ghostIndex2 = moveGhostEasyDifficulty(ghostIndex2);
}, 900);

setInterval(() => {
    ghostIndex3 = moveGhostEasyDifficulty(ghostIndex3);
}, 1100);

setInterval(() => {
    ghostIndex4 = moveGhostEasyDifficulty(ghostIndex4);
}, 1300);