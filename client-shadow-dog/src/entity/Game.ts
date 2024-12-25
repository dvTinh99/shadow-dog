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

    setPlayers(players : Player[]) {
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