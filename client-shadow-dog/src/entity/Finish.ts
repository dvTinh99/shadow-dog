export default class FinishLine {
    game : any
    width : number
    height : number
    image : HTMLImageElement
    x : number
    y : number

    constructor(game : any) {
        this.game = game
        this.width = 60
        this.height = 150
        this.image = finish
        
        this.x = 5200
        this.y = 350
    }

    update() {
        this.x -= this.game.speed
    }

    draw(context : CanvasDrawImage) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}