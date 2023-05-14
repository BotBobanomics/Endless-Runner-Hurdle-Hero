class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    preload() {
        this.load.image('trackfield', './assets/InGameTrack.png');
        this.load.spritesheet('RunningMan', './assets/RunningMan.png', {frameWidth: 60, frameHeight: 80, startFrame: 0, endFrame: 4});
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show tutorial text
        this.background = this.add.tileSprite(0, 0, 640, 480, 'trackfield').setOrigin(0.0);
        this.add.text(game.config.width/2, 20, "SFX from: Pixabay", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 60, 'Background Music from: Alex on yoyosound.com', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 100, 'Art and animation from: Brennen Tsang', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 140, 'Check main.js in code for links', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 180, 'Press Space to continue', menuConfig).setOrigin(0.5);


        this.physics.world.setBounds(0, 0, game.config.width, 460, true, true, true, true);
        this.player = this.physics.add.sprite(70, 420, 'RunningMan', 0).setBounce(0.1).setCollideWorldBounds(true);
        this.anims.create({
            key: 'StartPosition',
            frames: this.anims.generateFrameNumbers('RunningMan', { start: 0, end: 0, first: 0}),
            frameRate: 8,
        });

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('tutorialScene');
            game.settings = {
                hurdleSpeed: 4
            }
        }
    }
}