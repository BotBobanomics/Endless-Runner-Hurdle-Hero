// Spaceship prefab
class Hurdle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to existing scene
        //this.moveSpeed = game.settings.spaceshipSpeed;        // pixels per frame
    }

    update(moveSpeed) {
        // move spaceship left
        this.x -= moveSpeed;
        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}