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
// an app for hosting a racing game
class App {
    constructor(io) {
        this.timeBetting = 10;
        this.timeRacing = 10;
        this.timeRewarding = 10;
        this.isRacing = false;
        this.isBetting = false;
        this.betting = undefined;
        this.racing = undefined;
        this.rewarding = undefined;
        this.winInThisGame = undefined;
        this.player = [
            { id: 1, percent: 0, name: "deer" },
            { id: 2, percent: 0, name: "bear" },
            { id: 3, percent: 0, name: "hippo" },
            { id: 4, percent: 0, name: "giraffe" },
            { id: 5, percent: 0, name: "elephant" },
            { id: 6, percent: 0, name: "zebra" },
        ];
        this.pot = [0, 0, 0, 0];
        this.state = "betting";
        this.nitro = [];
        this.io = io;
    }
    // this function will run on 3 states
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                switch (this.state) {
                    case "betting":
                        yield this.bet();
                        break;
                    case "racing":
                        yield this.race();
                        break;
                    case "rewarding":
                        yield this.reward(this.winInThisGame);
                        break;
                }
                // this.io.emit(this.state, [this.player])
            }
        });
    }
    // this function allows users to bet on the player they think will win
    bet() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Betting phase has started.");
            this.isBetting = true;
            let elapsedTime = 0;
            return new Promise((resolve) => {
                this.betting = setInterval(() => {
                    elapsedTime++;
                    console.log(`Betting time remaining: ${this.timeBetting - elapsedTime}s`);
                    this.io.emit(this.state, `Betting time remaining: ${this.timeBetting - elapsedTime}s`);
                    if (elapsedTime >= this.timeBetting) {
                        clearInterval(this.betting);
                        this.isBetting = false;
                        this.state = "racing"; // Transition to the racing state
                        resolve(); // Resolve the promise to move to the next phase
                    }
                }, 1000);
            });
        });
    }
    // this function will start the race
    // I want the race to be more interesting, the animals will compete fiercely, and finally winInThisGame will accelerate to the finish line.
    race() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Race has started.");
            setTimeout(() => {
                this.winInThisGame = this.getWinner();
                console.log('this.winInThisGame', this.winInThisGame);
            }, 2000);
            setTimeout(() => {
                this.winInThisGame = this.getWinner();
                console.log('this.winInThisGame', this.winInThisGame);
            }, 8000);
            setTimeout(() => {
                this.winInThisGame = this.getWinner();
                console.log('this.winInThisGame', this.winInThisGame);
            }, 15000);
            this.isRacing = true;
            return new Promise((resolve) => {
                this.racing = setInterval(() => {
                    this.player.forEach((player) => {
                        var _a;
                        if (player.percent < 1101) {
                            const increment = (player.id === ((_a = this.winInThisGame) === null || _a === void 0 ? void 0 : _a.id))
                                ? ((0, helper_1.getRandomArbitrary)(5, 10))
                                : ((0, helper_1.getRandomArbitrary)(2, 5));
                            player.percent += increment;
                            if (player.percent > 1101) {
                                player.percent = 1101;
                            }
                        }
                        this.io.emit(player.name, player);
                    });
                    if (this.player.every((p) => p.percent >= 1101)) {
                        clearInterval(this.racing);
                        this.isRacing = false;
                        this.state = "rewarding"; // Transition to the rewarding state
                        resolve(); // Resolve the promise to move to the reward phase
                    }
                }, 100); // Update every half second
            });
        });
    }
    // this function will run after the race, reward users who bet correctly
    reward(winner) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io.emit('rewardStart', this.state);
            console.log(`Rewarding phase. Winner is Player ${winner.name}`);
            this.player.forEach(player => player.percent = 0); // Reset player percentages
            // Example reward logic
            console.log(`Rewards distributed based on bets on Player ${winner.name}`);
            this.io.emit(this.state, `Rewards distributed based on bets on Player ${winner.name}`);
            return yield new Promise((resolve, reject) => {
                this.state = "betting"; // Transition to the rewarding state
                this.io.emit('bettingStart', this.state);
                resolve();
            });
            // setTimeout(() => {
            //     console.log('set time out');
            //   this.state = "betting"; // Return to betting state
            //   return
            // }, this.timeRewarding * 1000);
        });
    }
    // this function will set coin to user in MySQL (to be implemented)
    sendRewards() {
        console.log(`Send rewards to winners (implementation required).`);
    }
    // this function will save the bet for the player
    setBet(playerId, amount) {
        const index = this.player.findIndex((player) => player.id === playerId);
        if (index !== -1) {
            this.pot[index] += amount;
            console.log(`Player ${playerId} bet ${amount}. Total pot: ${this.pot[index]}`);
        }
    }
    // this function will find the winner of the match
    getWinner() {
        // Randomly determine winner
        let winner = Math.round((0, helper_1.getRandomArbitrary)(0, this.player.length - 1));
        while (this.nitro.includes(winner)) {
            winner = Math.round((0, helper_1.getRandomArbitrary)(0, this.player.length - 1));
        }
        console.log(`Winner determined: Player ${winner + 1}`);
        this.nitro.push(winner);
        return this.player[winner];
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map