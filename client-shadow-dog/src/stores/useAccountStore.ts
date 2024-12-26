import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {toastError, toastSuccess} from "@/composable/useToast"
export const useAccountStore = defineStore('account', () =>{
  const account = ref({
    balance : 5000000
  })

  function bet(number : number) {
    if (account.value.balance >= number) {
      account.value.balance -= number
      toastSuccess('bet thành công')
      return true
    }

    toastError('bet không thành công')
    return false
  }

  return { account, bet }
})
