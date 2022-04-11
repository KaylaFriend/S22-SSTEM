class Upchurch2 extends Level {
    constructor() {
        super('Upchurch2');
    }

    preload() {
        super.loadAssets();
        
        //add any other assets needed
        this.load.spritesheet('banana', 'Free/Items/Fruits/Bananas.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('cherry', 'Free/Items/Fruits/Cherries.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('melon', 'Free/Items/Fruits/Melon.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('orange', 'Free/Items/Fruits/Orange.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('strawberry', 'Free/Items/Fruits/Strawberry.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        gameState.active = true;
        
        super.createPlayer(50, window.innerHeight - 50);
        super.createBaseRoom();
        super.createKeyDoor(3 * (window.innerWidth / 5), window.innerHeight - 250, window.innerWidth - 75, window.innerHeight - 60);
        
        gameState.isKeyVisible = false;
        gameState.gotStrawberry = false;
        gameState.gotMelon = false;
        gameState.gotCherries = false;
        gameState.gotBanana = false;
        gameState.gotOrange = false;

        super.setColliders();
        this.createPlatforms(); 
        this.addFruit();
    }

    update() {
        if (gameState.active) {
            //handles logic for player movement
            super.playerMove();
            super.sceneChange("room1");
            this.puzzleLogic();
        }
    }

    createPlatforms() {
        gameState.platforms = this.physics.add.staticGroup();
        let width = window.innerWidth;
        let height = window.innerHeight;

        gameState.platforms.create(width / 5, height - 100, 'grass_terrain');
        gameState.platforms.create(2 * (width / 5), height - 150, 'grass_terrain');
        gameState.platforms.create(2 * (width / 5), height - 275, 'grass_terrain');

        gameState.platforms.create(3 * (width / 5), height - 200, 'rock_terrain');

        gameState.platforms.create(width - (width / 5), height - 150, 'grass_terrain');
        gameState.platforms.create(width - (width / 5), height - 275, 'grass_terrain');

        this.physics.add.collider(gameState.player, gameState.platforms);
    }

    addFruit() {
        gameState.key.alpha = 0.0;
        
        gameState.strawberry = this.physics.add.image(window.innerWidth - (window.innerWidth / 5), window.innerHeight - 315, 'strawberry');
        gameState.strawberry.body.setAllowGravity(false);

        gameState.melon = this.physics.add.image(2 * (window.innerWidth / 5), window.innerHeight - 180);
        gameState.melon.body.setAllowGravity(false);
    }

    puzzleLogic() {
        //order: Strawberry, Melon, Cherries, Banana, Orange
        this.grabStrawberry();
        this.grabMelon();
        this.grabCherries();
        this.grabBanana();
        this.grabOrange();  
    }

    grabStrawberry() {
        this.physics.add.collider(gameState.player, gameState.strawberry, () => {
            gameState.strawberry.destroy();
            gameState.gotStrawberry = true;
        });
    }

    grabMelon() {
        if (gameState.gotStrawberry) {
            this.physics.add.collider(gameState.player, gameState.melon, () => {
                gameState.melon.destroy();
                gameState.gotMelon = true;
            });
        }
    }

    grabCherries() {
        if (gameState.gotStrawberry && gameState.gotMelon) {
            this.physics.add.collider(gameState.player, gameState.cherries, () => {
                gameState.cherries.destroy();
                gameState.gotCherries = true;
            });
        }
    }

    grabBanana() {
        if (gameState.gotStrawberry && gameState.gotMelon && gameState.gotCherries) {
            this.physics.add.collider(gameState.player, gameState.banana, () => {
                gameState.banana.destroy();
                gameState.gotBanana = true;
            });
        }
    }

    grabOrange() {
        if (gameState.gotStrawberry && gameState.gotMelon && gameState.gotCherries && gameState.gotBanana) {
            this.physics.add.collider(gameState.player, gameState.orange, () => {
                gameState.orange.destroy();
                gameState.gotOrange = true;
                gameState.isKeyVisible = true;
            });
        }
    }
}
