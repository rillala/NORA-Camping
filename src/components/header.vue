<script>
import { RouterLink, RouterView } from 'vue-router';
import memberLogin from '@/components/memberLogin.vue';

export default {
  components: {
    memberLogin,
  },
  data() {
    return {
      isMenuOpen: false,
      reserveBtn:{
name: "線上預約",
path: "/reserve",
},
shopBtn:{
    name: "野良選物",
    path: "/shop",

      } ,
      navList: [
        {
          name: '關於野良',
          path: '/about',
        },
        {
          name: '營地導覽',
          path: '/camp',
        },
        {
          name: '常見問題',
          path: '/faq',
        },
        {
          name: '野良之家',
          path: '/shelter',
        },
      ],
    };
  },
  watch: {
    isMenuOpen(newVal, oldVal) {
      document.body.style.overflow = newVal ? 'hidden' : 'auto';
    },
  },
  methods: {
    getImageUrl(paths) {
    return new URL(`../assets/image/${paths}`, import.meta.url).href;
    },
  },
};
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
        <span v-for="num in 3"></span>
      </label>

      <!--導覽列右側-->
      <div id="nav-box">
        <RouterLink :to="reserveBtn.path" class="bg-blue-3" id="reserve-btn-desktop"
          ><img :src="getImageUrl('headerFooter/reservation-mobile.png')"
             :alt="reserveBtn"
          />
          <p>
            {{ reserveBtn.name }}
          </p></RouterLink
        >

        <RouterLink :to="shopBtn.path" class="bg-blue-3" id="shop-btn-desktop"
          ><img :src="getImageUrl('headerFooter/shop-mobile.png')" :alt="shopBtn" />
          <p>{{ shopBtn.name }}</p></RouterLink
        >

        <!--會員登入-->
        <button id="member-login"> 
       <memberLogin/>
        </button>

        <!--購物車-->
        <RouterLink to="/shopCar" id="shop-car"></RouterLink>

        <!--平板用子選單開關-->

        <label for="hambuger-tablet" id="menu-btn-tablet" class="menu-btn">
          <span v-for="num in 3"></span>
        </label>
      </div>
    </div>

    <ul id="menu-list">
      <li>
        <RouterLink :to="reserveBtn.path" class="bg-blue-3" id="reserve-btn"
          ><img :src="getImageUrl('headerFooter/reservation-mobile.png')" :alt="reserveBtn"
          />
          <p>
            {{ reserveBtn.name }}
          </p></RouterLink
        >
      </li>
      <li>
        <RouterLink :to="shopBtn.path" class="bg-blue-3" id="shop-btn"
          ><img :src="getImageUrl('headerFooter/shop-mobile.png')" :alt="shopBtn" />
          <p>{{ shopBtn.name }}</p></RouterLink
        >
      </li>
      <li v-for="link in navList" :key="link.name"><RouterLink :to="link.path" class="sub-menu dark">
      {{link.name}} 
      </RouterLink></li>
     
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/header.scss';


</style>
