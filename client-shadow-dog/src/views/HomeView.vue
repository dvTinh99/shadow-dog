<template>
  <div class="home">

    <Asset />
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
        <AccountInfo />
        <hr>
        <info-bet />
        <hr>
        <bet/>
      </div>
      <div v-if="tab === 'chat'" style="height: 70%;">
         <chat-box />
      </div>

  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from "vue";
import Game from "@/entity/Game";
import Reward from "@/entity/Reward";
import Player from "@/entity/Player";
// import { watchEvent } from '../composable/useSocket';
import ChatBox from "@/layout/ChatBox.vue";
import InfoBet from "@/layout/InfoBet.vue";
import Bet from "@/layout/Bet.vue";
import Asset from "@/layout/Asset.vue";
import AccountInfo from "@/layout/AccountInfo.vue";
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
  game.setPlayers();
  animate(0);

});

function animate(timeStamp : number) {
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

