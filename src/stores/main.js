import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
  // other options...
  state() {
    return {
      user: null,
      ctr: 0
    }
  },
  actions: {
    ctrUp() {
      this.ctr++
    },
    ctrDown() {
      this.ctr--
    }
  }
})
