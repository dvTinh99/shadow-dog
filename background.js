class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }

    update() {
        if (this.x < -this.width) this.x = 0
        else this.x -= this.game.speed
    }

    draw(context) {
        let howManyTime = 5
        // for (let index = 1; index <= howManyTime; index++) {
        //     context.drawImage(this.image, this.x + (this.width * index), this.y, this.width, this.height)
            
        // }

        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height)
    }
}

export class Background {
    constructor(game) {
        this.game = game
        this.width = 384
        this.height = 500

        this.backgroundLayers = [
            new Layer(this.game, this.width, this.height, this.game.speed, layer6),
            new Layer(this.game, this.width, this.height, this.game.speed, layer1),
            new Layer(this.game, this.width, this.height, this.game.speed, layer3),
            new Layer(this.game, this.width, this.height, this.game.speed, layer2),
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