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
    { id: 3, percent: 0, name: "hippo" },
    { id: 4, percent: 0, name: "giraffe" },
    { id: 5, percent: 0, name: "elephant" },
    { id: 6, percent: 0, name: "zebra" },
  ];
  pot: number[] = [0, 0, 0, 0];
  state: "betting" | "racing" | "rewarding" = "betting";

  nitro : number[] = []

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
  // I want the race to be more interesting, the animals will compete fiercely, and finally winInThisGame will accelerate to the finish line.
  async race() {
    console.log("Race has started.");
    setTimeout(() => {

      this.winInThisGame = this.getWinner();
      console.log('this.winInThisGame', this.winInThisGame);
      
    }, 2000)
    setTimeout(() => {

      this.winInThisGame = this.getWinner();
      console.log('this.winInThisGame', this.winInThisGame);
      
    }, 8000)
    setTimeout(() => {

      this.winInThisGame = this.getWinner();
      console.log('this.winInThisGame', this.winInThisGame);
      
    },15000)
    this.isRacing = true;
    return new Promise<void>((resolve) => {
      this.racing = setInterval(() => {
        this.player.forEach((player) => {
          if (player.percent < 1101) {
            const increment = (player.id === this.winInThisGame?.id)
              ? (getRandomArbitrary(5, 10))
              : (getRandomArbitrary(2, 5));

            player.percent += increment;

            if (player.percent > 1101) {
              player.percent = 1101;
            } 
          }
          this.io.emit(player.name, player)
        });


        if (this.player.every((p) => p.percent >= 1101)) {
          clearInterval(this.racing);
          this.isRacing = false;
          this.state = "rewarding"; // Transition to the rewarding state
          resolve(); // Resolve the promise to move to the reward phase
        }
      }, 100); // Update every half second
    });
  }

  // this function will run after the race, reward users who bet correctly
  async reward(winner: IPlayer) {
    this.io.emit('rewardStart', this.state)
    console.log(`Rewarding phase. Winner is Player ${winner.name}`);
    
    this.player.forEach(player => player.percent = 0); // Reset player percentages

    // Example reward logic
    console.log(`Rewards distributed based on bets on Player ${winner.name}`);
    this.io.emit(this.state, `Rewards distributed based on bets on Player ${winner.name}`)

    return await new Promise<void>((resolve, reject) => {
        this.state = "betting"; // Transition to the rewarding state
        this.io.emit('bettingStart', this.state)
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
    let winner = Math.round( getRandomArbitrary(0, this.player.length - 1));

    while (this.nitro.includes(winner)) {
      winner = Math.round( getRandomArbitrary(0, this.player.length - 1));
    }
    console.log(`Winner determined: Player ${winner + 1}`);

    this.nitro.push(winner)
    return this.player[winner];
  }
}
