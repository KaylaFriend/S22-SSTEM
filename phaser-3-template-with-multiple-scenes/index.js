import Phaser from "./node_modules/phaser";

import SceneGameOver from "./js/SceneGameOver";
import SceneMainMenu from "./js/SceneMainMenu";
import SceneMain from "./js/SceneMain";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  parent: "game-container",
  //scene: [SceneMainMenu, SceneMain, SceneGameOver]
  scene: [SceneMain]
};

const game = new Phaser.Game(config);
