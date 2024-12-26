<template>
    <!-- <div id="bet">
          <button type="button" class="btn btn-primary">5.000</button>
          <button type="button" class="btn btn-success">10.000</button>
          <button type="button" class="btn btn-info">20.000</button>
          <button type="button" class="btn btn-secondary">50.000</button>
          <button type="button" class="btn btn-success">100.000</button>
          <button type="button" class="btn btn-info">200.000</button>
          <button type="button" class="btn btn-danger">1.000.000</button>
          <button type="button" class="btn btn-dark">2.000.000</button>
      </div> -->
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