  var Room1 = {
    preload: function() {
        //load assets here
        this.preload.image('tileset', 'Dungeon_Tileset.png');
    },

    create: function() {
        //create objects from the assets here
        this.add.image(10, 10, 'tileset');
    },

    update: function() {
        //This constantly runs
    },

    changeStage: function() {
        game.state.start("Room2"); //Swap to Level 2
        console.log("u win!");
    },
};

var game = new Phaser.Game(800, 400);
game.state.add("Room1", Room1);
game.state.add("Room2", Room2);
game.state.start("Room1");