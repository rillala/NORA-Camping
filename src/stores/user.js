// https://pinia.vuejs.org/core-concepts/state.html
//vuex
import axios from 'axios';
import { defineStore } from 'pinia';
import apiInstance from '@/plugins/auth';

export default defineStore('userStore', {
  // 對應 data
  state: () => ({
    token: '',
    memberInfo: {},
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
      // 在這裡將用户頭像 URL 保存到 localStorage
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
    updateUserData(data) {
      console.log('Received data:', data); // 確認收到的數據
      if (data) {
        // 如果 data 不是 undefined 或 null，則更新 memberInfo
        this.memberInfo = {
          member_id: data.member_id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          photo: data.photo,
        };
        // localStorage.setItem('userData', JSON.stringify(this.memberInfo));
        console.log('Updated userData:', this.memberInfo);
      } else {
        // 如果 data 是 undefined 或 null，則在這裡處理錯誤
        console.error('Received undefined data');
      }
    },
    checkUserData() {
      const storageUserData = localStorage.getItem('userData');
      console.log(Object.keys(this.userData).length);
      if (Object.keys(this.userData).length > 0) {
        return this.userData;
      } else if (storageUserData) {
        this.userData = JSON.parse(storageUserData);
        return storageUserData;
      } else {
        return '';
      }
    },
    logout() {
      this.token = '';
      // this.userData = '';
      localStorage.removeItem('token');
      // localStorage.removeItem('userData');
      // this.userProfileImage = null;
      sessionStorage.clear();
    },
    async getMemberInfo() {
      try {
        const token = localStorage.getItem('token'); // 使用 getItem 方法和 'token' 鍵
        // 確保 token 存在
        if (!token) {
          console.error('Logout error: No token found');
          return;
        }
        // 發送請求到後端，獲取用戶資料
        const response = await apiInstance.get('/memberInfo.php', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // 更新 Pinia store 裡的使用者資料
        console.log(response.data);
        this.updateUserData(response.data);
        // 調用 Pinia action 並傳入響應數據
      } catch (error) {
        console.error('Error fetching member info:', error);
        // 處理錯誤，可能需要在界面上顯示錯誤資訊
      }
    },
  },
});
