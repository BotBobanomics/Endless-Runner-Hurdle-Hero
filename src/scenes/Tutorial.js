class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {
        this.load.image('trackfield', './assets/InGameTrack.png');
        this.load.spritesheet('RunningMan', './assets/RunningMan.png', {frameWidth: 60, frameHeight: 80, startFrame: 0, endFrame: 4});
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

        // show tutorial text
        this.background = this.add.tileSprite(0, 0, 640, 480, 'trackfield').setOrigin(0.0);
        this.add.text(game.config.width/2, 40, "It's your time to shine!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 80, 'Make sure to jump over the hurdles!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 120, 'Press Spacebar to jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 160, 'Press Space to start', menuConfig).setOrigin(0.5);


        this.physics.world.setBounds(0, 0, game.config.width, 460, true, true, true, true);
        this.player = this.physics.add.sprite(70, 420, 'RunningMan', 0).setBounce(0.1).setCollideWorldBounds(true);
        this.anims.create({
            key: 'StartingPosition',
            frames: this.anims.generateFrameNumbers('RunningMan', { start: 0, end: 0, first: 0}),
            frameRate: 8,
        });

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)){
            this.scene.start('playScene');
            game.settings = {
                hurdleSpeed: 4
            }
        }
    }
}