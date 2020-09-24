const gameMap = document.querySelector('#map');
const gameMapGrid = [];

function createMap(mapWidth, mapHeight) {
    // set map width and height based on mapSize param
    gameMap.style.width = (32 * mapWidth) + 'px';
    gameMap.style.height = (32 * mapHeight) + 'px';

    for (let i = 0; i < mapHeight; ++i) {
        const row = []
        for (let j = 0; j < mapWidth; ++j) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            gameMap.append(tile);
            row.push(tile);
        }
        gameMapGrid.push(row);
    }
}

function isValidPosition(xPos, yPos, xMax, yMax) {
    return xPos >= 0 && xPos < xMax && yPos >= 0 && yPos < yMax;
}

function generateBombs(noOfBombs, mapWidth, mapHeight) {
    let bombs = []
    for (let i = 0; i < noOfBombs; ++i) {
        let xCoord = parseInt(Math.random() * mapWidth);
        let yCoord = parseInt(Math.random() * mapHeight);
        let alreadyUsed = bombs.forEach(bomb => bomb[0] == yCoord && bomb[1] == xCoord);
        while (alreadyUsed) {
            xCoord = parseInt(Math.random() * mapWidth);
            yCoord = parseInt(Math.random() * mapHeight);
            alreadyUsed = bombs.forEach(bomb => bomb[0] == yCoord && bomb[1] == xCoord);
        }
        bombs.push([yCoord, xCoord]);
        gameMapGrid[yCoord][xCoord].classList.add('bomb');
    }

    const directionX = [1, -1, 0, 0, 1, -1, 1, -1];
    const directionY = [0, 0, 1, -1, 1, -1, -1, 1];
    for (let i = 0; i < mapHeight; ++i) {
        for (let j = 0; j < mapWidth; ++j) {
            if (!gameMapGrid[i][j].classList.contains('bomb')) {
                let counter = 0;
                for (let k = 0; k < 8; ++k) {
                    let tmpX = j + directionX[k];
                    let tmpY = i + directionY[k];
                    if (isValidPosition(tmpX, tmpY, mapWidth, mapHeight) &&
                        gameMapGrid[tmpY][tmpX].classList.contains('bomb')) {
                        counter++;
                    }
                }
                const textCounterTile = document.createElement('p');
                textCounterTile.classList.add('dataTile');
                textCounterTile.innerHTML = counter;
                gameMapGrid[i][j].append(textCounterTile);
            }
        }
    }
}

// the game suports the following maps: 9 x 9, 16 x 16, 30 x 16
createMap(9, 9);
generateBombs(9, 9, 9);