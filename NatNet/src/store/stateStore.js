import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axiosInstance } from '@/utils/axios/axios.js'

export const useStateStore = defineStore('stateStore', () => {
  const isLoading = ref(false)

  return {
    isLoading
  }
})