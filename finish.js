class Finish {
    constructor(game, width, height, speedModifier, image) {
        this.game = game
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
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

export class FinishLine {
    constructor(game) {
        this.game = game
        this.width = 60
        this.height = 150
        this.layer1Image = finish
        
        this.layer1 = new Finish(this.game, this.width, this.height, this.game.speed, this.layer1Image)
        this.backgroundLayers = [
            this.layer1, 
        ]
    }

    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }

    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
}