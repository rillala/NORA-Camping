<script>
export default{
  

}
</script>

<template>
  <input
  type="checkbox"
  name="hambuger-mobile"
  id="hambuger-mobile"
  class="ham-check"
  v-model="isMenuOpen"
/>

<input
  type="checkbox"
  name="hambuger-tablet"
  id="hambuger-tablet"
  class="ham-check"
  v-model="isMenuOpen"
/>

<nav>
  <div id="nav-wrap">
    <a id="logo" href="index.html" alt="nora camping logo"></a>

    <!--手機用子選單開關-->

    <label for="hambuger-mobile" id="menu-btn-mobile" class="menu-btn">
      <span></span>
      <span></span>
      <span></span>
    </label>

    <!--導覽列右側-->
    <div id="nav-box">
      <!-- <a href="" class="bg-blue-3" id="reserve-btn"
        ><img src="./image/icon/reservation-mobile.png" alt="" />
        <p>線上預約</p></a
      >

      <a href="" class="bg-blue-3" id="shop-btn"
        ><img src="./image/icon/shop-mobile.png" alt="" />
        <p>野良選物</p></a
      > -->

      <!--會員登入-->
      <button id="member-login"></button>

      <!--購物車-->
      <a href="" id="shop-car"></a>

      <!--平板用子選單開關-->

      <label for="hambuger-tablet" id="menu-btn-tablet" class="menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </div>

  <ul id="menu-list">
    <li>
      <a href="" class="bg-blue-3" id="reserve-btn"
        ><img src="@/assets/image/headerFooter/reservation-mobile.png" alt="" />
        <p>線上預約</p></a
      >
    </li>
    <li>
      <a href="" class="bg-blue-3" id="shop-btn"
        ><img src="@/assets/image/headerFooter/shop-mobile.png" alt="" />
        <p>野良選物</p></a
      >
    </li>
    <li><a href="" class="sub-menu dark">關於野良</a></li>
    <li><a href="" class="sub-menu dark">營地導覽</a></li>
    <li><a href="" class="sub-menu dark">常見問題</a></li>
    <li><a href="" class="sub-menu dark">野良之家</a></li>
  </ul>
</nav>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/header.scss"

</style>