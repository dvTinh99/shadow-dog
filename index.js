var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var CANVAS_WIDTH = canvas.width = 600;
var CANVAS_HEIGHT = canvas.height = 600;
var playerImage = new Image();
playerImage.src = './shadow_dog.png';
var x = 0;
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(100, 100, 100, 100)
    ctx.drawImage(playerImage, 0, 0)
    requestAnimationFrame(animate)
}
animate();
