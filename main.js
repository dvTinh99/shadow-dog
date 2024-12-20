import Player from './player.js'
import InputHandler from './input.js'
import { Background } from './background.js'
import { FinishLine } from './finish.js'
import { Reward } from './Reward.js'
window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1')

    const ctx = canvas.getContext('2d')
    canvas.width = 700
    canvas.height = 500
    let state = 'RE'

    class Game {
        constructor(width, height) {
            this.width =  width
            this.height = height
            this.GroundMargin = 80
            this.speed = 0
            this.winner = null
            this.background = new Background(this)
            this.finish = new FinishLine(this)
            this.isStop = false
            this.players = [
                new Player(this, player, 0, 230),
                new Player(this, bear, 0, 250),
                new Player(this, hippo, 0, 270),
                new Player(this, giraffe, 0, 300),
                new Player(this, elephant, 0, 330),
                new Player(this, zebra, 0, 360),
            ]
            this.input = new InputHandler()
            this.enemies = []
            this.enemyTimer = 0
            this.enemyInterval = 1000
        }

        update(deltaTime) {
            this.background.update()
            this.finish.update()
            this.players.forEach(player => {
                player.update(this.input.lastKey, deltaTime)
            })
        }

        draw(context) {
            this.background.draw(context)
            this.finish.draw(context)
            this.players.forEach(player => {
                player.draw(context)
            })
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
        }
    }

    let game = new Game(canvas.width, canvas.height)
    
    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        
        
        if (game.input.lastKey === 'PRESS ENTER') {
            game = new Game(canvas.width, canvas.height)
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            if (!game.isStop) {
                game.update(deltaTime)
                game.draw(ctx)
            } else {
                let reward = new Reward(game.winner.image, canvas.width, canvas.height)
                reward.update()
                reward.draw(ctx)
            }
        }
        requestAnimationFrame(animate)
    }

    function stopGame() {
        cancelAnimationFrame(animate) 
    }

    animate(0)
})