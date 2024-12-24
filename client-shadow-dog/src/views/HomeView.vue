<script setup lang="ts"></script>

<template>
  <div>
    <img src="@/assets/images/animal/deer.png" alt="" id="deer" ref="deer" />
    <img src="/assetHorizone/bear/bear.png" alt="" id="bear" />
    <img src="/assetHorizone/hippo/spritesheet.png" alt="" id="hippo" />
    <img src="/assetHorizone/giraffe/spritesheet (1).png" alt="" id="giraffe" />
    <img src="/assetHorizone/zebra/spritesheet (1).png" alt="" id="zebra" />
    <img src="/assetHorizone/elephant/spritesheet.png" alt="" id="elephant" />

    <img src="/assetHorizone/finish/finish.jpg" alt="" id="finish" />
    <img src="/assetHorizone/crown/crown.jpg" alt="" id="crown" />

    <img src="/background/0.png" alt="" id="layer0" />
    <img src="/background/1.png" alt="" id="layer1" />
    <img src="/background/2.png" alt="" id="layer2" />
    <img src="/background/3.png" alt="" id="layer3" />
    <img src="/background/4.png" alt="" id="layer4" />
    <img src="/background/5.png" alt="" id="layer5" />
    <img src="/background/6.png" alt="" id="layer6" />

    <canvas ref="canvas" id="canvas1"></canvas>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from "vue";
import Game from "@/entity/Game";
import Reward from "@/entity/Reward";
import Player from "@/entity/Player";
import { watchEvent } from '../composable/useSocket';
const canvas = useTemplateRef<any>("canvas");
let lastTime = 0;
let game = null;
let reward = null;
let ctx = null;
const deltaTime = 16;
let animation = null
let oneTime = true

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

  watchEvent('deer', (data) => {
    deerPlayer.update(16, data)
  })
  watchEvent('bear', (data) => {
    bearPlayer.update(16, data)
  })
  watchEvent('hippo', (data) => {
    hippoPlayer.update(16, data)
  })
  watchEvent('giraffe', (data) => {
    giraffePlayer.update(16, data)
  })
  watchEvent('elephant', (data) => {
    elephantPlayer.update(16, data)
  })
  watchEvent('zebra', (data) => {
    zebraPlayer.update(16, data)
  })

  // let data = {
  //   percent : 0,
  //   name : 'deer'
  // }

  // window.addEventListener('keydown', (e) => {
  //   data.percent += 0.2
  //   console.log('in home');
  //   if (e.key === 'ArrowLeft') {
  //     deerPlayer.update(16, data)
  //   }
    
  //     // switch(e.key) {
  //     //     case 'ArrowLeft' :
  //     //         this.lastKey = 'PRESS LEFT'
  //     //         break;
  //     //     case 'ArrowRight' :
  //     //         this.lastKey = 'PRESS RIGHT'
  //     //         deerPlayer.update(16)
  //     //         break;
  //     //     case 'ArrowDown' :
  //     //         this.lastKey = 'PRESS DOWN'
  //     //         break;
  //     //     case 'ArrowUp' :
  //     //         this.lastKey = 'PRESS UP'
  //     //         break;
  //     //     case 'Enter' :
  //     //         this.lastKey = 'PRESS ENTER'
  //     //         break;
  //     // }
  // })
  
  
  // watchEvent('deer', (data) => {
  //   console.log(data);
    
  //   deerPlayer.update(16)
  //   deerPlayer.draw()
  // })
  
});

function draw() {
  game.update(deltaTime);
  game.draw(ctx);
}

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (game.input.lastKey === "PRESS ENTER") {
    game = new Game(canvas.width, canvas.height);
    const players = [
      new Player(game, deer, 0, 230, "deer", "/sound/blocky.mp3"),
      new Player(game, bear, 0, 250, "bear", "./sound/clicky.mp3"),
      new Player(game, hippo, 0, 270, "hippo", "./sound/grass.mp3"),
      new Player(game, giraffe, 0, 300, "giraffe", "./sound/ground.mp3"),
      new Player(game, elephant, 0, 330, "elephant", "./sound/hall.mp3"),
      new Player(game, zebra, 0, 360, "zebra", "./sound/muffled.mp3"),
    ];
    game.setPlayers(players);

    reward = new Reward(canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.isStop) {
      game.update(deltaTime);
      game.draw(ctx);
    } else {
      reward.updatePlayerImage(game.winner.image);
      reward.update();
      reward.draw(ctx);
    }
  }
  animation = requestAnimationFrame(animate);
  
}
</script>
