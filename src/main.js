// Brennen Tsang
// Hurdle Hero
// 14 hours
//--------------------------------------------------------------------------------
// Creative Tilt:
// I used a local storage to track a player's high score if they ever return to the site.
// I'm proud of my programming technique where the hurdle will only appear if the player is running so that every hurdle is dodgable and I made it more difficult by increasing the speed of the oncoming hurdle.
// As basic as stickman art can be, I am proud of it because I was able to animate it running without making it look displaced or awkward.
// From a visual standpoint, I could have made the background with only one track lane and made it easier for the player to see, but it wouldn't be realistic as spectators of a race can see all lanes.
//--------------------------------------------------------------------------------
// Credits:
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