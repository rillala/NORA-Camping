<script>
// 引入函式庫
import axios from 'axios';

export default {};
</script>

<template>
  <div class="banner-bgc">
    <div class="title-wrap">
    <h2>常見問題</h2>
    <h4>疑難雜症大解惑</h4>
    </div>
  </div>
  <div>This is FAQ page</div>
</template>

<style lang="scss" scoped>
.title-wrap { //banner標題&副標題
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
