import Phaser from "phaser";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {}

  create() {
    const { width, height } = this.sys.game.config;

    this.add
      .text(width / 2, height / 2, "main\nscene", {
        font: "15vw courier",
        color: "white"
      })
      .setOrigin(0.5, 0.5);
  }

  update(time, delta) {}
}
