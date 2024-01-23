<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心</h1>
    </div>
  </div>

  <div>
    <ul class="nav-list">
      <li><router-link to="/membercenter" class="memberlink">會員資料</router-link></li>
      <li><router-link to="/memberorderhistory" class="memberlink">訂單歷史</router-link></li>
      <li><router-link to="/membercampsiteorders" class="memberlink">營地訂單</router-link></li>
    </ul>
  </div>

  <section class="info-box">
    <div v-if="!isEditing">
      <h3>個人資訊</h3>
      <p class="member-no">會員編號</p>
      <p class="info">會員姓名  {{ memberInfo.name }}</p>
      <p class="info">會員信箱  {{ memberInfo.email }}</p>
      <p class="info">會員電話  {{ memberInfo.phone }}</p>
      <p class="info">會員地址  {{ memberInfo.address }}</p>
      <button class="startEditing" @click="startEditing">編輯</button>
    </div>

    <div v-else>
      <h3>個人資訊</h3>
      <p class="member-no">會員編號</p>
      會員姓名  <input v-model="memberInfo.name" placeholder="姓名" class="info"/><br/>
      會員信箱  <input v-model="memberInfo.email" placeholder="email" class="info"><br/>
      會員電話  <input v-model="memberInfo.phone" placeholder="電話" class="info"/><br/>
      會員地址  <input v-model="memberInfo.address" placeholder="地址" class="info"/><br/>

      <button class="saveChanges" @click="saveChanges">儲存</button>
      <button class="cancelEditing" @click="cancelEditing">取消</button>
    </div>
  </section>
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
  },
};
</script>



<style lang="scss" scoped>
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


h3{
  width:350px;
  background-color: $blue-3;
  border-radius:50px;
  padding-left:20px;
  margin-bottom: 10px;
}
.info-box{
  width:350px;
  margin: 0 auto;
  font-size: 16px;
}

.member-no{
  font-size: 16px;
}
.info{
  font-size: 16px;
  border:none;
  outline: none;
  padding-left:5px;
}

.startEditing{
  background-color:$blue-3;
  border:none;
  padding: 6px 15px;
  border-radius: 50px;
  margin-left:auto;
  margin-top:5px;
}
.saveChanges{
  background-color:$blue-3;
  border:none;
  padding: 6px 15px;
  border-radius: 50px;
  margin-left:auto;
  margin-top:5px;
}

.cancelEditing{
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

</style>
