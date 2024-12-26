import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAccountStore = defineStore('account', () =>{
  const account = ref({
    balance : 5000000
  })

  function bet(number : number) {
    if (account.value.balance >= number) {
      account.value.balance -= number
      return true
    }

    return false
  }

  return { account, bet }
})
