  var Room2 = {
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
        game.state.start("Room1"); //Swap to Level 2
        console.log("u win!");
    },
};