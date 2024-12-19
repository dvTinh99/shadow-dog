class Enemy {
    constructor() {
        this.frameX = 0
        this.frameY = 0

        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.smallerXTime = 1
        this.markForDelete = false
    }
    update(deltaTime) {
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) this.frameX ++
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime
        }

        if (this.x + this.width < 0) this.markForDelete = true
    }
    draw(context) {
        context.drawImage(this.image, 
            this.frameX * this.width, 
            0, 
            this.width, this.height,
            this.x, this.y, this.width / this.smallerXTime, this.height / this.smallerXTime
        )
    }

}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super()

        this.game = game
        this.width = 294
        this.height = 150

        this.smallerXTime = 3

        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5

        this.speedX = Math.random() + 2
        this.speedY = 0

        this.maxFrame = 5
        this.image = enemy_fly
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1

    }

    update(deltaTime) {
        super.update(deltaTime)
        this.angle += this.va
        this.y += Math.sin(this.angle)
    }
}

export class GroundEnemy extends Enemy {

}

export class ClimbingEnemy extends Enemy {

}