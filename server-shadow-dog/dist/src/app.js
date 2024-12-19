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
        this.player = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
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
        console.log('racing');
        this.isRacing = true;
        let timeRacing = 0;
        this.racing = setInterval(() => {
            timeRacing++;
            console.log('racing', timeRacing);
            if (timeRacing === this.timeRacing) {
                this.isRacing = false;
                this.reward();
            }
        }, 1000);
    }
    reward() {
        clearInterval(this.racing);
        setTimeout(() => {
            console.log('rewarding', this.player[(0, helper_1.getRandomInt)(4)]);
            this.bet();
        }, this.timeRewarding * 1000);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map