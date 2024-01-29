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

  <div>
    <div id="dropzone" class="drop-area" @dragover.prevent="dragOver" @drop.prevent="dropped">
      <img v-if="imageSrc" :src="imageSrc" alt="Dropped Image">新增頭貼
    </div>
  </div>

  <div class="info-container">
    <section class="info-box">
      <div v-if="!isEditing" >
        <h4>個人資訊</h4>
        <div class="inner">
          <p class="member-title-1 member-no">會員編號</p><span>0000001</span>
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
          <p class="member-title-2 member-no">會員編號:</p><span>0000001</span>
        </div>
        <div class="inner">
          <p class="member-title-2 info-title">會員姓名:</p><input v-model="editMemberInfo.name" placeholder="姓名" class="info-input"/>
        </div>
        <div class="inner">
          <p class="member-title-2">會員信箱:</p>  <input v-model="editMemberInfo.email" placeholder="email" class="info-input">
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
        <button class="logout">登出</button>
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
      imageSrc: '',
    };
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    saveChanges() {
      // 在這裡處理保存變更的邏輯
      this.memberInfo = {...this.editMemberInfo};
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
.info-input{
  border:none;
  outline: none;
  border-bottom: 1px solid #000;
  width:200px;
  @include font-style(16px, 400, 1%, 160%);
}

.psw-input{
  border:none;
  outline: none;
  border-bottom: 1px solid #000;
  width:180px;
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
  align-items: center; 
}

label{
  @include font-style(16px, 400, 1%, 160%);
}

.password-title-1, 
.password-title-2
{
  padding-left:20px;
  white-space:no-wrap;
  @include font-style(16px, 400, 1%, 160%);

// 平板 + 桌機板
  @include tablet {
    @include font-style(20px, 400, 1%, 160%);
  }
}

.member-title-1, 
.member-title-2{
  padding-left:20px;
  margin-right:4px;
}

.password-title-1:hover {
    cursor: not-allowed;  
}

span{
  @include font-style(16px, 400, 1%, 160%);

// 平板 + 桌機板
  @include tablet {
  @include font-style(20px, 400, 1%, 160%);
  }
}

.drop-area {
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 50%; /* 將邊框設置為圓形 */
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #f0f0f0; /* 設置背景顏色 */
  margin:auto;
  margin-bottom: 10px;
}

#dropzone {
  border: 2px dashed #ccc;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.password-title-1 span {
  color:white;
  border-bottom: 1px solid $dark;
}
</style>
