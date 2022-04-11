class Level2 extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.levelKey = key;
        /*this.nextLevel = {
            'MainRoom1' : 'MainRoom_Tripp',
            'MainRoom_Tripp' : 'MainRoom_Kayla',
            'MainRoom_Kayla' : 'MainRoom',
            'MainRoom' : 'room1',
            '' : ''
            '' : ''
            'room1' : 'MainRoom1'
          }*/
    }

    loadAssets() {
        this.load.spritesheet('player', './Free/Main Characters/Mask Dude/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerJump', './Free/Main Characters/Mask Dude/Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerRun', './Free/Main Characters/Mask Dude/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerHit', './Free/Main Characters/Mask Dude/Hit (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerFall', './Free/Main Characters/Mask Dude/Fall (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player2Jump', './Free/Main Characters/Mask Dude/Double Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerWJump', './Free/Main Characters/Mask Dude/Wall Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.image('background', './Free/Background/Pink.png');
        this.load.image('terrain', './Free/Terrain/Terrain (16x16).png');
        this.load.image('grass_terrain', './Free/Terrain/grass_terrain.png');
        this.load.image('rock_terrain', './Free/Terrain/rock_terrain.png');
        this.load.image('grass_bottom', './Free/Terrain/grass_bottom_44x30.png');
        this.load.spritesheet('door', './PhaserAssets/Door_Open_v2.png', {frameWidth: 18, frameHeight: 32});
        this.load.image('key', './PhaserAssets/key.png');
        this.load.spritesheet('blue_red','./PhaserAssets/Blue_To_Red.png', {frameWidth: 32, frameHeight: 20});
        this.load.spritesheet('purp_yel', './PhaserAssets/Purple_To_Yellow.png', {frameWidth: 32, frameHeight: 20});
        this.load.spritesheet('blocks', './PhaserAssets/Color_Blocks.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('help', './PhaserAssets/helpButton.png');
        this.load.image('heart', './PhaserAssets/heart.png');
    }
    
    animateBlocks(){
        this.anims.create({
             key: 'redClear',
             frames: this.anims.generateFrameNumbers('blocks', {start: 1, end: 0}),
             frameRate: 5, repeat: 0
        });
        this.anims.create({
             key: 'redSolid',
             frames: this.anims.generateFrameNumbers('blocks', {start: 0, end: 1}),
             frameRate: 5, repeat: 0
        });

        this.anims.create({
             key: 'blueClear',
             frames: this.anims.generateFrameNumbers('blocks', {start: 3, end: 2}),
             frameRate: 5, repeat: 0
        });
        this.anims.create({
             key: 'blueSolid',
             frames: this.anims.generateFrameNumbers('blocks', {start: 2, end: 3}),
             frameRate: 5, repeat: 0
        });
    }

    animateLevers(){
        this.anims.create({
             key: 'switchToRed',
             frames: this.anims.generateFrameNumbers('blue_red', {start: 0, end: 3}),
             frameRate: 10, repeat: 0
        });
        this.anims.create({
             key: 'switchToBlue',
             frames: this.anims.generateFrameNumbers('blue_red', {start: 3, end: 0}),
             frameRate: 10, repeat: 0
        });
    }

    createPlayer(x, y) {
        gameState.player = this.physics.add.sprite(x,y, 'player');
        //gameState.player.body.setSize();
        gameState.cursors = this.input.keyboard.createCursorKeys();
        //Idle anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 11}),
            frameRate: 25,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('playerRun', {start: 0, end: 12}),
            frameRate: 25,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerJump', {start: 0, end: 0}),
            frameRate: 25,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('playerFall', {start: 0, end:0}),
            frameRate: 25,
            repeat: -1
        });
        gameState.player.isTouchingEnemy = false;
    }
    
    createKeyDoor(keyX, keyY, doorX, doorY) {
        gameState.key = this.physics.add.image(keyX, keyY, 'key').setScale(.5).setImmovable(true);
        gameState.key.body.setAllowGravity(false);
        gameState.door = this.physics.add.sprite(doorX, doorY, 'door').setScale(1.5).setImmovable(true);
        gameState.door.body.setAllowGravity(false);
        gameState.doorOpen = false; 
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('door', {start: 0, end: 4}),
            frameRate: 5,
            repeat: 0
        });
    }

    playerMove() {
        if (gameState.player.body.touching.down){
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-gameState.speed);
                if (gameState.player.body.touching.down){
                    gameState.player.anims.play('run', true);
                }
                gameState.player.flipX = true;
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(gameState.speed);
                if (gameState.player.body.touching.down){
                    gameState.player.anims.play('run', true);
                }
                gameState.player.flipX = false;
            } else {
                gameState.player.setVelocityX(0);
                gameState.player.anims.play('idle', true);
            }
            if (gameState.cursors.space.isDown || gameState.cursors.up.isDown) {
                gameState.player.setVelocityY(-400);
                gameState.player.anims.play('jump', true);
            }
        }
        else {
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-gameState.speed);
                gameState.player.flipX = true;
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(gameState.speed);
                gameState.player.flipX = false;
            } else {
                gameState.player.setVelocityX(0);
            }
            //console.log(gameState.player.body.velocity.y);
            if (gameState.player.body.velocity.y >= 0){
                gameState.player.anims.play('jump', true);
            }
            else {
                gameState.player.anims.play('fall', true);
            }
        }
    }

    createBaseRoom() {   
        gameState.floor = this.physics.add.staticGroup();
        //x,y,width,height,key
        var bg = this.add.tileSprite(window.innerWidth / 2,window.innerHeight / 2,window.innerWidth, window.innerHeight, 'background');
        var floorBlock = this.add.tileSprite(window.innerWidth / 2, window.innerHeight, window.innerWidth, 32*2, 'rock_terrain');
        gameState.floor.add(floorBlock, true);
        this.createHelpButton();
        this.displayLives();
        this.animateBlocks();
        this.animateLevers();
    }

    setColliders(){
        gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player, gameState.floor);
        this.physics.add.collider(gameState.door, gameState.floor);
        this.physics.add.collider(gameState.player, gameState.key, function () {
            gameState.key.destroy();
            gameState.door.anims.play('open', true);
            gameState.doorOpen = true;
        });
    }
    
    sceneChange(name){
        this.physics.add.overlap(gameState.player, gameState.door, function() {
            if (gameState.doorOpen) {
                this.cameras.main.fade(800,0,0,0,false, function(camera, progress) {
                    this.scene.stop(this.levelKey);
                    //this.scene.start(this.nextLevel[this.levelKey]);
                    this.scene.start(name);
                });
            }
        }, null, this);
    }

    createAngryPig(xPos, yPos, asset){     
    }

    displayLives(){
        this.registry.set('lives', gameState.lives);
        gameState.livesText = this.add.text(window.innerWidth/2 - 10, 10, 'Lives: ' + gameState.lives, {fontSize: '20px', fill:'black'});
    }

    updateLives() {
        if (gameState.player.isTouchingEnemy){
            this.scene.pause('default');
            gameState.lives--;
            this.registry.set('lives', gameState.lives);
            this.scene.restart('default');
            this.scene.resume('default');
            if (gameState.lives === 0){
                gameState.lives = 3;
                //Possible add an end of game screen    
            }
        }
    }


    //Put in Create()
    createHelpButton() {
	    gameState.helpButton = this.add.image(30,30,'help').setInteractive();
	    gameState.move = this.add.text(75,10, 'Move: Arrow Keys', {fill:'black'}).visible = false;
	    gameState.jump = this.add.text(75,25, 'Jump: Space Bar', {fill:'black'}).visible = false;
	    gameState.climb = this.add.text(75, 40, 'Climb: Up Arrow', {fill:'black'}).visible = false;
    }

    //Put in Update()
    makeButtonVisible() {
	    gameState.helpButton.on('pointerover', () => {
            gameState.move.visible = true;
            gameState.jump.visible = true;
            gameState.climb.visible = true;
        });
        gameState.helpButton.on('pointerout', () => {
            gameState.move.visible = false;
            gameState.jump.visible = false;
            gameState.climb.visible = false;
        });
    }
}
