
export class Reward {
    constructor(player, width, height) {
        this.width =  width
        this.height = height
        // this.player = player
        this.crown = {
            image : crown,
            height : 1200,
            width : 1200
        }
        this.background = {
            image : layer0
        }

        this.player = {
            image : player,
            width : 130,
            height : 200
        }
    }

    update() {
        // this.background.update()
        
    }

    draw(context) {
        context.drawImage(this.background.image, 0, 0, this.width, this.height)
        context.drawImage(this.crown.image, 100, 100, this.crown.width, this.crown.height, this.width / 2 , (this.height / 2) - 20, 200, 200)
        context.drawImage(this.player.image, 0, 0, this.player.width, 
            this.player.height, (this.width / 2) - 30, this.height / 2, 
            this.player.width, this.player.height);

    }
}