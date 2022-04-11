class MainRoom_Kayla  extends Level2 {
    
    constructor() {
        super("MainRoom_Kayla");
	this.lives = 3;
    }

    preload() {
        super.loadAssets();
        //this.load.image('bg', 'PhaserAssets/background.png');
        this.load.image('ladd', 'PhaserAssets/ladder1.png'); 
	//this.load.image('platform', 'PhaserAssets/platform.png');
	this.load.image('help', 'PhaserAssets/helpButton.png');
	this.load.spritesheet('dino', 'PhaserAssets/Dino.png', {frameWidth: 24, frameHeight: 24});
	this.load.image('heart', 'PhaserAssets/heart.png');//, {frameWidth:24, frameHeight: 24});
    }

    create() {
	gameState.active = true;    

	super.createBaseRoom();
	
	//Creates floor
        //gameState.floor = this.physics.add.staticGroup();
        //gameState.floor.create(200, 650, 'background').setScale(3, 1).refreshBody();

	//Create Player
	super.createPlayer(30, 350);

	//Create dino

	//Creates ladders
        //gameState.ladder = this.physics.add.sprite(384, 255, 'ladd').setScale(.8);
	gameState.ladder2 = this.physics.add.sprite(152, 150, 'ladd').setDisplaySize(25,185);
        
	//Sets ladder and floor colliders
        //this.physics.add.collider(gameState.ladder, gameState.floor);
	this.physics.add.collider(gameState.ladder2, gameState.floor);	

	//Create Key and Door
	super.createKeyDoor(838, 370, 1000, 300);
	gameState.visible = true;

	//Sets colliders player:floor, door:floor, and player:key
	super.setColliders();
        
	//Platforms 
	const platforms = this.physics.add.staticGroup();
	platforms.create(190, 420, 'rock_terrain').refreshBody();
	platforms.create(238, 420, 'rock_terrain').refreshBody();
	platforms.create(286, 420, 'rock_terrain').refreshBody();

        platforms.create(490, 420, 'rock_terrain').refreshBody();
        platforms.create(538, 420, 'rock_terrain').refreshBody();
        platforms.create(586, 420, 'rock_terrain').refreshBody();

        platforms.create(790, 420, 'rock_terrain').refreshBody();
        platforms.create(838, 420, 'rock_terrain').refreshBody();
        platforms.create(886, 420, 'rock_terrain').refreshBody();

        //platforms.create(190, 220, 'rock_terrain').refreshBody();
        //platforms.create(238, 220, 'rock_terrain').refreshBody();
        //platforms.create(286, 220, 'rock_terrain').refreshBody();

	this.createDino(platforms);
	this.physics.add.collider(gameState.player, platforms);
	//this.physics.add.collider(gameState.ladder2, platforms);

	//Help Button
	gameState.helpButton = this.add.image(30, 30, 'help');	
	gameState.helpButton.setInteractive();
	gameState.move = this.add.text(75, 10, 'Move: arrow keys', {fill:'black'});
	gameState.jump = this.add.text(75, 25, 'Jump: space bar', {fill:'black'});
	gameState.climb = this.add.text(75, 40, 'Climb: up arrow', {fill:'black'});
	gameState.move.visible = false;
	gameState.jump.visible = false;
	gameState.climb.visible = false;

	super.displayLives();

	//Life counter image
	//gameState.life1 = this.add.image(375, 40, 'heart');
	//gameState.life2 = this.add.image(413, 40, 'heart');
	//gameState.life3 = this.add.image(451, 40, 'heart');
	//gameState.livesLabel = this.add.text(300, 30, 'Lives: ', {fill:'black'});	
	//this.registry.set('lives', this.lives);
	//this.emmiter.on('isTouchingEnemy', this.livesHandler());
	//Lives text
	//gameState.livesText = this.add.text(375, 10, 'Lives: '+this.lives, {fontSize: '20px', fill:'black'});		
    }
    
update() {	
	//Help Button hover over
	gameState.helpButton.on('pointerover', () => {
	    gameState.move.visible = true;
	    gameState.jump.visible = true;
	    gameState.climb.visible = true;	
	});
	
	//Help Button not hovering over
	gameState.helpButton.on('pointerout', () => {
	    gameState.move.visible = false;
	    gameState.jump.visible = false;
	    gameState.climb.visible = false;
	})

	//Dino update
	this.dinoUpdate();

	super.updateLives();
	
	//Player movement + climbing ladders
	if (gameState.active) {
            super.playerMove();
	  
            /*this.physics.add.overlap(gameState.player, gameState.ladder, 
function() {
                if (gameState.cursors.up.isDown) {
                    gameState.player.setVelocityY(-125);
                    gameState.player.anims.play('climb', true);
                } } )*/
	    this.physics.add.overlap(gameState.player, gameState.ladder2, 
function() {
		if (gameState.cursors.up.isDown) {
		    gameState.player.setVelocityY(-125);
		    gameState.player.anims.play('climb', true);
		} } )

		super.sceneChange("vNewLevel");
	    
        }
} //End bracket update function
	
	//Function creates dino
	createDino(platforms) {
	    //dino sprite
	    gameState.dino = this.physics.add.sprite(1000, 450, 'dino');
	    //set colliders
	    gameState.dino.setCollideWorldBounds(true);
            this.physics.add.collider(gameState.dino, platforms);
            this.physics.add.collider(gameState.dino, gameState.floor);
	    //first number is width, second is height, true to center on sprite	
	    gameState.player.body.setSize(10,38, true);
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

	//Function updates dino
	dinoUpdate() {
	    //body.blocked..right/left are true when hitting world bounds
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
}


