// 0 player tile
// 1 - wall tile
// 2 - point tile
// 3 - road tile
// 4 - ghost tile
// 5 - item tile
export const map = [1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,
                    1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,
                    1,2,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,
                    1,2,2,2,2,2,1,1,2,1,1,2,2,2,2,2,1,
                    1,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1,
                    1,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1,
                    1,2,2,2,2,2,1,1,2,1,1,2,2,2,2,2,1,
                    1,2,1,1,1,2,1,3,3,3,1,2,1,1,1,2,1,
                    2,2,2,2,2,2,2,3,0,3,2,2,2,2,2,2,2,
                    1,2,1,1,2,1,1,3,3,3,1,1,2,1,1,2,1,
                    1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,
                    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
                    1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,
                    1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,4,1,
                    1,4,2,2,2,1,1,1,2,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1];


export const tiles = [];
export const eatenPointsSoRar = [];
export const defaultTiles = [];

export const ghost1Speed = 1000;
export const ghost2Speed = 1500;
export const ghost3Speed = 2000;
export const ghost4Speed = 2500;

export const scareGhostInterval = 15000;
export const generatePoweUpsInterval = 60000;
