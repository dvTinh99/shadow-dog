import Player from "./Player"

export default class Reward {
    width : number
    height : number
    sound : HTMLAudioElement
    oneTime : boolean
    crown : {
        image : CanvasImageSource
        height : number
        width : number
    }
    player : {
        image? : CanvasImageSource
        width : number
        height : number
    }
    background : {
        image : CanvasImageSource
    }
    constructor(width : number, height : number) {
        this.width =  width
        this.height = height
        this.sound = new Audio()
        this.sound.src = './sound/winfretless.ogg'
        this.oneTime = true
        this.crown = {
            image :  document.getElementById('crown') as CanvasImageSource,
            height : 1200,
            width : 1200
        }
        this.background = {
            image : document.getElementById('layer0') as CanvasImageSource
        }

        this.player = {
            width : 130,
            height : 200
        }
    }

    updatePlayerImage(image : HTMLImageElement) {
        this.player.image = image
    }

    update() {
        if (this.oneTime) {
            this.sound.play()
            this.oneTime = false
        }
        
    }

    draw(context : CanvasDrawImage) {
        context.drawImage(this.background.image, 0, 0, this.width, this.height)
        context.drawImage(this.crown.image, 100, 100, this.crown.width, this.crown.height, this.width / 2 , (this.height / 2) - 20, 200, 200)
        if (this.player.image) {
            context.drawImage(this.player.image, 0, 0, this.player.width, 
                this.player.height, (this.width / 2) - 30, this.height / 2, 
                this.player.width, this.player.height);
        }

    }
}