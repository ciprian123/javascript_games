import * as Config from "./config.js"

const userScore = document.querySelector("#score");
const gameMap = document.querySelector("#map");

let tmpScore = 0;

const mapWidth = 17;
const mapHeight = 17;

let playerIndex = 144;

for (let i = 0; i < Config.map.length; ++i) {
    if (Config.map[i] == 20) {
        console.log(i);
    }
}

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
    }
}

function updateUserScore() {
    if (Config.tiles[playerIndex].classList.contains('pointTile')) {
        Config.tiles[playerIndex].classList.remove('pointTile');
        tmpScore++;
    }
    userScore.innerHTML = tmpScore;
}

function movePlayerUp() {
    if (playerIndex - mapHeight >= 0 && !Config.tiles[playerIndex].classList.contains('wallTile')) {
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
    if (playerIndex + mapHeight < Config.tiles.length && !Config.tiles[playerIndex].classList.contains('wallTile')) {
        
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
    else if (!Config.tiles[playerIndex].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex--;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
    }
    else {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex += mapWidth;
        Config.tiles[playerIndex].classList.add('playerTile');
        Config.tiles[playerIndex].classList.remove('pointTile');
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
    else if (!Config.tiles[playerIndex].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex++;
        updateUserScore();
        Config.tiles[playerIndex].classList.add('playerTile');
    }
    else {
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex -= mapWidth;
        Config.tiles[playerIndex].classList.add('playerTile');
        Config.tiles[playerIndex].classList.remove('pointTile');
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

renderMap(); 

document.addEventListener('keyup', movePlayer);