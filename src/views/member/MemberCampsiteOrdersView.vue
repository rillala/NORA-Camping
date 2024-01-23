<script>
// 引入函式庫
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';

export default {};
</script>

<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心_營地訂單</h1>
    </div>
  </div>

  <nav>
    <ul class="nav-list">
      <li><router-link to="/membercenter" class="memberlink">會員資料</router-link></li>
      <li><router-link to="/memberorderhistory" class="memberlink">訂單歷史</router-link></li>
      <li><router-link to="/membercampsiteorders" class="memberlink">營地訂單</router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav ul{
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.memberlink {
  text-decoration: none;
  color:$blue-3;
  font-size: 26px;
  padding:0 10px;
}

.memberlink:hover{
  color:$blue-4;
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
</style>
