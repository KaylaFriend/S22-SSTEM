class vNewLevel extends Level {
    constructor() {
        super({key: "vNewLevel"});    
    }

    preload() {
        //character
        this.load.spritesheet('player', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('fall', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Fall (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('jump', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('doubleJump', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Double Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('hit', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Double Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('run', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('wallJump', 'PhaserAssets/pixelAdventure/Characters/MaskDude/Wall Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        //terrain/background
        this.load.image('grass', 'PhaserAssets/pixelAdventure/grass_terrain_46x46.png');
        this.load.image('rock', 'PhaserAssets/pixelAdventure/rock_terrain_48x48.png');
        //blocks/levers
        this.load.spritesheet('blue_red', 'PhaserAssets/Blue_To_Red.png', {frameWidth: 32, frameHeight: 20});
        this.load.spritesheet('purp_yel', 'PhaserAssets/Purple_To_Yellow.png', {frameWidth: 32, frameHeight: 20});
        this.load.spritesheet('blocks', 'PhaserAssets/Color_Blocks.png', {frameWidth: 16, frameHeight: 16});
        //door/key
        this.load.spritesheet('door', 'PhaserAssets/Door_Open_v2.png', {frameWidth: 18, frameHeight: 32});
        this.load.image('key', 'PhaserAssets/key.png');
        //traps
        this.load.image('spikeIdle', 'PhaserAssets/pixelAdventure/Traps/Spike Head/Idle.png');
        this.load.spritesheet('spikeBlink', 'PhaserAssets/pixelAdventure/Traps/Spike Head/Blink (54x52).png', {frameWidth: 54, frameHeight: 52});
        //this.load.image('chain', 'PhaserAssets/pixelAdventure/Traps/Spiked Ball/Chain.png');
        //this.load.image('spikedBall', 'PhaserAssets/pixelAdventure/Traps/Spiked Ball/Spiked Ball.png');
    }

    create() {
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.player = this.physics.add.sprite(30, 550, 'player').setScale(1.5);
        gameState.player.body.setSize(23, 32, true);
             
        /* Code from Tyler I can't get working
        gameState.floor = this.physics.add.staticGroup();   
        var floorBlock = this.add.tileSprite(window.innerWidth / 2, window.innerHeight, window.innerWidth, 32*2, 'rock');
        gameState.floor.add(floorBlock, true);    
        */
        
        this.createTerrain();
        this.createAnims();
        this.createLevers();
        this.createBlocks();
        super.createKeyDoor(50, 425, 880, 550);
        this.setColliders();
        
        gameState.rockHeads = this.physics.add.group({ allowGravity: false });
        gameState.rockHeads.create(110, 330, 'spikeIdle'); 
        gameState.rockHeads.create(600, 100, 'spikeIdle'); 
        gameState.rockHeads.create(550, 100, 'spikeIdle'); 
        gameState.rockHeads.create(500, 100, 'spikeIdle'); 
        gameState.rockHeads.create(450, 100, 'spikeIdle'); 
        gameState.v = 400;         
        gameState.t = 0;         
        gameState.rockHeads.setVelocityY(gameState.v);
        
        this.anims.create({
            key: 'spikeBlink',
            frames: this.anims.generateFrameNumbers('spikeBlink', {start: 0, end: 3}),
            frameRate: 5,
            repeat: 0
        });
        
        gameState.player.isTouchingEnemy = false;

        this.physics.add.collider(gameState.rockHeads, gameState.floor);
        this.physics.add.collider(gameState.rockHeads, gameState.player, function (){
            gameState.player.isTouchingEnemy = true;
        });
        
        //testing
        /* 
        //gameState.chains = this.physics.add.staticGroup();
        gameState.chains = this.physics.add.group({ allowGravity: false });
        for (var i = 0; i < 10; i++) 
            gameState.chains.create(100 - i * 5, 100 + i * 5, 'chain');
        //gameState.spikedBall = this.physics.add.staticGroup();
        gameState.spikedBall = this.physics.add.group({allowGravity: false });
        gameState.spikedBall.create(100 - 5 * 9, 150, 'spikedBall');

        gameState.v = 5;
        gameState.t = 0;
        gameState.r = true;
        */
        //end testing
        
    }//end create
    
    setColliders() {
        super.setColliders();
        
        this.physics.add.collider(gameState.leverGroup, gameState.floor);
        for (var i = 0; i < gameState.rblockArr.length; i++) {
            gameState.rblockColArr[i] = this.physics.add.collider(gameState.player, gameState.rblockArr[i]);
            gameState.bblockColArr[i] = this.physics.add.collider(gameState.player, gameState.bblockArr[i]);
            gameState.bblockColArr[i].active = false;
        }
    }
    
    createTerrain() {
        gameState.floor = this.physics.add.staticGroup();
        //base floor & ceiling
        for (var i = 0, j = 26; i < 20; i++) {
            gameState.floor.create(j + i * 46, 600, 'grass');
            gameState.floor.create(j + i * 46, 24, 'rock');
        }
        //platforms
        for (var i = 0; i < 7; i++) {
            gameState.floor.create(876 - i * 48, 500, 'rock');
            gameState.floor.create(24 + i * 48, 500, 'rock');
        }
        for (var i = 0; i < 3; i++) {
            gameState.floor.create(312, 375 - i * 48, 'rock');
            gameState.floor.create(588, 375 - i * 48, 'rock');
        }
        for (var i = 0; i < 3; i++) 
            gameState.floor.create(312, 375 - i * 48, 'rock'); 
        for (var i = 0; i < 6; i++) { 
            if (i < 3) gameState.floor.create(540 - i * 48, 279, 'rock');
            if (i == 2) continue;
            gameState.floor.create(636 + i * 48, 279, 'rock'); 
        }
        for (var i = 0; i < 6; i++) { 
            gameState.floor.create(264 - i * 48, 279, 'rock'); 
        }
        gameState.floor.create(732, 400, 'rock'); 
    }

    createAnims() {
        /*
         *  Character Anims
        */
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', {start: 0, end: 11}),
            frameRate: 5, repeat: -1
        });  
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 10}),
            frameRate: 5, repeat: -1
        });  
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 0}),
            frameRate: 5, repeat: -1
        });  
        this.anims.create({
            key: 'doubleJump',
            frames: this.anims.generateFrameNumbers('doubleJump', {start: 0, end: 5}),
            frameRate: 5, repeat: -1
        });  
        
        /*
         *  Lever Anims
        */
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
        
        /*
         *  Block Anims
        */
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
    
    createLevers() {
        gameState.leverGroup = this.physics.add.group();
        gameState.leverGroup.create(300, 550, 'blue_red', 3);
        gameState.leverGroup.create(225, 464, 'blue_red', 3);
        gameState.leverGroup.create(830, 238, 'blue_red', 3);
        gameState.leverBlueArr = [true, true, true];
    }
    
    createBlocks() {
        //red blocks
        gameState.rblock1 = this.physics.add.staticGroup();
        gameState.rblock1.create(312, 440, 'blocks', 1).setScale(1.5);
        gameState.rblock2 = this.physics.add.staticGroup();
        gameState.rblock2.create(734, 279, 'blocks', 1).setScale(1.5);
        gameState.rblock3 = this.physics.add.staticGroup();
        gameState.rblock3.create(780, 550, 'blocks', 1).setScale(1.5);
        gameState.rblockArr = [gameState.rblock1, gameState.rblock2, gameState.rblock3];
        gameState.rblockColArr = [gameState.rblockArr.length];
        //blue blocks
        gameState.bblock1 = this.physics.add.staticGroup();
        gameState.bblock1.create(588, 440, 'blocks', 2).setScale(1.5);
        gameState.bblock2 = this.physics.add.staticGroup();
        gameState.bblock2.create(730, 550, 'blocks', 2).setScale(1.5);
        gameState.bblock3 = this.physics.add.staticGroup();
        gameState.bblock3.create(734, 325, 'blocks', 2).setScale(1.5);
        gameState.bblockArr = [gameState.bblock1, gameState.bblock2, gameState.bblock3];
        gameState.bblockColArr = [gameState.bblockArr.length];
    }

    update() {
        if (gameState.t % 80 == 0) {
            gameState.v *= -1;
            gameState.rockHeads.children.iterate(function(child) {
                child.setVelocityY(gameState.v);
                child.anims.play('spikeBlink', true);
            });
        }
        gameState.t += 1;
        /*
        //gameState.chains; chainMove
        var cIndex = 0;
        if (gameState.t % 64 == 0) {
        if (gameState.r) {
            gameState.chains.children.iterate(function(child) {
                child.setVelocityX(gameState.v * cIndex);
                gameState.spikedBall.setVelocityX(gameState.v * cIndex);
                cIndex += 2;    
            });
            gameState.r = false;
        } else {
            gameState.chains.children.iterate(function(child) {
                child.setVelocityX(gameState.v * cIndex);
                gameState.spikedBall.setVelocityX(gameState.v * cIndex);
                cIndex -= 2;    
            });
            gameState.r = true;
        }
        }
        */
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.player.body.touching.down) {
            gameState.player.setVelocityY(-450);
            gameState.player.anims.play('jump', true);
        } else if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-gameState.speed);
            gameState.player.anims.play('run', true);
            gameState.player.flipX = true;
        } else if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(gameState.speed);
            gameState.player.anims.play('run', true);
            gameState.player.flipX = false;
        } else {
            gameState.player.setVelocityX(0);
            gameState.player.anims.play('idle', true);
        }
        
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.down)) {
            var a = gameState.player.getBounds();
            var levIndex = 0;
            gameState.leverGroup.children.iterate(function(child) {
                var b = child.getBounds();
                /*
                *  In order: play lever animation, change lever color status, change collider status, play block anims
                */
                if (Phaser.Geom.Intersects.RectangleToRectangle(a, b) && gameState.leverBlueArr[levIndex]) {
                    child.anims.play('switchToBlue', true);
                    gameState.leverBlueArr[levIndex] = false;
                    gameState.rblockColArr[levIndex].active = false;
                    gameState.bblockColArr[levIndex].active = true;
                    gameState.rblockArr[levIndex].playAnimation('redClear', true);
                    gameState.bblockArr[levIndex].playAnimation('blueSolid', true);
                } else if (Phaser.Geom.Intersects.RectangleToRectangle(a, b) && !gameState.leverBlueArr[levIndex]) {
                    child.anims.play('switchToRed', true);
                    gameState.leverBlueArr[levIndex] = true;
                    gameState.rblockColArr[levIndex].active = true;
                    gameState.bblockColArr[levIndex].active = false;
                    gameState.rblockArr[levIndex].playAnimation('redSolid', true);
                    gameState.bblockArr[levIndex].playAnimation('blueClear', true);
                }
                levIndex++;
            });//leverGroup iterate
        }//end of if (JustDown)
        
        super.sceneChange("Upchurch2");
                
        if (gameState.player.isTouchingEnemy){
            this.scene.restart();
        }
    }//end update
}//end class
