class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('trackfield', './assets/InGameTrack.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '27px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.background = this.add.tileSprite(0, 0, 640, 480, 'trackfield').setOrigin(0.0);
        this.add.text(game.config.width/2, 120, 'Hurdle Hero', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 160, 'Press Space to continue', menuConfig).setOrigin(0.5);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('tutorialScene');
        }
    }
}