<template>
  <div>
    <!-- 切換表單的按鈕 -->
    <div>
      <button @click="showRegisterForm = true" :class="{ active: showRegisterForm }">註冊</button>
      <button @click="showRegisterForm = false" :class="{ active: !showRegisterForm }">登入</button>
    </div>

    <!-- 註冊頁面 -->
    <div v-if="showRegisterForm" @click="closeLightbox" class="lightbox">
      <div class="lightbox-content">
        <input type="text" placeholder="請輸入信箱" v-model="user_add.account">  
        <input type="password" placeholder="請輸入密碼" v-model="user_add.pwd">  
        <input type="password" placeholder="再次輸入密碼" v-model="user_add.pwdConfirmation">

        <div class="login_news">
          <input type="checkbox" v-model="user_add.receiveNews" id="receiveNews">
          <label for="receiveNews">
            <p>我願意接收野良的最新消息、優惠相關訊息</p>
          </label>
        </div>

        <div class="login_news">
          <input type="checkbox" v-model="user_add.agreeTerms" id="agreeTerms">
          <label for="agreeTerms">
            <p>我同意網站服務條款及隱私權政策</p>
          </label>
        </div>

        <button type="submit" @click="joinAjax">立即加入</button>
      </div>
    </div>

    <!-- 登入頁面 -->
    <div v-else>
      <input type="text" placeholder="請輸入信箱" v-model="user_enter.account">
      <button type="submit" @click="loginAjax">會員登入</button>
      <a @click="forgetPsw">忘記密碼？</a>

      <button @click="loginWithGoogle">以Google登入</button>
      <button @click="loginWithFacebook">以Facebook登入</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRegisterForm: true,
      user_add: {
        account: '',
        pwd: '',
        pwdConfirmation: '',
        receiveNews: false,
        agreeTerms: false
      },
      user_enter: {
        account: '',
        pwd: ''
      }
    };
  },
  methods: {
    joinAjax() {
      // 處理註冊表單的提交
      this.closeLightbox();
    },
    loginAjax() {
      // 處理登入表單的提交
      this.closeLightbox();
    },
    forgetPsw() {
      // 處理忘記密碼的操作
      this.closeLightbox();
    },
    loginWithGoogle() {
      // 處理以Google登入的操作
      this.closeLightbox();
    },
    loginWithFacebook() {
      // 處理以Facebook登入的操作
      this.closeLightbox();
    },
    closeLightbox() {
      // 關閉燈箱
      this.showRegisterForm = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/sass/style.scss";

/* 這裡可以添加樣式，視情況而定 */

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-content {
  background: #fff;
  padding: 20px;
  cursor: auto;
}
</style>
