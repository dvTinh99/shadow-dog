class Layer {
    game : any
    width : number
    height : number
    speedModifier : number
    image : HTMLImageElement
    x : number
    y : number

    constructor(game : any, width : number, height : number, speedModifier : number, image : HTMLImageElement) {
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

    draw(context : CanvasDrawImage) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height)
    }
}

export default class Background {
    game : any
    width : number
    height : number
    backgroundLayers : Layer[]

    constructor(game : any) {
        this.game = game
        this.width = 384
        this.height = 500

        this.layer1Image = layer1
        this.layer2Image = layer2
        this.layer3Image = layer3
        this.layer6Image = layer6
        
        this.layer1 = new Layer(this.game, this.width, this.height, this.game.speed, this.layer1Image)
        this.layer2 = new Layer(this.game, this.width, this.height, this.game.speed, this.layer2Image)
        this.layer3 = new Layer(this.game, this.width, this.height, this.game.speed, this.layer3Image)
        this.layer6 = new Layer(this.game, this.width, this.height, this.game.speed, this.layer6Image)
        this.backgroundLayers = [
            this.layer6,
            this.layer1, 
            this.layer3,
            this.layer2,
        ]
    }

    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }

    draw(context : CanvasDrawImage) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
}