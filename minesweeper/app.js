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

// the game suports the following maps: 9 x 9, 16 x 16, 30 x 16
createMap(9, 9);