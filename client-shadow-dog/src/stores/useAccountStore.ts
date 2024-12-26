import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {toastError, toastSuccess} from "@/composable/useToast"
import { emitEvent } from "@/composable/useSocket"
export const useAccountStore = defineStore('account', () =>{
  const account = ref({
    balance : 5000000,
    id : 1
  })

  function bet(animalId : number, number : number) {
    if (account.value.balance >= number) {
      account.value.balance -= number
      emitEvent('bet', {
        userId : account.value.id,
        animalId : animalId,
        amount : number
      })
      toastSuccess('bet thành công')
      return true
    }

    toastError('bet không thành công')
    return false
  }

  return { account, bet }
})
