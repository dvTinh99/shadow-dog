<template>
  <div class="d-flex" style="justify-content: center; align-items: center">
    <div class="d-flex" style="width: 10%; justify-content: center; align-items: center;">
      <img :src="props.srcImage" alt="" width="40" height="40">
    </div>
    <div style="width: 70%">
      <div class="d-flex justify-content-center">
        <label for="customRange1" class="form-label">{{ Intl.NumberFormat().format(parseInt(amount)) }}</label>
      </div>
      <input type="range" class="form-range" id="customRange1" v-model="amount" step="5000" min="5000" max="50000000"/>
    </div>
    <div class="d-flex" style="width: 20%; justify-content: center; align-items: center;">
      <button type="button" class="btn btn-dark" @click="bet">bet</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAccountStore } from "@/stores/useAccountStore";

const amount = ref<string>('5000')
const accountStore = useAccountStore(); 


const props = defineProps({
    srcImage : String
})



const bet = () => {
  accountStore.bet(parseInt(amount.value))
}
</script>
