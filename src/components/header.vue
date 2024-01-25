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
      reserveBtn: {
        name: '線上預約',
        path: '/reserve',
      },
      shopBtn: {
        name: '野良選物',
        path: '/shop',
      },
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
      isLoginOpen: false,
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
    closeHam() {
      this.$refs.hamburgerMobile.checked = false;
      this.$refs.hamburgerTablet.checked = false;
      document.body.style.overflow = 'auto';
      this.isMenuOpen = false;
    },
    handleClose() {
      this.isLoginOpen = false; // 這將關閉燈箱
      console.log(this.isLoginOpen);
    },
  },
};
</script>

<template>
  <section>
    <input
      type="checkbox"
      name="hambuger-mobile"
      id="hambuger-mobile"
      class="ham-check"
      v-model="isMenuOpen"
      ref="hamburgerMobile"
    />

    <input
      type="checkbox"
      name="hambuger-tablet"
      id="hambuger-tablet"
      class="ham-check"
      v-model="isMenuOpen"
      ref="hamburgerTablet"
    />

    <nav>
      <div id="nav-wrap">
        <RouterLink to="/" id="logo" @click="closeHam"></RouterLink>

        <!--手機用子選單開關-->

        <label for="hambuger-mobile" id="menu-btn-mobile" class="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <!--導覽列右側-->
        <div id="nav-box">
          <RouterLink
            :to="reserveBtn.path"
            class="bg-blue-3"
            id="reserve-btn-desktop"
            @click="closeHam"
            ><img
              :src="getImageUrl('headerFooter/reservation-mobile.png')"
              :alt="reserveBtn"
            />
            <p>
              {{ reserveBtn.name }}
            </p></RouterLink
          >

          <RouterLink
            :to="shopBtn.path"
            class="bg-blue-3"
            id="shop-btn-desktop"
            @click="closeHam"
            ><img
              :src="getImageUrl('headerFooter/shop-mobile.png')"
              :alt="shopBtn"
            />
            <p>{{ shopBtn.name }}</p></RouterLink
          >

          <!--會員登入-->
          <button
            id="member-login"
            @click="(isLoginOpen = !isLoginOpen), closeHam"
          >
            <memberLogin :isOpen="isLoginOpen" @close="handleClose" />
          </button>

          <!--購物車-->
          <RouterLink
            to="/shopCar"
            id="shop-car"
            @click="closeHam"
          ></RouterLink>

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
          <RouterLink
            :to="reserveBtn.path"
            class="bg-blue-3"
            id="reserve-btn"
            @click="closeHam"
            ><img
              :src="getImageUrl('headerFooter/reservation-mobile.png')"
              :alt="reserveBtn"
            />
            <p>
              {{ reserveBtn.name }}
            </p></RouterLink
          >
        </li>
        <li>
          <RouterLink
            :to="shopBtn.path"
            class="bg-blue-3"
            id="shop-btn"
            @click="closeHam"
            ><img
              :src="getImageUrl('headerFooter/shop-mobile.png')"
              :alt="shopBtn"
            />
            <p>{{ shopBtn.name }}</p></RouterLink
          >
        </li>
        <li v-for="link in navList" :key="link.name">
          <RouterLink :to="link.path" class="sub-menu dark" @click="closeHam">
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/header.scss';
</style>
