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
            // each tile will have the id its coordonates separated by dots
            tile.setAttribute('id', i + '.' + j);
            tile.classList.add('tile');

            // each tile's paragraph will have the id its coordonates separated by dots
            const textCounterTile = document.createElement('p');
            textCounterTile.classList.add('dataTile');

            textCounterTile.setAttribute('id', 'p.' + i + '.' + j)
            tile.append(textCounterTile);

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
                const textCounterTile = document.getElementById('p.' + i + '.' + j);
                textCounterTile.innerHTML = counter;
            }
        }
    }
}

function isValidToSearch(i, j) {
    if (!isValidPosition(i, j, gameMapGrid.length, gameMapGrid[0].length)) {
        return false;
    }
    if (gameMapGrid[i][j].classList.contains('bomb')) {
        return false;
    }
    return true;
}

function uncoverDataOnClick(i, j) {
    if (!isValidPosition(i, j, gameMapGrid.length, gameMapGrid[0].length)) {
        return;
    }
    if (gameMapGrid[i][j].classList.contains('bomb')) {
        window.alert('Game over');
    } else if (!gameMapGrid[i][j].classList.contains('visited')) {
        gameMapGrid[i][j].classList.add('visited');
        const directionX = [1, -1, 0, 0, 1, -1, 1, -1];
        const directionY = [0, 0, 1, -1, 1, -1, -1, 1];
        for (let k = 0; k < 8; ++k) {
            if (isValidToSearch(i + directionY[k], j + directionX[k])) {
                if (document.getElementById('p.' + i + '.' + j).innerHTML == '0' &&
                   (document.getElementById('p.' + (i + directionY[k]) + '.' + (j + directionX[k])).innerHTML == '0' ||
                    document.getElementById('p.' + (i + directionY[k]) + '.' + (j + directionX[k])).innerHTML != '0')  
                )
                uncoverDataOnClick(i + directionY[k], j + directionX[k]);
            }
        }
    }
}

// the game suports the following maps: 9 x 9, 16 x 16, 30 x 16
createMap(9, 9);
generateBombs(10, 9, 9);

for (let i = 0; i < gameMapGrid.length; ++i) {
    for (let j = 0; j < gameMapGrid[0].length; ++j) {
        gameMapGrid[i][j].addEventListener('click', (e) => {
            let targetId = e.target.id;
            if (targetId.indexOf("p") >= 0) {
                targetId = targetId.replace("p.", "");
            }
            let yCoord = parseInt(targetId.split('.')[0]);
            let xCoord = parseInt(targetId.split('.')[1]);

            // console.log(yCoord + ' ' + xCoord);
            uncoverDataOnClick(yCoord, xCoord);
        })
    }
}