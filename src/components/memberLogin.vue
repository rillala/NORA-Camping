<template>
  <div class="lightbox" >
    <div class="lightbox-container" v-if="isOpen">
      <div
        v-if="showPrivacyPolicy"
        class="privacy-policy-lightbox"
        @click="closePrivacy()"
        v-on:click.stop
      >
        <div class="privacy-policy-content">
          <p class="privacy-message">
            我們重視您的隱私權。本隱私權政策旨在向您說明我們如何收集、使用、存儲和保護您的個人資訊。請仔細閱讀本政策，以了解我們對您個人資訊的處理方式。
            收集的資訊
            在使用本網站或應用程式時，我們可能會收集並處理以下類型的資訊：
            您提供的個人資訊，例如姓名、電子郵件地址、聯絡方式等；
            使用本網站或應用程式的行為資訊，例如瀏覽歷史、點擊活動、設備資訊等；
            其他在您使用本網站或應用程式時自動收集的技術資訊，例如 IP
            地址、Cookie 等。 使用的方式 我們可能會使用收集的資訊來：
            提供、維護和改進本網站或應用程式的服務；
            與您溝通，例如回應您的查詢、提供客戶支援等；
            進行市場營銷活動，例如向您發送推廣訊息、優惠等；
            遵守法律規定和法律程序。 資訊的分享
            我們不會將您的個人資訊出售、租賃或以其他方式分享給第三方，除非：
            獲得您的同意； 根據法律規定或法院命令；
            為了保護我們的權利、財產或安全，或者保護其他用戶的權利、財產或安全。
            資訊的存儲和保護
            我們將採取合理的技術和組織措施來保護您的個人資訊安全，並避免未經授權的訪問、使用、修改、披露或刪除。儘管我們將盡力保護您的個人資訊，但由於互聯網的本質，我們無法保證絕對的安全性。
            隱私權政策的更新
            我們保留隨時修改本隱私權政策的權利，修改後的政策將在本網站或應用程式上發布。我們建議您定期查看本政策，以了解任何修改。繼續使用本網站或應用程式將視為您接受修改後的隱私權政策。
          </p>
        </div>
        <div class="close-button">X</div>
      </div>
      <div class="lightbox-content" v-on:click.stop>
        <div class="close-lightbox-button" @click="closeLightbox">X</div>
        <!-- 切換表單的按鈕 -->
        <div class="tab-container">
          <button
            class="tab-add"
            @click="showRegisterForm = true"
            :class="{ active: showRegisterForm }"
          >
            註冊會員
          </button>
          <button
            class="tab-register"
            @click="showRegisterForm = false"
            :class="{ active: !showRegisterForm }"
          >
            會員登入
          </button>
        </div>

        <!-- 註冊頁面 -->
        <form v-if="showRegisterForm" action="javascript:void(0);">
          <input
            type="text"
            placeholder="請輸入信箱"
            v-model="user_add.account"
          /><br />
          <input
            type="password"
            placeholder="請輸入密碼"
            v-model="user_add.pwd"
          /><br />
          <input
            type="password"
            placeholder="再次輸入密碼"
            v-model="user_add.pwdConfirmation"
          /><br />
          <p v-if="passwordMismatch" class="password-ismatch">密碼不一致</p>

          <div class="login-news">
            <input
              type="checkbox"
              v-model="user_add.receiveNews"
              id="receiveNews"
              :checked="true"
            />
            <div class="box">
              <p class="msg">我願意接收野良的最新消息、優惠相關訊息</p>
            </div>
          </div>

          <div class="login-news">
            <input
              type="checkbox"
              v-model="user_add.agreeTerms"
              id="agreeTerms"
              :checked="true"
            />
            <div class="box">
              <p class="msg">我同意本網站服務條款及</p>
              <button @click="showPrivacyPolicy = true" class="privacy-policy">
                隱私權政策
              </button>
            </div>
          </div>
          <button type="submit" class="main-btn" @click="register" :disabled="!user_add.agreeTerms">
            立即加入
          </button>
        </form>

        <!-- 登入頁面 -->
        <form v-else action="javascript:void(0);">
          <input
            type="text"
            placeholder="請輸入信箱"
            v-model="user_enter.account"
          /><br />
          <input
            type="password"
            placeholder="請輸入密碼"
            v-model="user_enter.pwd"
          /><br />
          <a class="forget-psw">忘記密碼？</a><br />
          <button class="main-btn" @click="signin">會員登入</button><br/>
          <button class="sub-btn">以Google登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import { mapActions } from 'pinia';
