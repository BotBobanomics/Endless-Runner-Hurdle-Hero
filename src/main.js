// Brennen Tsang
// Hurdle Hero
// 9 hours
//--------------------------------------------------------------------------------
// SFX Jumping sound: Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6462">Pixabay</a>
// SFX Running sound: Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6003">Pixabay</a>
// SFX Crashing sound: Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6711">Pixabay</a>
// Background music: https://yoyosound.com/track/the-blazing-speedster_100

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
    scene: [ Menu, Credits, Play, Tutorial ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySpace, keyR;