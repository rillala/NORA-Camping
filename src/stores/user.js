// https://pinia.vuejs.org/core-concepts/state.html
//vuex
import { defineStore } from 'pinia'
export default defineStore('userStore', {
  // 對應 data
  state: () => ({
    token: '',
    userData:{},
  }),

  actions: {
    checkLogin(){
      const storageToken = localStorage.getItem('token')
      if(this.token){
        return this.token
      }else if(storageToken){
        return storageToken
      }else{
        return ''
      }
    },
    updateToken (payload) {
      if(payload){
        this.token = payload
        localStorage.setItem('token', payload)
      }else{
        this.token = ''
        localStorage.removeItem('token')
      }
    },
    updateName (payload) {
      this.name = payload
    }
  }
})