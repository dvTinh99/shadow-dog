<template>
    <div class="info-bet" >
        <bet-total src-image="/src/assets/images/bet/deer.png" type="danger"/>
        <bet-total src-image="/src/assets/images/bet/bear.png" type="secondary"/>
        <bet-total src-image="/src/assets/images/bet/hippo.png" type="success"/>
        <bet-total src-image="/src/assets/images/bet/giraffe.png" type="warning"/>
        <bet-total src-image="/src/assets/images/bet/elephant.png" type="info"/>
        <bet-total src-image="/src/assets/images/bet/zebra.png" type="dark"/>
    </div>
</template>
<script lang="ts" setup>
import BetTotal from '@/components/BetTotal.vue';
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