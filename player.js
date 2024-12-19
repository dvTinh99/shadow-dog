import {
    StandingLeft, 
    StandingRight, 
    SittingLeft, 
    SittingRight,
    RunningLeft,
    RunningRight,
    JumpingLeft,
    JumpingRight,
    FallingLeft,
    FallingRight,
    AttackLeft,
    AttackRight
} from './state.js'
export default class Player {
    constructor(game, player, x = 0, y = 0) {
        this.game = game

        this.gameWidth = this.game.width
        this.gameHeight = this.game.height
        this.state = [
            new StandingLeft(this), 
            new StandingRight(this),
            new SittingLeft(this),
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this),
            new AttackLeft(this),
            new AttackRight(this)
        ]
        this.currentState = this.state[1]

        this.image = player
        this.width = 130
        this.height = 200

        this.x = x;
        this.y = y == 0 ? this.gameHeight - (this.height ) - this.game.GroundMargin : y;

        this.frameX = 0
        this.frameY = 0

        this.speed = 0
        this.maxSpeed = 10;

        this.vy = 0
        this.weight = 0.5

        this.maxFrame = 5
        this.fps = 30
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps
    }
    draw(context) {
        context.drawImage(this.image,
            this.width * this.frameX, this.height * this.frameY, this.width, this.height,
            this.x, this.y, this.width , this.height );
    }

    update(input, deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX ++
            else this.frameX = 0
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }


        this.currentState.handleInput(input)
        this.x += this.speed
        

        if (this.x <=0 ) this.x = 0
        else if (this.x >= this.gameWidth - (this.width)) {
            this.x = this.gameWidth - (this.width)
        }

        // vertical movement
        this.y += this.vy
        // if(!this.onGround()) {
        //     this.vy += this.weight
        // } else {
        //     this.vy = 0
        // }

        // if(this.y > this.gameHeight - (this.height )) {
        //     this.y = this.gameHeight - (this.height )
        // }
    }

    setState(state, speed = 0) {
        this.currentState = this.state[state]
        this.game.speed = this.game.maxSpeed * speed
        this.currentState.enter()
    }

    onGround() {
        return this.y >= this.gameHeight - (this.height ) - this.game.GroundMargin
    }

}