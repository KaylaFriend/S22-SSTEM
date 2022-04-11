//change "Room1" to name of file/class desired. DONT FORGET TO COPY INSTEAD OF EDITING Room1.js!!

class Room1 extends Level {
    constructor() {
        //change Room1 to room name/the scene name used in main.js
        super('Room1');
    }

    preload() {
        //loads main assets and background
        super.loadAssets();
    }

    create() {
        gameState.active = true;
        
        //creates key and door, and appropriate door animation.
        //super.createKeyDoor(key x, key y, door x, door y);

        //CREATE YOUR GAME OBJECTS HERE
    }

    update() {
        if (gameState.active) {
            //HANDLES MOVEMENT HERE

            //handles transition from this room to the next
            //change "Room1" to super/scene name of next room (until order/rotation is established)
            super.sceneChange('Room1');
        }
    }
}
