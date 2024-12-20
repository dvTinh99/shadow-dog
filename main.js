import Player from './player.js'
import InputHandler from './input.js'
import { Background } from './background.js'
import { FinishLine } from './finish.js'
import { Reward } from './Reward.js'
window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1')

    const ctx = canvas.getContext('2d')
    canvas.width = 1000
    canvas.height = 500
    let state = 'RE'

    class Game {
        constructor(width, height) {
            this.width =  width
            this.height = height
            this.groundMargin = 80
            this.speed = 0
            this.winner = null
            this.background = new Background(this)
            this.finish = new FinishLine(this)
            this.isStop = false
            this.players = [
                new Player(this, deer, 0, 230, 'deer', './sound/blocky.mp3'),
                new Player(this, bear, 0, 250, "bear", './sound/clicky.mp3'),
                new Player(this, hippo, 0, 270, "hippo", './sound/grass.mp3'),
                new Player(this, giraffe, 0, 300, "giraffe", './sound/ground.mp3'),
                new Player(this, elephant, 0, 330, "elephant", './sound/hall.mp3'),
                new Player(this, zebra, 0, 360, "zebra", './sound/muffled.mp3'),
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
    let reward = new Reward(canvas.width, canvas.height)
    
    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        
        
        if (game.input.lastKey === 'PRESS ENTER') {
            game = new Game(canvas.width, canvas.height)
            reward = new Reward(canvas.width, canvas.height)
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            if (!game.isStop) {
                game.update(deltaTime)
                game.draw(ctx)
            } else {
                reward.updatePlayerImage(game.winner.image)
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