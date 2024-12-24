"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ['polling', 'websocket']
});
const app_js_1 = __importDefault(require("./src/app.js"));
const main = new app_js_1.default(io);
main.run();
// app.get('/socket.js', (req, res) => {
//     res.sendFile(__dirname + '/socket.io.min.js');
// });
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', test('ok ne'));
//     });
// });
server.listen(8888, () => {
    console.log('listening on *:8888');
});
//# sourceMappingURL=index.js.map