// 0 player tile
// 1 - wall tile
// 2 - point tile
// 3 - road tile
// 4 - ghost tile
// 5 - item tile
export const map = [1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,
                    1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,
                    1,2,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,
                    1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
                    1,2,1,2,1,2,1,1,2,1,1,2,1,2,1,2,1,
                    1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,
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

export const ghost1Speed = 500;
export const ghost2Speed = 1000;
export const ghost3Speed = 1500;
export const ghost4Speed = 2000;

export const scareGhostInterval = 5000;
export const generatePoweUpsInterval = 60000;

export const backgroundSound = new Audio('assets/sound/pacman_intro.mp3');
export const gameOverSound = new Audio('assets/sound/pacman_death.mp3');
export const eatGhostSound = new Audio('assets/sound/pacman_eatghost.wav');
