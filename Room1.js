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
        //super.createAssets();
        super.createBaseRoom();
        //creates key and door, and appropriate door animation.
        //super.createKeyDoor(key x, key y, door x, door y);

        gameState.questions = new Map();
        gameState.questions.set('What is decimal 13 in binary?', ['01101', '01110', '01011', '01111']);
        gameState.questions.set('What is decimal 19 in binary?', ['011101', '011001', '010011', '011010']);
        gameState.questions.set('What is decimal 23 in binary?', ['011011', '011010', '010101', '010111']);

        gameState.answers = new Map();
        gameState.answers.set('What is decimal 13 in binary?', '01101');
        gameState.answers.set('What is decimal 19 in binary?', '010011');
        gameState.answers.set('What is decimal 23 in binary?', '010111');

        gameState.list = new Array('What is decimal 13 in binary?', 'What is decimal 19 in binary?',
            'What is decimal 23 in binary?');
        //CREATE YOUR GAME OBJECTS HERE
        gameState.count = 0;
        gameState.r = 0;
        gameState.q = 0;
    }

    update() {
        if (gameState.active) {
            gameState.door1.setInteractive().on('pointerdown', () => {
                if (!gameState.count) {
                    gameState.r = Math.floor(Math.random() * 3);
                    console.log(gameState.r);
                    gameState.count += 1;
                    gameState.q = gameState.list[gameState.r];
                }

                let ops = gameState.questions.get(gameState.q);
                //console.log(typeof ops);
                this.add.text(250, 250, gameState.q);
                let op1 = this.add.text(300, 300, ops[0]);
                let op2 = this.add.text(300, 325, ops[1]);
                let op3 = this.add.text(300, 350, ops[2]);
                let op4 = this.add.text(300, 375, ops[3]);

                op1.setInteractive().on('pointerdown', () => {
                    this.add.text(400, 400, "CORRECT");
                    this.scene.restart();
                });
                op2.setInteractive().on('pointerdown', () => {
                    this.add.text(400, 400, "WRONG");
                });
                op3.setInteractive().on('pointerdown', () => {
                    this.add.text(400, 400, "WRONG");
                });
                op4.setInteractive().on('pointerdown', () => {
                    this.add.text(400, 400, "WRONG");
                });
            });
            //HANDLES MOVEMENT HERE
            //this.makeDoorVisible();
            //handles transition from this room to the next
            //change "Room1" to super/scene name of next room (until order/rotation is established)
            //super.sceneChange('Room1');
        }
    }
}
