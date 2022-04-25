//change "MazeRoom" to name of file/class desired. DONT FORGET TO COPY INSTEAD OF EDITING MazeRoom.js!!

class MazeRoom extends Level {
    constructor() {
        //change MazeRoom to room name/the scene name used in main.js
        super("Room1");
    }

    preload() {
        //loads main assets and background
        super.loadAssets();
        //this.scene.start("MazeRoom");
    }

    create() {
        gameState.active = true;
        
        super.createAssets();
        super.createDoor();
        //creates key and door, and appropriate door animation.
        //super.createKeyDoor(key x, key y, door x, door y);

        //CREATE YOUR GAME OBJECTS HERE
    }

    update() {
        if (gameState.active) {
            //HANDLES MOVEMENT HERE
            this.makeDoorVisible();
            //handles transition from this room to the next
            //change "MazeRoom" to super/scene name of next room (until order/rotation is established)
            super.sceneChange('MazeRoom');
        }
    }
}
