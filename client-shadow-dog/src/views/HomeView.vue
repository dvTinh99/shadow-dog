<template>
  <div class="home">
    <img src="@/assets/images/animal/deer.png" alt="" id="deer" ref="deer" class="image-source"/>
    <img src="/assetHorizone/bear/bear.png" alt="" id="bear" class="image-source"/>
    <img src="/assetHorizone/hippo/spritesheet.png" alt="" id="hippo" class="image-source"/>
    <img src="/assetHorizone/giraffe/spritesheet (1).png" alt="" id="giraffe" class="image-source"/>
    <img src="/assetHorizone/zebra/spritesheet (1).png" alt="" id="zebra" class="image-source"/>
    <img src="/assetHorizone/elephant/spritesheet.png" alt="" id="elephant" class="image-source"/>

    <img src="/assetHorizone/finish/finish.jpg" alt="" id="finish" class="image-source"/>
    <img src="/assetHorizone/crown/crown.jpg" alt="" id="crown" class="image-source"/>

    <img src="/background/0.png" alt="" id="layer0" class="image-source"/>
    <img src="/background/1.png" alt="" id="layer1" class="image-source"/>
    <img src="/background/2.png" alt="" id="layer2" class="image-source"/>
    <img src="/background/3.png" alt="" id="layer3" class="image-source"/>
    <img src="/background/4.png" alt="" id="layer4" class="image-source"/>
    <img src="/background/5.png" alt="" id="layer5" class="image-source"/>
    <img src="/background/6.png" alt="" id="layer6" class="image-source"/>

      <div class="canvas-holder">
        <canvas ref="canvas" id="canvas1"></canvas>
      </div>
        <div>
            <ul class="nav nav-tabs justify-content-center">
                <li class="nav-item">
                <a class="nav-link" :class="{active : tab === 'bet'}" aria-current="page" @click="changeTab('bet')">Bet</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" :class="{active : tab === 'chat'}" @click="changeTab('chat')">Chat</a>
                </li>
            </ul>
        </div>
      
      <div v-if="tab === 'bet'">
        <info-bet />
        <bet/>
      </div>
      <div v-if="tab === 'chat'" style="height: 70%;">
         <chat-box />
      </div>

  </div>
</template>
<style scoped>


@media only screen and (max-width: 768px) {
    .home {
        width: 100%;
    }
}

@media only screen and (min-width: 768px) {
    .home {
        width: 30%;
    }
}

.home {
  height: 100%;
  background-color: burlywood;
}

/* #bet, #chat {
    display: block;
} */

.canvas-holder {
  position: relative;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

#canvas1 {
  width: 100%;
  height: 20%;
  max-width: 100%;
  max-height: auto;
}

</style>
<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from "vue";
import Game from "@/entity/Game";
import Reward from "@/entity/Reward";
import Player from "@/entity/Player";
// import { watchEvent } from '../composable/useSocket';
import ChatBox from "@/layout/ChatBox.vue";
import InfoBet from "@/layout/InfoBet.vue";
import Bet from "@/layout/Bet.vue";
const canvas = useTemplateRef<any>("canvas");
let lastTime = 0;
let game : Game = null;
let reward = null;
let ctx = null;
const deltaTime = 16;
let animation = null
let oneTime = true
const tab = ref<string>('bet')

const changeTab = (name : string) => {
    console.log('ok', name);
    tab.value = name
}

onMounted(() => {
  console.log("mounted");

  ctx = canvas.value.getContext("2d");

  canvas.value.width = 1200;
  canvas.value.height = 500;

  game = new Game(canvas.value.width, canvas.value.height);
  reward = new Reward(canvas.value.width, canvas.value.height);
  const deerPlayer = new Player(game, deer, 0, 230, "deer", "/sound/blocky.mp3")
  const bearPlayer = new Player(game, bear, 0, 250, "bear", "./sound/clicky.mp3")
  const hippoPlayer = new Player(game, hippo, 0, 270, "hippo", "./sound/grass.mp3")
  const giraffePlayer = new Player(game, giraffe, 0, 300, "giraffe", "./sound/ground.mp3")
  const elephantPlayer = new Player(game, elephant, 0, 330, "elephant", "./sound/hall.mp3")
  const zebraPlayer = new Player(game, zebra, 0, 360, "zebra", "./sound/muffled.mp3")
  const players = [
    deerPlayer,
    bearPlayer,
    hippoPlayer,
    giraffePlayer,
    elephantPlayer,
    zebraPlayer,
  ];
  game.setPlayers(players);
  animate(0);

//   watchEvent('deer', (data) => {
//     deerPlayer.update(16, data)
//   })
//   watchEvent('bear', (data) => {
//     bearPlayer.update(16, data)
//   })
//   watchEvent('hippo', (data) => {
//     hippoPlayer.update(16, data)
//   })
//   watchEvent('giraffe', (data) => {
//     giraffePlayer.update(16, data)
//   })
//   watchEvent('elephant', (data) => {
//     elephantPlayer.update(16, data)
//   })
//   watchEvent('zebra', (data) => {
//     zebraPlayer.update(16, data)
//   })

//   watchEvent('bettingStart', (data) => {
//     console.log('bettingStart', data);
//     console.log('game.isStop', game.isStop);
    
//     game.setIsStop(false)
//     console.log('game.isStop after', game.isStop);
//     game.restartPlayer()
//   })

  // window.addEventListener('keydown', (e) => {
  //   console.log('in home');
    // if (e.key === 'ArrowLeft') {
    //   console.log('left ne');
    //   if (game.isStop) {

    //     game.setIsStop(false)
    //   } else {
    //     game.isStop = true
    //   }
    //   console.log('is stop', game.isStop);
      
    // }
    
      // switch(e.key) {
      //     case 'ArrowLeft' :
      //         this.lastKey = 'PRESS LEFT'
      //         break;
      //     case 'ArrowRight' :
      //         this.lastKey = 'PRESS RIGHT'
      //         deerPlayer.update(16)
      //         break;
      //     case 'ArrowDown' :
      //         this.lastKey = 'PRESS DOWN'
      //         break;
      //     case 'ArrowUp' :
      //         this.lastKey = 'PRESS UP'
      //         break;
      //     case 'Enter' :
      //         this.lastKey = 'PRESS ENTER'
      //         break;
      // }
  // })

});

function draw() {
  game.update(deltaTime);
  game.draw(ctx);
}

function animate(timeStamp) {
  // console.log('game.isStop', game.isStop);
  
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  if (!game.isStop) {
    game.update(deltaTime);
    game.draw(ctx);
  } else if (game.isStop) {
    reward.updatePlayerImage(game.winner.image);
    reward.update();
    reward.draw(ctx);
  }
  animation = requestAnimationFrame(animate);
  
}
</script>
