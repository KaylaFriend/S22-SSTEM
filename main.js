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