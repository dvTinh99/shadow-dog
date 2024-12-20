export default class Player {
    constructor(game, player, x = 0, y = 0, name = ' default', soundSource) {
        this.game = game
        this.name = name

        this.gameWidth = this.game.width
        this.gameHeight = this.game.height

        this.image = player
        this.width = 129
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

        this.sound = new Audio()
        this.sound.src = soundSource

        this.soundGun = new Audio()
        this.soundGun.src = './sound/gun.mp3'

        // this.game.speed = 10
    }
    draw(context) {
        context.drawImage(this.image,
            this.width * this.frameX, this.height * this.frameY, this.width, this.height,
            this.x, this.y, this.width , this.height );
    }

    update(input, deltaTime) {

        this.checkFinish() 
        if (input === 'PRESS RIGHT') {
            this.soundGun.play()
            this.speed = 1
            this.game.speed = 10
        }
        if (input === 'PRESS ENTER') {
            this.game.reset(this.game)
        }
        if (this.speed > 0 ) {

            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame) { 
                    this.frameX ++
                    this.sound.play()
                } else {
                    this.frameX = 0
                }
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
            this.x += this.getRandomArbitrary(0, 5)
        }
        if (this.x <=0 ) this.x = 0
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    checkFinish() {
        let finishXStart = this.game.finish.x
        if (this.x > finishXStart) {
            if (this.game.winner === null) {
                this.game.winner = this
                this.game.speed = 0
            }

            setTimeout(() => {
                this.game.isStop = true
            }, 2000)
        }
    }

}