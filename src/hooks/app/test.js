import {createStore} from '@/hooks/app/data-store';

export const useTest = () => {
  return createStore('test', {
    data: {
      ctr: 0
    },
    init () {
      console.log('init here')
    },
    call (a) {
      this.set('call.a', a)
    },

    incrementCtr() {
      this.$data.countdown.ctr++
    }
  })
}