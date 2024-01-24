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
  <!-- 分隔線 -->
  <div class="otherquestion">
    <img src="../assets/image/FAQView/faqBox.png" alt="問號箱箱">
    <button>我有其他問題</button>
  </div>
  <!-- 分隔線 -->
  <div class="FAQtype">
    <div id="reservation">
      <button><h4>營地預約</h4></button>
    </div>
    <div id="rental">
      <button><h4>裝備租借</h4></button>
    </div>
    <div id="shelter">
      <button><h4>野良之家</h4></button>
    </div>
    <div id="shopping">
      <button><h4>商品購物</h4></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../src/assets/sass/base/_reset.scss';
@import '../src/assets/sass/base/_color.scss';
@import '../src/assets/sass/base/_text.scss';
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
/*---------------分隔線--------------*/
.FAQtype button{
  width: 80vw;
  height: 20vw;
  border: none;
  border-radius: 10px;
  background-color: $blue-2;
  margin: 10px;
}
</style>
