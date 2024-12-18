export const state = {
    STANDING_LEFT : 0,
    STANDING_RIGHT : 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT:8,
    FALLING_RIGHT:9,
    ATTACK_LEFT: 10,
    ATTACK_RIGHT: 11
}

class State {
    constructor(state) {
        this.state = state
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING LEFT')
        this.player = player
    }

    enter() {
        this.player.frameY = 1
        this.player.speed = 0
        this.player.maxFrame = 6
    }

    handleInput(input) {
        if (input === 'PRESS RIGHT') {
            this.player.setState(state.RUNNING_RIGHT, 1);
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.SITTING_LEFT, 1)
        } else if (input === 'PRESS LEFT') {
            this.player.setState(state.RUNNING_LEFT, 1)
        } else if (input === 'PRESS UP') {
            this.player.setState(state.JUMPING_LEFT, 1)
        } 
    }
}

export class StandingRight extends State {
    constructor(player) {
        super('STANDING RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 0
        this.player.speed = 0
        this.player.maxFrame = 6
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.RUNNING_LEFT, 1);
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.SITTING_RIGHT)
        } else if (input === 'PRESS RIGHT') {
            this.player.setState(state.RUNNING_RIGHT, 1)
        } else if (input === 'PRESS UP') {
            this.player.setState(state.JUMPING_RIGHT)
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super('SITTING LEFT')
        this.player = player
    }

    enter() {
        this.player.frameY = 9
        this.player.speed = 0
        this.player.maxFrame = 4
    }

    handleInput(input) {
        if(input === 'PRESS RIGHT') {
            this.player.setState(state.SITTING_RIGHT);
        } else if(input === 'RELEASE DOWN') {
            this.player.setState(state.STANDING_LEFT)
        }
    }
}

export class SittingRight extends State {
    constructor(player) {
        super('SITING RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 8
        this.player.speed = 0
        this.player.maxFrame = 4
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.SITTING_LEFT);
        } else if (input === 'RELEASE DOWN') {
            this.player.setState(state.STANDING_RIGHT)
        }
    }
}

export class RunningLeft extends State {
    constructor(player) {
        super('RUNNING LEFT')
        this.player = player
    }

    enter() {
        this.player.frameY = 7
        this.player.speed = -this.player.maxSpeed
        this.player.maxFrame = 8
    }

    handleInput(input) {
        if(input === 'PRESS RIGHT') {
            this.player.setState(state.RUNNING_RIGHT, 1);
        } else if (input === 'RELEASE LEFT') {
            this.player.setState(state.STANDING_LEFT)
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.SITTING_LEFT)
        }
    }
}

export class RunningRight extends State {
    constructor(player) {
        super('RUNNING RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 6
        this.player.speed = this.player.maxSpeed
        this.player.maxFrame = 8
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.RUNNING_LEFT, 1);
        } else if (input === 'RELEASE RIGHT') {
            this.player.setState(state.STANDING_RIGHT)
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.SITTING_RIGHT)
        }
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super('JUMPING LEFT')
        this.player = player
    }

    enter() {
        this.player.frameY = 3
        if(this.player.onGround()) this.player.vy -= 10
        this.player.speed = -this.player.maxSpeed * 0.5
    }

    handleInput(input) {
        if(input === 'PRESS RIGHT') {
            this.player.setState(state.JUMPING_RIGHT, 1);
        } else if (this.player.onGround()) {
            this.player.setState(state.STANDING_LEFT)
        } else if (this.player.vy > 0) {
            this.player.setState(state.FALLING_LEFT)
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.ATTACK_LEFT)
        }
    }
}
export class JumpingRight extends State {
    constructor(player) {
        super('JUMPING RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 2
        if(this.player.onGround()) this.player.vy -= 10
        this.player.speed = this.player.maxSpeed * 0.5
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.JUMPING_LEFT, 1);
        } else if (this.player.onGround()) {
            this.player.setState(state.STANDING_RIGHT)
        } else if (this.player.vy > 0) {
            this.player.setState(state.FALLING_RIGHT)
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.ATTACK_RIGHT)
        }
    }
}
export class FallingLeft extends State {
    constructor(player) {
        super('FALLING LEFT')
        this.player = player
    }

    enter() {
        this.player.frameY = 5
    }

    handleInput(input) {
        if(input === 'PRESS RIGHT') {
            this.player.setState(state.FALLING_RIGHT);
        } else if (input === 'PRESS DOWN') {
            this.player.setState(state.ATTACK_LEFT)
        }
        else if (this.player.onGround()) {
            this.player.setState(state.STANDING_LEFT)
        }
    }
}

export class FallingRight extends State {
    constructor(player) {
        super('FALLING RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 4
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.FALLING_LEFT);
        } else if (input == 'PRESS DOWN') {
            this.player.setState(state.ATTACK_RIGHT)
        } else if (this.player.onGround()) {
            this.player.setState(state.STANDING_RIGHT)
        }
    }
}

export class AttackLeft extends State {
    constructor(player) {
        super('ATTACK RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 11
        this.player.maxFrame = 6
        this.player.weight = 5
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.FALLING_LEFT);
        } else if (this.player.onGround()) {
            this.player.weight = 0.5
            this.player.setState(state.STANDING_RIGHT)
        }
    }
}

export class AttackRight extends State {
    constructor(player) {
        super('ATTACK RIGHT')
        this.player = player
    }

    enter() {
        this.player.frameY = 10
        this.player.maxFrame = 6
        this.player.weight = 5
    }

    handleInput(input) {
        if(input === 'PRESS LEFT') {
            this.player.setState(state.FALLING_LEFT);
        } else if (this.player.onGround()) {
            this.player.weight = 0.5
            this.player.setState(state.STANDING_RIGHT)
        }
    }
}