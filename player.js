export default class Player {
    constructor(game, player, x = 0, y = 0) {
        this.game = game

        this.gameWidth = this.game.width
        this.gameHeight = this.game.height

        this.image = player
        this.width = 130
        this.height = 200

        this.x = x;
        this.y = y;

        this.frameX = 0
        this.frameY = 0

        this.speed = 0
        this.maxSpeed = 10;

        this.vy = 0
        this.weight = 0.5

        this.maxFrame = 5
        this.fps = 30
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps

        // this.game.speed = 10
    }
    draw(context) {
        context.drawImage(this.image,
            this.width * this.frameX, this.height * this.frameY, this.width, this.height,
            this.x, this.y, this.width , this.height );
    }

    update(input, deltaTime) {

        if (input === 'PRESS RIGHT') {
            this.speed = 1
            this.game.speed = 10
        }
        if (this.speed > 0 ) {

            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame) this.frameX ++
                else this.frameX = 0
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            console.log('this.getRandomArbitrary(0, 10)', this.getRandomArbitrary(0, 10));
            this.x += this.speed + this.getRandomArbitrary(0, 5)
        }
        if (this.x <=0 ) this.x = 0
        else if (this.x >= this.gameWidth - (this.width)) {
            this.x = this.gameWidth - (this.width)
            this.game.speed = 0
            this.game.isStop = true
        }
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}