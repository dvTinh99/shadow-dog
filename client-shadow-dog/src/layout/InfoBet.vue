<template>
    <div class="info-bet" >
        <bet-total :src-image="animal.image" :type="animal.btnType" v-for="animal in animals"/>
    </div>
</template>
<script lang="ts" setup>
import BetTotal from '@/components/BetTotal.vue';
import animals from "@/config/animal"
</script>
<style scope>


@media only screen and (max-width: 768px) {
    .info-bet {
        box-sizing: border-box;
        padding: 10px;
        display: grid;
        row-gap: 20px;
        column-gap: 20px;
        grid-template-columns: auto auto auto;

    }
}

@media only screen and (min-width: 768px) {
    .info-bet {
        box-sizing: border-box;
        padding: 10px;
        display: grid;
        row-gap: 20px;
        column-gap: 20px;
        grid-template-columns: auto auto;

    }
}
</style>