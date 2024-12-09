const data = [
    {
        name : "stand",
        frame : 6,
        y : 0
    },
    {
        name : "jump-up",
        frame : 6,
        y : 1
    },
    {
        name : "jump-down",
        frame : 6,
        y : 2
    },
    {
        name : "run",
        frame : 8,
        y : 3
    },
    {
        name : "chill",
        frame : 10,
        y : 4
    },
    {
        name : "fly",
        frame : 4,
        y : 5
    },
    {
        name : "rolling",
        frame : 6,
        y : 6
    },
    {
        name : "down",
        frame : 6,
        y : 7
    },
    {
        name : "die",
        frame : 11,
        y : 8
    },
    {
        name : "hit",
        frame : 3,
        y : 9
    },
]
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var CANVAS_WIDTH = canvas.width = 600;
var CANVAS_HEIGHT = canvas.height = 600;
var playerImage = new Image();
playerImage.src = './shadow_dog.png';
let frameX = 0;
// let frameY = 0;
let gameFrame = 0;
const spriteWidth = 575;
const spriteHeight = 523;
const staggerFrames = 5;

// const [totalFrame, frameY] = data[0]
const action = data[9];
const totalFrame = action.frame
const frameY = action.y
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight,
         0, 0, spriteWidth, spriteHeight)

    if (gameFrame % staggerFrames == 0) {
        frameX < totalFrame ? frameX++ : frameX = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate)
}
animate();
