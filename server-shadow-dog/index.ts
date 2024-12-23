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
    transports : ['polling', 'websocket']
    
});

import {test} from './script.js'

import App from './src/app.js'


const main : App = new App();
main.bet();

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