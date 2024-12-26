<template>
      <div id="bet2">
        <div>
          <bet-range :src-image="animal.image" :animal-id="animal.id" v-for="animal in animals"/>
          <hr>
        </div>
      </div>
</template>
<script lang="ts" setup>
import BetRange from '@/components/BetRange.vue';
import animals from "@/config/animal"
</script>
<style scope>

#bet2 {
    box-sizing: border-box;
    padding: 10px;
}

</style>