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
      };
      localStorage.setItem('memberInfo', JSON.stringify(this.memberInfo));
    },
    logout() {
      // 確保token存在
      if (!localStorage.getItem('token')) {
        console.error('Logout error: No token found');
        return;
      }

      const form = new FormData();
      form.append('data', this.memberInfo.member_id);

      apiInstance
        .post('logout.php', form)
        .then(response => {
          // 檢查後端是否返回登出成功的訊息
          if (!response.data.error) {
            this.token = '';
            this.isMemberSubOpen = false;
            this.memberInfo = {};
            localStorage.removeItem('token');
            localStorage.removeItem('memberInfo');
            sessionStorage.clear();
            // 登出成功，重定向到首頁
            alert('已登出');
            router.push({ name: 'home' });
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
