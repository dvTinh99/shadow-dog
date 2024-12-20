
export class Reward {
    constructor(width, height) {
        this.width =  width
        this.height = height
        this.sound = new Audio()
        this.sound.src = './sound/winfretless.ogg'
        this.oneTime = true
        this.player = null
        this.crown = {
            image : crown,
            height : 1200,
            width : 1200
        }
        this.background = {
            image : layer0
        }

        this.player = {
            image : null,
            width : 130,
            height : 200
        }
    }

    updatePlayerImage(image) {
        this.player.image = image
    }

    update() {
        // this.background.update()
        
        if (this.oneTime) {
            this.sound.play()
            this.oneTime = false
        }
        
    }

    draw(context) {
        context.drawImage(this.background.image, 0, 0, this.width, this.height)
        context.drawImage(this.crown.image, 100, 100, this.crown.width, this.crown.height, this.width / 2 , (this.height / 2) - 20, 200, 200)
        context.drawImage(this.player.image, 0, 0, this.player.width, 
            this.player.height, (this.width / 2) - 30, this.height / 2, 
            this.player.width, this.player.height);

    }
}