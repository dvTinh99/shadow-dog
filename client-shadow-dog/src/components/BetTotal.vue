<template>
  <div class="current-bet">
    <div
      :class="`alert alert-${type} custom-alert d-flex`"
      role="alert"
      style="align-items: center"
    >
      <img :src="props.srcImage" height="30" width="30" style="" />
      9000
      <!-- <link rel="icon" type="image/x-icon" href="/assetHorizone/deer/images.ico"> -->
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
    srcImage: string,
    type?: string
}

const props = withDefaults(defineProps<Props>(), {
    type : 'primary'
});
</script>
<style scoped>
.custom-alert {
  padding: 7px !important;
  display: flex;
  justify-content: space-between;
}
</style>
