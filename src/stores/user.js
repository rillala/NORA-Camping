// https://pinia.vuejs.org/core-concepts/state.html
//vuex
import { defineStore } from 'pinia';
import apiInstance from '@/plugins/auth';
import router from '@/router';

export default defineStore('userStore', {
  // 對應 data
  state: () => ({
    token: '',
    memberInfo: {},
  }),
  actions: {
    // initializeUserState() {
    //   const userProfileImage = localStorage.getItem('userProfileImage');
    //   if (userProfileImage) {
    //     this.updateUserProfileImage(userProfileImage);
    //   }
    // },
    // updateUserProfileImage(imageUrl) {
    //   this.userProfileImage = imageUrl;
    //   // 在這裡將用户頭像 URL 保存到 localStorage
    //   localStorage.setItem('userProfileImage', imageUrl);
    //   console.log('Profile image updated:', imageUrl);
    // },
    // checkLogin() {
    //   const storageToken = localStorage.getItem('token');
    //   if (this.token) {
    //     return this.token;
    //   } else if (storageToken) {
    //     return (this.token = storageToken);
    //   } else {
    //     return '';
    //   }
    // },
    updateToken(payload) {
      if (payload) {
        this.token = payload;
        localStorage.setItem('token', payload);
      } else {
        this.token = '';
        localStorage.removeItem('token');
      }
    },
    updateUserData(data) {
        this.memberInfo = {
          member_id: data.member_id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          photo: data.photo,
        }
        localStorage.setItem('memberInfo', JSON.stringify(this.memberInfo))
    },
    logout() {
      // 從本地存儲中獲取token
      const token = localStorage.getItem('token'); // 使用 getItem 方法和 'token' 鍵
      console.log(token);
      // 確保token存在
      if (!token) {
        console.error('Logout error: No token found');
        return;
      }
      apiInstance
        .post(
          'logout.php',
          {},
          {headers: {Authorization: `Bearer ${token}`,},
          },
        )
        .then(response => {
          // 檢查後端是否返回登出成功的訊息
          if (!response.data.error) {
            this.token = '';
            localStorage.removeItem('token');
            this.isMemberSubOpen = false;
            sessionStorage.clear();
            // this.isLoginOpen = false;
            // this.memberInfo = {}; 
            this.updateUserData = '';
            // 登出成功，重定向到首頁
            router.push({ name: 'home' });
            alert('已登出');
            
          } else {
            // 如果後端返回失敗訊息，處理這些訊息
            console.error('Logout failed:', response.data.message);
          }
        })
        .catch(error => {
          // 處理登出過程中發生的錯誤
          console.error('Logout error:', error);
        });
    },
    async getMemberInfo() {
      try {
        const token = localStorage.getItem('token'); // 使用 getItem 方法和 'token' 鍵
        // 確保 token 存在
        if (!token) {
          console.error('Logout error: No token found');
          return;
        }
        const response = await apiInstance.get('/memberInfo.php', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.updateUserData(response.data);

      } catch (error) {
        console.error('Error fetching member info:', error);
      }
    },
  },
});
