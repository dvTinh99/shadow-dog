export class FinishLine {
    constructor(game) {
        this.game = game
        this.width = 60
        this.height = 150
        this.layer1Image = finish
        this.image = finish
        this.x = 1900
        this.y = 350
    }

    update() {
        this.x -= this.game.speed
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}