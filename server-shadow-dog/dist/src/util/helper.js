"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = getRandomInt;
exports.getRandomArbitrary = getRandomArbitrary;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=helper.js.map