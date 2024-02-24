<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心</h1>
    </div>
  </div>

  <div>
    <ul class="nav-list">
      <li><router-link to="/membercenter" class="memberlink member-page">會員資料</router-link></li>
      <li><router-link to="/memberorderhistory" class="memberlink">商品訂單</router-link></li>
      <li><router-link to="/membercampsiteorders" class="memberlink">營地訂單</router-link></li>
    </ul>
  </div>

  <div class="drop-box">
    <div id="dropzone" class="drop-area" @dragover.prevent="dragOver" @drop.prevent="dropped">
      <img v-if="imageSrc" :src="imageSrc" alt="Dropped Image"><p class="added-photo">新增頭貼</p>
    </div>
  </div>

  <div class="info-container">
    <section class="info-box">
      <div v-if="!isEditing" >
        <h4>個人資訊</h4>
        <div class="inner">
          <p class="member-title-1 member-no">會員編號 {{ memberInfo.member_id }}</p>
        </div>
        <p class="member-title-1">會員姓名  {{ memberInfo.name }}</p>
        <p class="member-title-1">會員信箱  {{ memberInfo.email }}</p>
        <p class="member-title-1">會員電話  {{ memberInfo.phone }}</p>
        <p class="member-title-1">會員地址  {{ memberInfo.address }}</p>
        <div class="box"><button class="startEditing" @click="startEditing">編輯</button></div>
      </div>

      <div v-else >
        <h4>個人資訊</h4>
        <div class="inner">
          <p class="member-title-2 member-no">會員編號: {{ memberInfo.member_id }}</p>
        </div>
        <div class="inner">
          <p class="member-title-2 info-title">會員姓名:</p><input v-model="editMemberInfo.name" placeholder="姓名" class="info-input"/>
        </div>
        <div class="inner">
          <p class="member-title-2">會員信箱: {{ memberInfo.email }}</p> 
        </div>
        <div class="inner">
          <p class="member-title-2">會員電話:</p>  <input v-model="editMemberInfo.phone" placeholder="電話" class="info-input"/>
        </div>
        <div class="inner">
          <p class="member-title-2">會員地址:</p>  <input v-model="editMemberInfo.address" placeholder="地址" class="info-input"/>
        </div>

        <div class="box">
          <button class="save-changes" @click="saveChanges">儲存</button>
          <button class="cancelEditing" @click="cancelEditing">取消</button>
        </div>
      </div>
    </section>
      
  <form class="password-box">
    <div v-if="!isEditingPassword" >
      <h4>修改密碼</h4>
      <p class="password password-title-1" value="disabled">請輸入舊密碼 <span>*****************</span> {{ oldPassword }}</p>
      <p class="password password-title-1" value="disabled">請輸入新密碼 <span>*****************</span> {{ newPassword }}</p>
      <p class="password password-title-1" value="disabled">再確認新密碼 <span>*****************</span> {{ confirmPassword }}</p>
      <div class="box">
        <button class="save-changes" @click="startEditingPassword">修改密碼</button>
        <button class="logout" @click.stop="logout">登出</button>
      </div>
    </div>
    
    <div v-else>
      <h4>修改密碼</h4>
      <label class="password-title-2">請輸入舊密碼: <input type="password" v-model="oldPassword"  class="psw-input"/></label><br/>
      <label class="password-title-2">請輸入新密碼: <input type="password" v-model="newPassword"  class="psw-input"/></label><br/>
      <label class="password-title-2">再確認新密碼: <input type="password" v-model="confirmPassword" class="psw-input"/></label><br/>  
      
      <div class="box"><button class="savePasswordChanges" @click="savePasswordChanges">儲存</button></div>
    </div>
  </form>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';
import apiInstance from '@/plugins/auth';

export default {
  data() {
    return {
      isEditing: false,
      // memberInfo: {
      //   member_id:'',
      //   name: ' ',
      //   phone: '',
      //   email:'',
      //   address: '',
      // },
      editMemberInfo: {
        name: '',
        phone: '',
        email:'',
        address: '',
      },

      isEditingPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      imageSrc: '',
    };
  },
  mounted() {
    this.getMemberInfo();
  },
  computed: {
    ...mapState(userStore, ['memberInfo']),
  },
  methods: {
    // 使用 mapActions 輔助函數將/src/stores/user裡的actions/methods 映射在這裡
    ...mapActions(userStore, ['updateToken', 'updateUserData']),
    async getMemberInfo() {
    try {
      const token = localStorage.getItem('token'); // 使用 getItem 方法和 'token' 鍵
      // console.log(token)
      // 確保token存在
      if (!token) {
        console.error('Logout error: No token found');
        return;
      }
      // 發送請求到後端，獲取用戶資料
      const response = await axios.get('/api/memberInfo', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // 更新 Pinia store 裡的使用者資料
      console.log(response.data)
      this.updateUserData(response.data);
       //  調用 Pinia action 並傳入響應數據
    } catch (error) {
      console.error("Error fetching member info:", error);
      // 處理錯誤，可能需要在界面上顯示錯誤資訊
    }
  },

    logout() {
      // 調用pinia的updateToken
      this.updateToken('');
      this.updateUserData('');
      this.isMemberSubOpen = false;
      this.$router.push('/');
    },
    
    startEditing() {
    // 複製當前會員資料到編輯用的對象中
    this.editMemberInfo = {
      name: this.memberInfo.name,
      phone: this.memberInfo.phone,
      email: this.memberInfo.email, // 假設郵箱不允許在此處編輯
      address: this.memberInfo.address,
    };
    this.isEditing = true;
    },
    saveChanges() {
      const token = localStorage.getItem('token'); // 從本地存儲獲取用戶的token
      axios.put('/api/memberUpdate', {
      member_id: this.memberInfo.member_id, // 假設這是您從store或初始化時獲得的會員ID
      name: this.editMemberInfo.name,
      phone: this.editMemberInfo.phone,
      address: this.editMemberInfo.address
  }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      // 更新成功
      alert('資料更新成功');
      console.log(response.data)
      this.getMemberInfo()
      // this.updateUserData(response.data); // 更新前端store或狀態
      // this.memberInfo = {...this.editMemberInfo}
      this.isEditing = false;
    })
    .catch(error => {
      // 處理錯誤
      console.error("更新資料失敗:", error);
      alert('資料更新失敗');
    });
  },
    // saveChanges() {
    //   // 在這裡處理保存變更的邏輯
    //   this.memberInfo = {...this.editMemberInfo};
    //   this.isEditing = false;
    // },
    cancelEditing() {
      // 在這裡處理取消編輯的邏輯
      this.isEditing = false;
    },
    startEditingPassword() {
    this.isEditingPassword = true;
    },
    
    savePasswordChanges() {
    // 在這裡處理保存密碼變更的邏輯
    // 需要檢查舊密碼是否正確，新密碼是否一致等
    this.isEditingPassword = false;
    },
    cancelPasswordEditing() {
    // 在這裡處理取消密碼修改的邏輯
    this.isEditingPassword = false;
    },

    dragOver(e) {
      e.preventDefault();
    },
    
    dropped(e) {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const readFile = new FileReader();
      readFile.readAsDataURL(file);
      readFile.onload = () => {
      this.imageSrc = readFile.result;
      } ;
    }
  }
};
</script>



<style lang="scss" scoped>
@import '@/assets/sass/page/memberCenterView.scss';
</style>