import userStore from '@/stores/user';
export default {
  props: { isOpen: Boolean },

  data() {
    return {
      passwordMismatch: false,
      showRegisterForm: true,
      user_add: {
        account: 'mor_2314',
        pwd: '83r5^_',
        pwdConfirmation: '',
        receiveNews: true,
        agreeTerms: true,
      },
      user_enter: {
        account: 'mor_2314',
        pwd: '83r5^_',
      },
      showPrivacyPolicy: false,
    };
  },
  created() {
    // 判斷有沒有登入過，如果沒有token等同於沒有登入
    const user = this.checkLogin();
    if (user) {
      //有登入資訊轉到首頁
      this.$router.push('/');
    }
  },
  watch: {
    isOpen(newVal) {
      console.log(`isOpen changed to ${newVal}`);
    },
    // 'user_add.pwd'(newPassword) {
    //   this.passwordMismatch = newPassword !== this.user_add.pwdConfirmation;
    // },
    // 'user_add.pwdConfirmation'(newConfirmation) {
    //   this.passwordMismatch = newConfirmation !== this.user_add.pwd;
    // },
  },

  methods: {
    closePrivacy() {
      this.showPrivacyPolicy = false;
    },
    closeLightbox() {
      console.log('closeLightbox')
      this.$emit('close')
      // alert()
      // if (this.isOpen) {
      //   this.isOpen = false;
      // }
    },
    ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin']),
    signin() {
      this.updateToken(123);
      console.log('login');
      //關閉燈箱
      // this.isOpen = false;

      axios
        .post('https://fakestoreapi.com/auth/login', {
          username: this.user_enter.account,
          password: this.user_enter.pwd,
        })
        .then(response => {
          if (response.data && response.data.token) {
            this.updateToken(response.data.token); // 更新 token
            console.log('login success', response.data.token);
            this.closeLightbox(); // 登入成功後，關閉燈箱
            // this.$router.push('/membercenter'); // 跳轉到會員中心頁面
          }
        })
        .catch(error => {
          console.error(error);

          if (error.response && error.response.status === 401) {
            alert('帳號密碼有誤請再確認.');
          } else {
            alert(
              'An error occurred while logging in. Please try again later.',
            );
          }
          // 調用pinia的updateToken
          // 將/src/stores/user裡的token清除
          this.updateToken('');
        });
    },

    ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin']),
      register() {
        if (this.user_add.pwd !== this.user_add.pwdConfirmation) {
        alert('密碼不一致');
        return; // 中止註冊流程
  }
        // 問題 檢查用戶是否勾選了同意隱私權政策
        if (!this.user_add.agreeTerms) {
        alert('請勾選隱私權政策'); 
        console('請勾選隱私權政策'); 
        }
        // 在此處呼叫註冊 API 端點
        axios
          .post('https://fakestoreapi.com/auth/login', {
            username: this.user_add.account,
            password: this.user_add.pwd,
          })
          .then(response => {
            if (response.data && response.data.token) {
              this.updateToken(response.data.token); // 更新 token
              console.log('register success', response.data.token);
              this.closeLightbox(); 
              alert('註冊成功。');// 註冊成功後，關閉燈箱
              // 可添加其他註冊成功後的處理邏輯，例如跳轉到會員中心頁面
            }
          })
          .catch(error => {
            console.error(error);
            // 處理註冊失敗的回應
            alert('註冊失敗，請稍後再試。');
          });
      }
  },
};
</script>

<style lang="scss" scoped>
.lightbox {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.lightbox-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);

  z-index: 4;
}

.lightbox-content {
  position: relative;
  top: calc((100% - 500px) / 2);
  background-color: $white01;
  z-index: 5;
  margin: auto;
  width: 350px;
  height: 500px;
  padding: 40px 30px;

  @include tablet {
    width: 470px;
  }

  @include desktop {
    width: 470px;
  }
}

.tab-container {
  display: flex;
  justify-content: center;
}

.tab-add,
.tab-register {
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 32px;
  padding: 0px 10px;
  margin: 10px 15px 30px;
  white-space: nowrap;

  @include tablet {
  }

  @include desktop {
  }
}
.tab-add.active,
.tab-register.active {
  border-bottom: 2px solid$blue-3;
}

p {
  font-size: 16px;
}

input {
  width: 100%;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  background-color: transparent;
  border-left: 0px;
  border-right: 0px;
  line-height: 30px;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.login-news {
  display: flex;
  white-space: no-wrap;
  input {
    margin-top: 5px;
  }

  .box {
    display: flex;
    align-items: start;
    p {
      padding-left: 10px;
      text-align-last: left;
    }
    button {
      margin-top: 3px;
    }
  }
}

.main-btn {
  background-color: $blue-3;
  color: #fff;
  font-size: 24px;
  border-radius: 50px;
  border: none;
  padding: 10px 25px;
  margin-top: 10px;
  text-decoration: none;
}

.sub-btn {
  background-color: $blue-2;
  color: #000;
  font-size: 24px;
  border-radius: 50px;
  border: none;
  padding: 10px 25px;
  margin-top: 20px;
}

.forget-psw {
  display: block;
  text-align: end;
  margin: 20px 0 0 auto;
  font-size: 16px;
}

input[type='checkbox'] {
  width: 15px;
  height: 15px;
}

.privacy-policy-lightbox {
  position: fixed;
  top: calc((100% - 500px) / 2);
  left: 0;
  z-index: 6;
  width: 350px;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto;
  background-color: $white01;

  @include tablet {
    left: calc((100% - 470px) / 2);
    width: 470px;
    padding: 40px;
  }
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 16px;
}

.privacy-policy {
  display: inline-block;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  color: $blue-3;
  word-wrap: break-word;
}

.privacy-policy-content {
  background-color: $light-gray;
}

.privacy-message {
  text-align: left;
}

.close-lightbox-button{
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
