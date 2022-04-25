const gameState = { 
    speed: 240, 
    ups: 380
};

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth /** window.devicePixelRatio*/,
    height: window.innerHeight /** window.devicePixelRatio*/, 
    fps: {target: 60},
    backgroundColor: "f0f2fa",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 600},
            enableBody: true
            //debug: true
        }
    },

    scene: [Room1]
};

const game = new Phaser.Game(config);

// Random number, 0 or x
function bRand(x = 1) {return Math.round(Math.random()) * x;}
// Random integer, 0 to x
function iRand(x) {return Math.floor(Math.random() * x);}
// XOR all rows of maze
function mergeMaze(x, y) {
    const SIZE = 4;
    for (var i = 0; i < SIZE; ++i) {
        x[i] |= y[i];
    }
}
// Make the walls for the maze
function Maze() {
    const MAZEW = 8;
    const HMASK = 1;
    const VMASK = 2;
    const SIZE = 4;
    "use strict";
    this.maze = new Array(SIZE).fill(0);
    
    // Pick from bucket of four options without replacement
    // This variable's copies will be used a lot with .push
    // Each time it will pick one change of four, three times
    let pick3 = [];

    // Subdivision 1: into four pieces
    // Vertical holes
    for (var reps = 0; reps < 2; ++reps) {
        let changed = this.maze.slice(0);
        changed[bRand() + reps * 2] |= (HMASK << (MAZEW +
            bRand(MAZEW * 2))) >>> 2;
        pick3.push(changed);
    }
    
    // Horizontal holes
    for (var reps = 0; reps < 2; ++reps) {
        let changed = this.maze.slice(0);
        changed[1] |= (VMASK << (iRand(MAZEW) << reps)) << 16;
        pick3.push(changed);
    }

    // Finish subdivision 1 by picking 3 changes from pick3
    for (var i = 0; i < SIZE - 1; ++i) {
        var listIndex = iRand(pick3.length); // already -1
        var temp = pick3[pick3.length - 1];
        pick3[pick3.length - 1] = pick3[listIndex];
        pick3[listIndex] = temp;
        mergeMaze(this.maze, pick3.pop());
    }
}
