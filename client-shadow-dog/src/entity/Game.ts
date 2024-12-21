import Background from "./Background"
import FinishLine from "./Finish"
import InputHandler from "./Input"
import Player from './Player';
import { io, Socket } from "socket.io-client";

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
    socket : Socket

    constructor(width : number, height : number) {
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
        this.socket = io();
    }

    setPlayers(players : Player[]) {
        this.players = players
    }

    update(deltaTime : number) {
        
        this.background.update()
        this.finish.update()
        this.players.forEach(player => {
            player.update(this.input.lastKey, deltaTime)
        })

                // client-side
        this.socket.on("connect", () => {
            console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
        });
    }

    draw(context : CanvasDrawImage) {
        this.background.draw(context)
        this.finish.draw(context)
        this.players.forEach(player => {
            player.draw(context)
        })
    }
}