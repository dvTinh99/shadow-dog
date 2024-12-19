import { getRandomArbitrary, getRandomInt } from "./util/helper"

type IPlayer = {
    name ?: string
    id: number
    percent ?: number
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
    winInThisGame : number = undefined

    player : IPlayer[] = [{id:1, percent : 0, name : "1"},{id:2, percent : 0, name : "2"},{id:3, percent : 0, name : "3"},{id:4, percent : 0, name : "4"}]
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
        this.winInThisGame = this.getWinner()

        // will set percent complete
        console.log('racing');

        this.isRacing = true
        let playerWon : IPlayer= undefined
        this.racing = setInterval(() => {
            this.player.forEach(player => {
                if (player.percent < 100) {
                    if (this.winInThisGame != player.id && player.percent > 70 && this.player[this.winInThisGame - 1].percent != 100) {
                        player.percent += ((100 - player.percent) * Math.floor(getRandomArbitrary(10,20))) / 100
                    } else {

                        player.percent += Math.floor(getRandomArbitrary(10,20))
                    }

                    if (player.percent > 100) {
                        player.percent = 100
                        if (playerWon === undefined) {

                            playerWon = player
                            console.log('playerWon', playerWon);
                        }
                    }
                }
            })

            const notGetYet = this.player.find(player => player.percent < 100)
            console.log('notGetYet', notGetYet);
            
            console.log('racing', this.player);
            if (notGetYet === undefined) {
                this.isRacing = false
                this.reward(playerWon)
            }
        }, 500)

    }

    reward(player : IPlayer) {
        console.log('player', player);
        
        clearInterval(this.racing);
        this.player.forEach(player => {
            player.percent = 0
        })
        console.log('rewarding', player.name);
        setTimeout(() => {
            this.bet()
        }, this.timeRewarding * 1000)
    }


    sendRewards() {

    }

    setBet(playerId : number, amount : number) {
        this.pot[this.player.findIndex(player => player.id === playerId)] += amount
    }

    getWinner() : number {
        return 2
    }
}