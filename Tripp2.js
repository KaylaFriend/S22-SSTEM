class Tripp2 extends Level2 {
    constructor() {
        super("Tripp2");
    }

    preload() {
        //door, player, key
        super.loadAssets();   
        //this.load.spritesheet('hero', 'PhaserAssets/adventurerSheet.png', {frameWidth: 50, frameHeight: 37});
        
        this.load.image('bg', 'PhaserAssets/background.png');
        this.load.image('ladd', 'PhaserAssets/ladder2.png');
        this.load.spritesheet('dino', 'PhaserAssets/Dino.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('firetrap', 'PhaserAssets/Traps/Fire_Trap.png', {frameWidth: 32, frameHeight: 41});
        this.load.image('floor', 'PhaserAssets/background.png');
         
    }

    create() {
        //Turn it on and add the player

        gameState.active = true;
        super.createBaseRoom();
        super.createPlayer(250,475); 
        this.createRoom();
        super.createKeyDoor(window.innerWidth - 128,100,window.innerWidth/6,window.innerHeight-94);
        super.setColliders();
        //this.createTraps(); 
        //this.createDino(); 
        //console.log("Finished Create"); 
    }

    update() {
        if (gameState.active) {
            super.playerMove();
            super.makeButtonVisible();
            super.updateLives();
            this.dinoUpdate();
            //this.trapsUpdate();
            super.sceneChange("MainRoom_Kayla");
            /*if (gameState.player.isTouchingEnemy){
                this.scene.restart();
            }*/
        }
    }

    createRoom(){  
        //var block = this.add.tileSprite(0,window.innerHeight,window.innerWidth*2, 32*2, 'bg');
        //gameState.floor.add(block,true);
        gameState.platforms = this.physics.add.staticGroup();
        //Bottom plats
        var plat1_bottom = this.add.tileSprite(window.innerWidth / 2, window.innerHeight-32, 200, 64, 'grass_bottom');
        var plat1_top = this.add.tileSprite(window.innerWidth / 2, window.innerHeight-64, 200, 12, 'grass_terrain');
        
        var plat2_bottom = this.add.tileSprite(window.innerWidth / 6, window.innerHeight-32, 300, 64, 'grass_bottom');
        var plat2_top = this.add.tileSprite(window.innerWidth / 6, window.innerHeight-64, 300, 12, 'grass_terrain');
        
        //Higher Plats, in order by height
        //var plat3_bottom = this.add.tileSprite(window.innerWidth / 2, window.innerHeight - 62, 176, 12, 'grass_bottom');
        var plat3 = this.add.tileSprite(window.innerWidth / 2 + 190, window.innerHeight - 186, 350, 24, 'grass_terrain');
        var plat4 = this.add.tileSprite(window.innerWidth/4, window.innerHeight-256, 600, 24, 'grass_terrain');
        var plat5 = this.add.tileSprite(window.innerWidth/1.25-8, window.innerHeight-316, 500, 24, 'grass_terrain');
        var plat6 = this.add.tileSprite(window.innerWidth, window.innerHeight-416, 400, 24, 'grass_terrain');
        var plat7 = this.add.tileSprite(window.innerWidth/5-90, window.innerHeight-390, 500, 24, 'grass_terrain'); 
         
        
        gameState.ladders = this.physics.add.staticGroup();
        gameState.ladders.create(window.innerWidth / 2,window.innerHeight-132,'ladd');
        gameState.ladders.create(window.innerWidth/2 + 190, window.innerHeight-262, 'ladd');
        gameState.ladders.create(window.innerWidth/4+100, window.innerHeight-332, 'ladd');

        gameState.platforms.add(plat1_bottom);
        gameState.platforms.add(plat1_top);
        gameState.platforms.add(plat2_bottom);
        gameState.platforms.add(plat2_top);
        gameState.platforms.add(plat3);
        gameState.platforms.add(plat4);
        gameState.platforms.add(plat5);
        gameState.platforms.add(plat6);
        gameState.platforms.add(plat7);
    
        gameState.blocks = this.physics.add.staticGroup();
        gameState.blocks.create(window.innerWidth - 128, 230, 'blocks').setScale(1.5);
        
        this.physics.add.collider(gameState.player, gameState.blocks);
        this.physics.add.collider(gameState.player, gameState.platforms);
        this.physics.add.collider(gameState.ladders, gameState.platforms);

        this.physics.add.overlap(gameState.player, gameState.ladders, function () {
            if (gameState.cursors.up.isDown) {
                gameState.player.setVelocity(-125);
            }
        });

        this.createDino(window.innerWidth/2 - 150, window.innerHeight-64);
    }
    
    createDino(xPos, yPos){
        //dino sprite
        gameState.dino = this.physics.add.sprite(xPos, yPos, 'dino');
        //set colliders
        gameState.dino.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.dino, gameState.platforms);
        this.physics.add.collider(gameState.dino, gameState.floor);
        //first number is width, second is height of body, true to center on sprite
        gameState.player.body.setSize(10,35, true);
        gameState.player.body.debugShowBody = true;
        gameState.dino.body.setSize(7,10, true);
        gameState.dino.body.debugShowBody = true;
        this.physics.add.collider(gameState.dino, gameState.player, function (){
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

    dinoUpdate(){
        //body.blocked.right/left are true when hitting world bounds
        if (gameState.dino.body.blocked.right){ //onWall()
            gameState.dino.setVelocityX(-50);
            gameState.dino.flipX = true;
        }
        else if (gameState.dino.body.blocked.left){
            gameState.dino.setVelocityX(50);
            gameState.dino.flipX = false;
        }
        //body.touching interacts with the other objects: ie player, background
        else if (gameState.dino.body.touching.left) {
            gameState.dino.setVelocityX(50);
            gameState.dino.flipX = false           
        }
        else if (gameState.dino.body.touching.right) {
            gameState.dino.setVelocityX(-50);
            gameState.dino.flipX = true;
        }
        else {
            gameState.dino.anims.play('walk', true);
        }
    }

    createFireTrap(xPos, yPos) {
        gameState.trap = this.physics.add.sprite(300, window.innerHeight-64, 'firetrap');
        gameState.trap.body.allowGravity = false;
        //Animations
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('firetrap', {start: 1, end: 14}),
            frameRate: 5,
            repeat: -1
        });

        gameState.trap.anims.play('fire', true); 
    }

    trapsUpdate(){

        //overlap(obj1, obj2, collideCallback, processCallback, callbackContext)
        this.physics.add.overlap(gameState.player, gameState.trap,
            function() {
            //console.log(gameState.trap.anims.currentFrame);
                gameState.player.isTouchingEnemy = true;
            },
            function() {
                return gameState.trap.anims.currentFrame.textureFrame == 9;
            })
    } 
}
