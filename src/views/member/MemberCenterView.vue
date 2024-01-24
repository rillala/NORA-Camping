<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心</h1>
    </div>
  </div>

  <div>
    <ul class="nav-list">
      <li><router-link to="/membercenter" class="memberlink member-page">會員資料</router-link></li>
      <li><router-link to="/memberorderhistory" class="memberlink">訂單歷史</router-link></li>
      <li><router-link to="/membercampsiteorders" class="memberlink">營地訂單</router-link></li>
    </ul>
  </div>

  <div class="info-container">
    <section class="info-box">
      <div v-if="!isEditing" >
        <h4>個人資訊</h4>
        <p class="member-no">會員編號</p> 
        <p >會員姓名  {{ memberInfo.name }}</p>
        <p >會員信箱  {{ memberInfo.email }}</p>
        <p >會員電話  {{ memberInfo.phone }}</p>
        <p >會員地址  {{ memberInfo.address }}</p>
        <div class="box"><button class="startEditing" @click="startEditing">編輯</button></div>
      </div>

      <div v-else >
        <h4>個人資訊</h4>
        <div class="inner">
          <p class="member-no">會員編號</p><span class="member-no">111</span>
        </div>
        <div class="inner">
          <p class="info-title">會員姓名:</p>  <input v-model="editMemberInfo.name" placeholder="姓名" class="info"/>
        </div>
        <div class="inner">
          <p>會員信箱:</p>  <input v-model="editMemberInfo.email" placeholder="email" class="info">
        </div>
        <div class="inner">
          <p>會員電話:</p>  <input v-model="editMemberInfo.phone" placeholder="電話" class="info"/>
        </div>
        <div class="inner">
          <p>會員地址:</p>  <input v-model="editMemberInfo.address" placeholder="地址" class="info"/>
        </div>

        <div class="box">
          <button class="save-changes" @click="saveChanges">儲存</button>
          <button class="cancelEditing" @click="cancelEditing">取消</button>
        </div>
      </div>
    </section>
      
    <section class="password-box">
      <div v-if="!isEditingPassword" >
        <h4>修改密碼</h4>
        <p class="password">舊密碼 {{ oldPassword }}</p>
        <p class="password">新密碼 {{ newPassword }}</p>
        <p class="password">再次確認密碼 {{ confirmPassword }}</p>
        <div class="box">
          <button class="save-changes" @click="startEditingPassword">修改密碼</button>
          <button class="logout">登出</button>
        </div>
      </div>
      
      <div v-else>
        <h4>修改密碼</h4>
        <label>請輸入舊密碼: <input type="password" v-model="oldPassword" placeholder="輸入舊密碼" class="info"/></label><br/>
        <label>請輸入新密碼: <input type="password" v-model="newPassword" placeholder="輸入新密碼" class="info"/></label><br/>
        <label>再次確認新密碼: <input type="password" v-model="confirmPassword" placeholder="再次確認新密碼" class="info"/></label><br/>  
        
        <div class="box"><button class="savePasswordChanges" @click="savePasswordChanges">儲存</button></div>
      </div>
    </section>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      isEditing: false,
      memberInfo: {
        name: 'John Doe',
        phone: '1234567890',
        email:'tibame@gmail.com',
        address: 'Some Address',
      },
      editMemberInfo: {
        name: 'John Doe',
        phone: '1234567890',
        email:'tibame@gmail.com',
        address: 'Some Address',
      },

      isEditingPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    saveChanges() {
      // 在這裡處理保存變更的邏輯
      this.isEditing = false;
    },
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
    aa() {
      this.memberInfo = {...this.editMemberInfo}
    },
  },
};
</script>



<style lang="scss" scoped>
*{
  font-family: 'Inter', sans-serif;
}

.member-page {
  font-weight: bold; 
  color: $blue-4;
}

div ul{
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.memberlink {
  display: block;
  text-decoration: none;
  color:$blue-3;
  font-size: 26px;
  padding:0 10px;
  white-space: nowrap;

  &:hover{
  color:$blue-4;
  border-bottom:1px solid $blue-4;
  }
}

.title-wrap {
  padding-top: 70px;
  margin-left: 80px;
  color: $blue-4;
}
.banner-bgc {
  background-color: $blue-1;
  height: 200px;
  width: 100%;
}


h4{
  width:350px;
  background-color: $blue-3;
  border-radius:50px;
  padding-left: 20px;
  margin-bottom: 10px;
  padding-top:10px;
  padding-bottom:10px;

}

.info-container{
    @include tablet {
    display:flex;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
  }
    @include desktop {
    display:flex;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto
  }
}
.info-box{
  width:350px;
  margin: 0 auto;
  font-size: 16px;
  height:250px;
  @include tablet {
    height:400px;
  }
  
  @include desktop {
  height:400px ;
  }

}
.info{
  border:none;
  outline: none;
  padding-left:5px;
  border-bottom: 1px solid #000;
  @include font-style(16px, 400, 1%, 160%);
}

.startEditing, .save-changes, .savePasswordChanges {
  background-color: $blue-3;
  border: none;
  padding: 6px 15px;
  border-radius: 50px;
  margin-left: auto;
}
.logout, .cancelEditing{
  background-color:$blue-2;
  border:none;
  padding: 6px 15px;
  border-radius: 50px;
  margin:5px;
  margin-left:auto;
  margin-top:5px;
}

p{
  padding-left:5px;
}

.password-box{
  width:350px;
  height:350px;
  margin: 10px auto;
  font-size: 16px;
  @include tablet {
    display:flex;
    justify-content: center;
    height:400px;
    margin: 0;
  }
    @include desktop {
    display:flex;
    justify-content: center;
    height:400px;
    margin: 0;
  }
}

.box{
  margin-top:20px;
  display: flex;
  justify-content: end;

  *{
    margin: 0;
  }

  * +*{
    margin-left: 10px;
  }
}

.info-title{
  padding-left:5px;
}

.inner{
  display: flex;
}

label{
  @include font-style(16px, 400, 1%, 160%);
}
</style>
