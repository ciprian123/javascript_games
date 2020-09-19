import * as Config from "./config.js"

const userScore = document.querySelector("#score");
const gameMap = document.querySelector("#map");

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

function movePlayerUp() {
    if (playerIndex - mapHeight >= 0 && !Config.tiles[playerIndex].classList.contains('wallTile')) {
        Config.tiles[playerIndex].classList.remove('playerTile');
        Config.tiles[playerIndex].classList.add('roadTile');

        playerIndex -= mapHeight;
        Config.tiles[playerIndex].classList.remove('pointTile');
        Config.tiles[playerIndex].classList.add('playerTile');
    }
    else if (playerIndex == 8) {
        // move from top to bottom
        Config.tiles[playerIndex].classList.remove('playerTile');
        playerIndex = 263;
    }
}

function movePlayer(event) {
    // player moves up
    if (event.keyCode == 38) {
        if (playerIndex - mapHeight >= 0 && !Config.tiles[playerIndex].classList.contains('wallTile')) {
            Config.tiles[playerIndex].classList.remove('playerTile');
            Config.tiles[playerIndex].classList.add('roadTile');

            playerIndex -= mapHeight;
            Config.tiles[playerIndex].classList.remove('pointTile');
            Config.tiles[playerIndex].classList.add('playerTile');
        }
        else if (playerIndex == 8) {
            // move from top to bottom
            Config.tiles[playerIndex].classList.remove('playerTile');
            playerIndex = 263;
        }
        
    }
}

renderMap(); 

document.addEventListener('keyup', movePlayer);
document.addEventListener('keydown', movePlayer);