// https://pinia.vuejs.org/core-concepts/state.html
//vuex
import { defineStore } from 'pinia';
export default defineStore('userStore', {
  // 對應 data
  state: () => ({
    token: '',
    userData: {}, //補php
    userProfileImage: null,
  }),

  actions: {
    initializeUserState() {
      const userProfileImage = localStorage.getItem('userProfileImage');
      if (userProfileImage) {
        this.updateUserProfileImage(userProfileImage);
      }
    },
    updateUserProfileImage(imageUrl) {
      this.userProfileImage = imageUrl;
      // 如果需要，也可以在這裡將用户頭像 URL 保存到 localStorage
      localStorage.setItem('userProfileImage', imageUrl);
      console.log('Profile image updated:', imageUrl);
    },
    checkLogin() {
      const storageToken = localStorage.getItem('token');
      if (this.token) {
        return this.token;
      } else if (storageToken) {
        return (this.token = storageToken);
      } else {
        return '';
      }
    },
    updateToken(payload) {
      if (payload) {
        this.token = payload;
        localStorage.setItem('token', payload);
      } else {
        this.token = '';
        localStorage.removeItem('token');
      }
    },
    updateName(payload) {
      this.name = payload;
    },
    updateUserData(val) {
      this.userData = val
      console.log(val);
      // 不把全部資訊紀錄
      this.userData = {
          name: val.mem_name,
          // email驗證狀況1|0ㄋ
          validation: val.mem_validation,
          // 封鎖狀況1|0
          state: val.mem_state,
          // 如果有權限可以把權限角色記載資料庫
          role: 'editor'
      }
      localStorage.setItem('userData', JSON.stringify(this.userData))
    },
    checkUserData(){
      const storageUserData = localStorage.getItem('userData')
      console.log(Object.keys(this.userData).length);
      if(Object.keys(this.userData).length > 0){
          return this.userData
      }else if(storageUserData){
          this.userData = JSON.parse(storageUserData)
          return storageUserData
      }else{
          return ''
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
      this.userProfileImage = null;
      localStorage.removeItem('userProfileImage');
      // 清除其他可能的状态...
    },
  },
});
