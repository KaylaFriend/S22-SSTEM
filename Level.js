class Level extends Phaser.Scene {


    constructor(key) {
        super("Room1");
        
        //this.scene.start(key);
        
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
        //this.load.spritesheet('player', './Free/Main Characters/Mask Dude/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.image('background', './assets/updated_room.png');
        this.load.image('door1', './assets/door_above_middle.png');
        //this.load.image('background', './PhaserAssets/assets/floor.jpg');
    }
   
    createAssets() {
        //this.load.spritesheet('player', './Free/Main Characters/Mask Dude/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
        //this.scene.start("MazeRoom");
        this.add.image(800, 800, 'background');
        this.add.image(50, 50, 'door1');

        //background.setScale(2); 
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
        var bg = this.add.image(450, 450, 'background');        //var floorBlock = this.add.tileSprite(window.innerWidth / 2, window.innerHeight, window.innerWidth, 32*2, 'rock_terrain');
        gameState.door1 = this.add.image(720, 450, 'door1');
        bg.setScale(2);
        gameState.door1.setScale(4.8);
        //gameState.floor.add(floorBlock, true);
        //this.createHelpButton();
        //this.displayLives();
        //this.animateBlocks();
        //this.animateLevers();
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
    createDoor() {
        
	    // var door2 = this.add.image(130,130,'door1').setInteractive();
        // var door1 = this.add.image(720, 450, 'door1');
    }

    //Put in Update()
    makeDoorVisible() {
        gameState.door1.setInteractive().on('pointerdown', () => {
            //this.add.text(170, 170, "TEST!!");
        });
    }
}
