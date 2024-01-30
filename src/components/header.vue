<script>
import { RouterLink, RouterView } from 'vue-router';
import memberLogin from '@/components/memberLogin.vue';
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  components: {
    memberLogin,
  },
  data() {
    return {
      isMenuOpen: false, // 漢堡選單
      isLoginOpen: false, // 登入燈箱
      isMemberSubOpen: false, // 會員中心子選單
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
    };
  },
  watch: {
    isMenuOpen(newVal, oldVal) {
      document.body.style.overflow = newVal ? 'hidden' : 'auto';
    },
  },
  methods: {
    // 使用 mapActions 輔助函數將/src/stores/user裡的actions/methods 映射在這裡
    ...mapActions(userStore, ['updateToken']),
    logout() {
      // 調用pinia的updateToken
      this.updateToken('');
      this.isMemberSubOpen = false;
    },
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
      this.isMenuOpen = false; // 關閉子選單-->手機板需要
      console.log(this.isLoginOpen);
    },
    memberCenter() {
      if (this.isLogin) {
        // 如果已經登入了 token = true, 則開啟子選單
        console.log(`${this.isLogin}`);
        this.isMemberSubOpen = true;
      } else {
        console.log('memberCenter')
        this.isLoginOpen = true;
      }
    },
  },
  computed: {
    //使用 mapState 輔助函數將/src/stores/user裡的state/data 映射在這裡
    ...mapState(userStore, ['token']),
    isLogin() {
      return !!this.token
    }
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
          <button id="member-login" @click="memberCenter(); closeHam()">
            <!--如果登入了就可以 @click展示子選單, 而不是跳轉開啟燈箱-->
            <div class="sub-menu-container" v-if="isMemberSubOpen">
              <ul>
                <li><RouterLink class="sub-menu" to="/membercenter">會員中心</RouterLink></li>
                <li>
                  <RouterLink class="sub-menu" to="/membercampsiteorders">商品訂單</RouterLink>
                </li>
                <li>
                  <RouterLink class="sub-menu" to="/memberorderhistory">營地訂單</RouterLink>
                </li>
                <button class="logout" @click.stop="logout">登出</button>
              </ul>
            </div>
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
@mixin only-mobile {

}
.sub-menu-container{
  display: none;
  @include tablet{
  display: block;
  position:absolute;
  width:100px;
  background-color:$blue-4;
  color:$white01;
  height:120px;
  top:80px;
  padding:10px 8px;
  border-radius: 20px;
  }

  @include desktop {
  display: block;
  position:absolute;
  width:100px;
  background-color:$blue-4;
  color:$white01;
  height:120px;
  top:80px;
  padding:10px 8px;
  border-radius: 20px;
  }

}
.sub-menu{
  margin:10px 0;
  text-decoration: none;
  color:$white01;
  border-bottom: 1px solid $white01;
  padding:4px;
  line-height: 1.5%;
  @include font-style(16px, 400, 1%, 160%);
}

.logout{
  border-bottom: 1px solid $white01;
  background-color: transparent;
  border: none;
  color:$white01;
  @include font-style(16px, 400, 1%, 160%);
  
}
</style>
