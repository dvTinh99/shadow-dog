import { getRandomInt } from "./util/helper"

type IPlayer = {
    name ?: string
    id: number
}

export default class App {
    timeBetting : number = 5
    timeRacing :number = 5
    timeRewarding :number = 5
    isRacing : boolean = false
    isBetting : boolean = false
    betting : any = undefined
    racing : any = undefined
    rewarding : any = undefined

    player : IPlayer[] = [{id:1},{id:2},{id:3},{id:4}]
    pot : number[] = [0,0,0,0]

    async bet() {
        console.log('betting');
        this.isBetting = true
        let timeBetting = 0
        this.betting = setInterval(() => {
            console.log('betting', timeBetting);
            timeBetting += 1

            if (timeBetting === this.timeBetting) {
                this.isBetting = false
                this.race()
            }
        }, 1000)
    }

    race() {
        clearInterval(this.betting);
        console.log('racing');
        this.isRacing = true
        let timeRacing = 0
        this.racing = setInterval(() => {
            timeRacing ++
            console.log('racing', timeRacing);
            if (timeRacing === this.timeRacing) {
                this.isRacing = false
                this.reward()
            }
        }, 1000)

    }

    reward() {
        clearInterval(this.racing);
        setTimeout(() => {
            console.log('rewarding', this.player[getRandomInt(4)]);
            this.bet()
        }, this.timeRewarding * 1000)
    }


    sendRewards() {

    }

    setBet(playerId : number, amount : number) {
        this.pot[this.player.findIndex(player => player.id === playerId)] += amount
    }
}