import { Server, Socket } from "socket.io";
import { getRandomArbitrary, getRandomInt } from "./util/helper";
import Game from "./services/Game";
import UserAction from "./services/UserAction";

type IPlayer = {
  name?: string;
  id: number;
  percent?: number;
};

// an app for hosting a racing game
export default class App {

  game : Game
  io : Server
  users : UserAction[]
  constructor(io : Server) {
    this.io = io

    this.io.on('userBet', (data) => this.userBet(data))
    this.io.on('connection', (socket) => {
      this.users.push(new UserAction(socket.id))
    });
    this.game = new Game(io)
  }
  async run() {
    this.game.run()
  }

  async userBet(data : any) {
      // call action user

      // update total bet in game
  }
}
