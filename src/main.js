// Brennen Tsang
// Hurdle Hero
// 9 hours
//--------------------------------------------------------------------------------

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 175
            },
            debug:false
        }
    },
    scene: [ Menu, Play, Tutorial ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySpace, keyR;