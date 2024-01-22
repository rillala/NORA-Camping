// https://pinia.vuejs.org/core-concepts/state.html
//vuex
import { defineStore } from 'pinia'
export default defineStore('userStore', {
  // 對應 data
  state: () => ({
    token: '',
    userData:{},
  }),
  // 對應 computed (物件形式)
  getters: {
    // getUserName: (state) => `歡迎 ${state.name}`
  },
  // 對應 methods (物件形式)
  actions: {
    updateToken(val){
        console.log(val);
        this.token =val //登出登入切換
    }
  }
})