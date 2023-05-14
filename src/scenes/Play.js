class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('trackfield', './assets/InGameTrack.png');
        this.load.image('hurdle', './assets/Hurdle.png');
        this.load.spritesheet('RunningMan', './assets/RunningMan.png', {frameWidth: 60, frameHeight: 80, startFrame: 0, endFrame: 5});
    }

    create() {

        // show menu text
        this.background = this.add.tileSprite(0, 0, 640, 480, 'trackfield').setOrigin(0,0);

        this.obstacle = new Hurdle(this, 640, 408, 'hurdle', 0).setOrigin(0,0);
        this.physics.world.setBounds(0, 0, game.config.width, 460, true, true, true, true);
        this.player = this.physics.add.sprite(70, 420, 'RunningMan', 0).setBounce(0).setCollideWorldBounds(true);

        // game over variable
        this.gameOver = false;

        // Animation config
        this.anims.create({
            key: 'Run',
            frames: this.anims.generateFrameNumbers('RunningMan', { start: 1, end: 4, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        this.player.play('Run');
        this.AnimPlay = 0;
        // Sound for running
        this.RunSound = this.sound.add('sfx_run');
        this.RunSound.play();
        // Background Music;
        this.BGMusic = this.sound.add('Music');
        this.BGMusic.loop = true;
        this.BGMusic.play();
        // display score
        this.distance = 0;
        this.HiRun = localStorage.getItem("score");
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.scoreLeft = this.add.text(10, 10, 'Meters: ', scoreConfig);
        // Speeding up hurdles as time passes by
        this.Faster = game.settings.hurdleSpeed;
        this.SpeedUp_Timer = this.time.addEvent({delay: 1000, callback: this.IncreaseSpeed, callbackScope: this, loop: true});

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        // restart game
        if (this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver == true){
            // GameOver Text config
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
            this.RunSound.stop();
            this.BGMusic.stop();
            this.add.text(game.config.width/2, 40, 'Game Over', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, 80, 'Press (R) to restart', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, 120, 'You ran: ' + this.formatMeters(this.distance) + ' meters!', menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, 160, 'Best run was: ' + this.formatMeters(this.HiRun) + ' meters!', menuConfig).setOrigin(0.5);
        }
        // Keep game running until they lose
        if (this.gameOver == false){
            this.distance += this.Faster;
            this.scoreLeft.setText("Meters: " + this.formatMeters(this.distance));
            if (this.distance > this.HiRun){
                this.HiRun = this.distance;
                localStorage.setItem("score", this.HiRun);
            }
            // Sends obstacle if they are not jumping
            if (this.player.y >= 410 || this.obstacle.x < 639){
                this.obstacle.update(this.Faster);
            }

            // Game Over
            this.jumping();
            if (this.checkCollision(this.player, this.obstacle)){
                this.gameOver = true;
                this.sound.play('sfx_crash');
            }
        }
    }

    // The runner jumps
    jumping() {
        if (keySpace.isDown && this.player.y > 410){
            this.player.play({key: 'Run', startFrame: 5, repeat: 0});
            this.player.setVelocityY(-175);
            this.AnimPlay = 1;
            this.sound.play('sfx_jump');
            this.RunSound.stop();
        }
        else if (this.AnimPlay == 1 && this.player.y >= 410){
            this.player.play('Run');
            this.AnimPlay = 0;
            this.RunSound.play();
        }
    }

    checkCollision(player, hurdle){
        // checking if runner and hurdle collides
        if (player.x < hurdle.x + hurdle.width && player.x + 10 > hurdle.x && player.y < hurdle.y + hurdle.height && 40 + player.y > hurdle.y){
            this.player.play({key: 'Run', repeat: 0});
            return true;
        } else {
            return false;
        }
    }

    IncreaseSpeed() {
        if (this.Faster < 15){
            this.Faster = this.Faster + 0.1;
        }
    }

    formatMeters(ms){
        // convert scroll speed to 'meters'
        let meters = Math.floor(ms/100);
        meters = meters.toString()
        return `${meters}`
    }
}