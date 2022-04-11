class Level extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.levelKey = key;
        this.nextLevel = {
            'Room1' : 'Room1'
        }
    }

    loadAssets() {
        this.load.image('background', './Free/Background/Green.png');
    }

    createPlayer(x, y) {
        gameState.player = this.physics.add.sprite(x, y, 'player');
        gameState.cursors = this.input.keyboard.createCursorKeys();
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
            frames: this.anims.generateFrameNumbers('playerFall', {start: 0, end: 0}),
            frameRate: 25,
            repeat: -1
        });
        gameState.player.isTouchingEnemy = false;
    }

    createKeyDoor(keyX, keyY, doorX, doorY) {
        gameState.key = this.physics.add.image(keyX, keyY, 'key').setScale(.5).setImmovable(true);
        gameState.key.body.setAllowGravity(false);
        gameState.isKeyVisible = true;
        
        gameState.door = this.physics.add.sprite(doorX, doorY, 'door').setScale(1.5).setDepth(-25).refreshBody();
        gameState.doorOpen = false;
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('door', {start: 0, end: 4}),
            frameRate: 5,
            repeat: 0 
        });
    }

    createDino() {
        gameState.dino = this.physics.add.sprite(100, window.innerHeight-64, 'dino');
        gameState.dino.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.dino, gameState.platforms);
        this.physics.add.collider(gameState.dino, gameState.floor);
        //first number is width, second is height of body, true to center on sprite
        gameState.player.body.setSize(10, 35, true);
        gameState.player.body.debugShowBudy = true;
        gameState.dino.body.setSize(7, 10, true);
        gameState.dino.body.debugShowBody = true;
        this.physics.add.collider(gameState.dino, gameState.player, function() {
            gameState.player.isTouchingEnemy = true;
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dino', {start: 4, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        gameState.dino.setVelocityX(50);
        gameState.dino.anims.play('walk', true);
    }

    createTrap(platforms) {
        gameState.trap = this.physics.add.sprite(300, window.innerHeight - 64, 'firetrap');
        gameState.trap.body.allowGravity = false;
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('firetrap', {start: 1, end: 14}),
            frameRate: 5,
            repeat: -1
        });

        gameState.trap.anims.play('fire', true);
    }
   
    /*
     * Sets general player and room colliders. Dino/Enemy colliders handled in createDino for now.
     */ 
    setColliders() {
        gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player, gameState.floor);
        this.physics.add.collider(gameState.door, gameState.floor);
        if (gameState.isKeyVisible) {
            this.physics.add.collider(gameState.player, gameState.key, () => {
                gameState.key.destroy();
                gameState.door.anims.play('open', true);
                gameState.doorOpen = true;
            });
        }
    }
    
    playerMove() {
        if (gameState.player.body.touching.down) {
            if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-gameState.speed);
                if (gameState.player.body.touching.down) {
                    gameState.player.anims.play('run', true);
                }
                gameState.player.flipX = true;
            } else if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(gameState.speed);
                if (gameState.player.body.touching.down) {
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
            if (gameState.player.body.velocity.y >= 0) {
                gameState.player.anims.play('jump', true);
            }
            else {
                gameState.player.anims.play('fall', true);
            }
        }
    }

    createBaseRoom() {
        gameState.floor = this.physics.add.staticGroup();

        //x, y, width, height, key
        var bg = this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'background');
        bg.setDepth(-20);
        var floorBlock = this.add.tileSprite(window.innerWidth / 2, window.innerHeight, window.innerWidth, 32*2, 'rock_terrain');
        gameState.floor.add(floorBlock, true);
    }

    dinoUpdate() {
        if (gameState.dino.body.blocked.right) {
            gameState.dino.setVelocityX(-50);
            gameState.dino.flipX = true;
        } else if (gameState.dino.body.blocked.left) {
            gameState.dino.setVelocityX(50);
            gameState.dino.flipX = false;
        } else if (gameState.dino.body.touching.left) {
            gameState.dino.setVelocityX(50);
            gameState.dino.flipX = false;
        } else if (gameState.dino.body.touching.right) {
            gameState.dino.setVelocityX(-50);
            gameState.dino.flipX = true;
        } else {
            gameState.dino.anims.play('walk', true);
        }

        //until lives system is more implemented
        if (gameState.player.isTouchingEnemy) {
            this.scene.restart();
        }
    }

    trapUpdate() {
        this.physics.add.overlap(gameState.player, gameState.trap, function () {
            gameState.player.isTouchingEnemy = true;
        }, function () {
            return gameState.trap.anims.currentFrame.textureFrame == 9;
        });
    }

    sceneChange(name) {
        this.physics.add.overlap(gameState.player, gameState.door, function() {
            if (gameState.doorOpen) {
                this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
                    this.scene.stop(this.levelKey);
                    this.scene.start(name);
                });
            }
        }, null, this);
    }

    autoSceneChange() {
        this.physics.add.overlap(gameState.player, gameState.door, function() {
            if (gameState.doorOpen) {
                this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
                    this.scene.stop(this.levelKey);
                    this.scene.start(this.nextLevel[this.levelKey]);
                });
            }
        }, null, this);
    }

    /*
    * Lives System
    */
    
    //Put in Create()
    displayLives() {
	this.registry.set('lives', gameState.lives);
	gameState.livesText = this.add.text(375, 10, 'Lives: '+gameState.lives, {fontSize: '20px', fill:'black'});
    }

    //Put in Update()
    updateLives() {
	  if (gameState.player.isTouchingEnemy) {
	    this.scene.pause("default");
	    gameState.lives--;
	    this.registry.set('lives', gameState.lives);
	    this.scene.restart("default");
	    this.scene.resume("default");
	    if (gameState.lives === 0) {
		gameState.lives = 3;
	    }
	}
}
}
