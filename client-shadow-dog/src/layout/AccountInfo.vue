<template>
  <div class="d-flex" id="account-info">
    <div>balance : {{ Intl.NumberFormat().format(accountStore.account.balance) }}</div>
    <div>login | logout</div>
  </div>
</template>
<script setup lang="ts">
import { useAccountStore } from "@/stores/useAccountStore";

const accountStore = useAccountStore();
</script>
<style scoped>
#account-info {
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
}
</style>
