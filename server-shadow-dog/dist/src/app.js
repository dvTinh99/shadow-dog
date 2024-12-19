"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./util/helper");
class App {
    constructor() {
        this.timeBetting = 5;
        this.timeRacing = 5;
        this.timeRewarding = 5;
        this.isRacing = false;
        this.isBetting = false;
        this.betting = undefined;
        this.racing = undefined;
        this.rewarding = undefined;
        this.winInThisGame = undefined;
        this.player = [{ id: 1, percent: 0, name: "1" }, { id: 2, percent: 0, name: "2" }, { id: 3, percent: 0, name: "3" }, { id: 4, percent: 0, name: "4" }];
        this.pot = [0, 0, 0, 0];
    }
    bet() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('betting');
            this.isBetting = true;
            let timeBetting = 0;
            this.betting = setInterval(() => {
                console.log('betting', timeBetting);
                timeBetting += 1;
                if (timeBetting === this.timeBetting) {
                    this.isBetting = false;
                    this.race();
                }
            }, 1000);
        });
    }
    race() {
        clearInterval(this.betting);
        this.winInThisGame = this.getWinner();
        // will set percent complete
        console.log('racing');
        this.isRacing = true;
        let playerWon = undefined;
        this.racing = setInterval(() => {
            this.player.forEach(player => {
                if (player.percent < 100) {
                    if (this.winInThisGame != player.id && player.percent > 70 && this.player[this.winInThisGame - 1].percent != 100) {
                        player.percent += ((100 - player.percent) * Math.floor((0, helper_1.getRandomArbitrary)(10, 20))) / 100;
                    }
                    else {
                        player.percent += Math.floor((0, helper_1.getRandomArbitrary)(10, 20));
                    }
                    if (player.percent > 100) {
                        player.percent = 100;
                        if (playerWon === undefined) {
                            playerWon = player;
                            console.log('playerWon', playerWon);
                        }
                    }
                }
            });
            const notGetYet = this.player.find(player => player.percent < 100);
            console.log('notGetYet', notGetYet);
            console.log('racing', this.player);
            if (notGetYet === undefined) {
                this.isRacing = false;
                this.reward(playerWon);
            }
        }, 500);
    }
    reward(player) {
        console.log('player', player);
        clearInterval(this.racing);
        this.player.forEach(player => {
            player.percent = 0;
        });
        console.log('rewarding', player.name);
        setTimeout(() => {
            this.bet();
        }, this.timeRewarding * 1000);
    }
    sendRewards() {
    }
    setBet(playerId, amount) {
        this.pot[this.player.findIndex(player => player.id === playerId)] += amount;
    }
    getWinner() {
        return 2;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map