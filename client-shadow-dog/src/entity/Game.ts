import Background from "./Background"
import FinishLine from "./Finish"
import InputHandler from "./Input"
import Player from './Player';

export default class Game {
    width : number
    height : number
    groundMargin : number
    speed : number
    winner : any
    background : Background
    finish : FinishLine
    isStop : boolean
    players : Player[]
    input : InputHandler

    constructor(width : number, height : number) {
        console.log('construct game');
        this.players = []
        this.width =  width
        this.height = height
        this.groundMargin = 80
        this.speed = 0
        this.winner = null
        this.background = new Background(this)
        this.finish = new FinishLine(this)
        this.isStop = false
        this.input = new InputHandler()
    }

    setPlayers() {
        const deerPlayer = new Player(this, deer, 0, 230, "deer", "/sound/blocky.mp3")
        const bearPlayer = new Player(this, bear, 0, 250, "bear", "./sound/clicky.mp3")
        const hippoPlayer = new Player(this, hippo, 0, 270, "hippo", "./sound/grass.mp3")
        const giraffePlayer = new Player(this, giraffe, 0, 300, "giraffe", "./sound/ground.mp3")
        const elephantPlayer = new Player(this, elephant, 0, 330, "elephant", "./sound/hall.mp3")
        const zebraPlayer = new Player(this, zebra, 0, 360, "zebra", "./sound/muffled.mp3")

        const players = [
            deerPlayer,
            bearPlayer,
            hippoPlayer,
            giraffePlayer,
            elephantPlayer,
            zebraPlayer
        ]
        this.players = players
    }

    setIsStop(value : boolean) {
        this.isStop = value
    }

    restartPlayer() {
        this.players.forEach(player => {
            player.x = 0
            player.frameX = 0
        })
    }

    update(deltaTime : number) {
        
        this.background.update()
        this.finish.update()
        // this.players.forEach(player => {
        //     player.update(this.input.lastKey, deltaTime)
        // })
    }

    draw(context : CanvasDrawImage) {
        this.background.draw(context)
        this.finish.draw(context)
        this.players.forEach(player => {
            player.draw(context)
        })
    }
}