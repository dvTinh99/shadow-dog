<template>
      <div id="bet2">
        <bet-range src-image="/src/assets/images/bet/deer.png"/>
        <hr>
        <bet-range src-image="/src/assets/images/bet/bear.png"/>
        <hr>
        <bet-range src-image="/src/assets/images/bet/hippo.png"/>
        <hr>
        <bet-range src-image="/src/assets/images/bet/giraffe.png"/>
        <hr>
        <bet-range src-image="/src/assets/images/bet/elephant.png"/>
        <hr>
        <bet-range src-image="/src/assets/images/bet/zebra.png"/>
      </div>
</template>
<script lang="ts" setup>
import BetRange from '@/components/BetRange.vue';

</script>
<style scope>

#bet2 {
    box-sizing: border-box;
    padding: 10px;
}

</style>