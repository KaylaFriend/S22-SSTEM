//change "base" to name of file/class desired. DONT FORGET TO COPY INSTEAD OF EDITING base.js!!

class base extends Level {
    constructor() {
        //change base to room name/the scene name used in main.js
        super('base');
    }

    preload() {
        //loads assets
        super.loadAssets();
    }

    create() {
        gameState.active = true;
        
        //creates player, adds physics, and creates animations for player.
        //x = character's starting x position, y = character's starting y position
        super.createPlayer(x, y);
        
        //creates key and door, and appropriate door animation.
        super.createKeyDoor(key x, key y, door x, door y);

        //CREATE YOUR "gameState.floor" here!

        //creates and sets colliders for player, door, and key
        //NOTE: REQUIRES YOUR FLOOR ASSET TO BE CREATED AND CALLED "gameState.floor". WILL NOT WORK OTHERWISE.
        super.setColliders();
        
        //finish "creating" the rest of the room - recommend a "createRoom" method to keep code clean
    }

    update() {
        if (gameState.active) {
            //handles logic for player movement
            super.playerMove();
           
            //handles transition from this room to the next
            //change "name" to super/scene name of next room (until order/rotation is established)
            super.sceneChange(name);
        }
    }
}
