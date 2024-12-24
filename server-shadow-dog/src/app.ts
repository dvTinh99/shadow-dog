import { Server } from "socket.io";
import { getRandomArbitrary, getRandomInt } from "./util/helper";

type IPlayer = {
  name?: string;
  id: number;
  percent?: number;
};

// an app for hosting a racing game
export default class App {
  timeBetting: number = 10;
  timeRacing: number = 10;
  timeRewarding: number = 10;
  isRacing: boolean = false;
  isBetting: boolean = false;
  betting: any = undefined;
  racing: any = undefined;
  rewarding: any = undefined;
  winInThisGame: IPlayer = undefined;
  io : Server

  player: IPlayer[] = [
    { id: 1, percent: 0, name: "deer" },
    { id: 2, percent: 0, name: "bear" },
    { id: 3, percent: 0, name: "elephant" },
    { id: 4, percent: 0, name: "bird" }
  ];
  pot: number[] = [0, 0, 0, 0];
  state: "betting" | "racing" | "rewarding" = "betting";

  constructor(io : Server) {
    this.io = io
  }

  // this function will run on 3 states
  async run() {
    while (true) {
      switch (this.state) {
        case "betting":
          await this.bet();
          break;
        case "racing":
          await this.race();
          break;
        case "rewarding":
          await this.reward(this.winInThisGame);
          break;
      }

      // this.io.emit(this.state, [this.player])
    }
  }

  // this function allows users to bet on the player they think will win
  async bet() {
    console.log("Betting phase has started.");
    this.isBetting = true;
    let elapsedTime = 0;

    return new Promise<void>((resolve) => {
      this.betting = setInterval(() => {
        elapsedTime++;
        console.log(`Betting time remaining: ${this.timeBetting - elapsedTime}s`);
        this.io.emit(this.state, `Betting time remaining: ${this.timeBetting - elapsedTime}s`)

        if (elapsedTime >= this.timeBetting) {
          clearInterval(this.betting);
          this.isBetting = false;
          this.state = "racing"; // Transition to the racing state
          resolve(); // Resolve the promise to move to the next phase
        }
      }, 1000);
    });
  }

  // this function will start the race
  async race() {
    console.log("Race has started.");
    this.winInThisGame = this.getWinner();

    this.isRacing = true;
    return new Promise<void>((resolve) => {
      this.racing = setInterval(() => {
        this.player.forEach((player) => {
          if (player.percent < 100) {
            const increment = (player.id === this.winInThisGame.id)
              ? Math.floor(getRandomArbitrary(5, 15))
              : Math.floor(getRandomArbitrary(2, 10));

            player.percent += increment;

            if (player.percent > 100) player.percent = 100;
            this.io.emit(player.name, player)
          }
        });

        console.log("Current Player States:", this.player);

        if (this.player.every((p) => p.percent >= 100)) {
          clearInterval(this.racing);
          this.isRacing = false;
          this.state = "rewarding"; // Transition to the rewarding state
          resolve(); // Resolve the promise to move to the reward phase
        }
      }, 500); // Update every half second
    });
  }

  // this function will run after the race, reward users who bet correctly
  async reward(winner: IPlayer) {
    console.log(`Rewarding phase. Winner is Player ${winner.name}`);
    
    this.player.forEach(player => player.percent = 0); // Reset player percentages

    // Example reward logic
    console.log(`Rewards distributed based on bets on Player ${winner.name}`);
    this.io.emit(this.state, `Rewards distributed based on bets on Player ${winner.name}`)

    return new Promise<void>((resolve, reject) => {
        this.state = "betting"; // Transition to the rewarding state
        resolve();
    })
    // setTimeout(() => {
    //     console.log('set time out');
        
    //   this.state = "betting"; // Return to betting state
    //   return
    // }, this.timeRewarding * 1000);
  }

  // this function will set coin to user in MySQL (to be implemented)
  sendRewards() {
    console.log(`Send rewards to winners (implementation required).`);
  }

  // this function will save the bet for the player
  setBet(playerId: number, amount: number) {
    const index = this.player.findIndex((player) => player.id === playerId);
    if (index !== -1) {
      this.pot[index] += amount;
      console.log(`Player ${playerId} bet ${amount}. Total pot: ${this.pot[index]}`);
    }
  }

  // this function will find the winner of the match
  getWinner(): IPlayer {
    // Randomly determine winner
    const winner = Math.round( getRandomArbitrary(0, this.player.length));
    console.log(`Winner determined: Player ${winner + 1}`);
    return this.player[winner];
  }
}
