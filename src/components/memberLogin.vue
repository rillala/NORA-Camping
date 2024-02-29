<template>
  <div class="lightbox">
    <div class="lightbox-container" v-if="isOpen">
      <div
        v-if="showPrivacyPolicy"
        class="privacy-policy-lightbox"
        @click="closePrivacy"
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
            placeholder="請輸入名字"
            v-model="user_add.name"
            autocomplete="name"
          /><br />
          <input
            type="text"
            placeholder="請輸入信箱"
            v-model="user_add.email"
            autocomplete="email"
          /><br />
          <input
            type="password"
            placeholder="請輸入密碼"
            v-model="user_add.psw"
            autocomplete="password"
          /><br />
          <input
            type="password"
            placeholder="再次輸入密碼"
            v-model="user_add.pswConfirmation"
            autocomplete="new-password"
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
          <button type="submit" class="main-btn" @click="register">
            立即加入
          </button>
        </form>

        <!-- 登入頁面 -->
        <form v-else action="javascript:void(0);">
          <input
            type="text"
            placeholder="請輸入信箱"
            v-model="user_enter.email"
            autocomplete="new-password"
          /><br />
          <input
            type="password"
            placeholder="請輸入密碼"
            v-model="user_enter.psw"
            autocomplete="new-password"
          /><br />
          <a class="forget-psw">忘記密碼？</a><br />
          <button class="main-btn" @click="login">會員登入</button><br />
          <button class="sub-btn" @click.prevent="signInWithLine">
            以Line登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import { mapActions } from 'pinia';
import userStore from '@/stores/user';
import apiInstance from '@/plugins/auth';
import { memberRedirect } from '@/assets/js/common';

export default {
  props: { isOpen: Boolean },

  data() {
    return {
      passwordMismatch: false,
      showRegisterForm: true,
      user_add: {
        name: '陳穎穎',
        email: 'sandra401120422@gmail.com',
        psw: '123456',
        pswConfirmation: '123456',
        receiveNews: true,
        agreeTerms: true,
      },
      user_enter: {
        email: 'coconut5529@yahoo.com.tw',
        psw: '123456',
      },
      showPrivacyPolicy: false,
      channel_id: '2003443299',
      redirect_uri: this.memberRedirect(),
      client_secret: '6944f7d50fb550267d1488e66d7f4d90',
    };
  },
  async mounted() {
    // 使用 window.location.search 和 urlParams 獲取當前網頁 URL 中的查詢參數
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      // 使用 get 方法從 urlParams 實例中獲取名為 code 的參數的值。(授權碼，通常由用戶在身份驗證流程中獲得)
      // 如果查詢字串中存在名為 code 的參數，code 變數將被賦值為該參數的值；否則，code 變數將為 null。
      const code = urlParams.get('code');
      await this.lineLoginRedirect(code);
    } else {
      // 判斷有沒有登入過，如果沒有token等同於沒有登入
      // const user = this.login();
      // // console.log(user);
      // if (user) {
      //   //有登入資訊轉到首頁
      //   this.$router.push('/');
      // }
    }
  },
  methods: {
    memberRedirect() {
      return memberRedirect();
    },
    closePrivacy() {
      this.showPrivacyPolicy = false;
    },
    closeLightbox() {
      this.$emit('close');
    },
    ...mapActions(userStore, [
      'updateToken',
      'getMemberInfo',
      'updateUserData',
    ]),
    async getMemberInfo() {
      try {
        const token = localStorage.getItem('token'); // 使用 getItem 方法和 'token' 鍵
        // 確保 token 存在
        if (!token) {
          console.error('Logout error: No token found');
          return;
        }
        // 發送請求到後端，獲取用戶資料
        const response = await apiInstance.get('memberInfo.php', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // 更新 Pinia store 裡的使用者資料
        this.updateUserData(response.data);
      } catch (error) {
        console.error('Error fetching member info:', error);
        // 處理錯誤，可能需要在界面上顯示錯誤資訊
      }
    },

    login() {
      const bodyFormData = new FormData();
      bodyFormData.append('email', this.user_enter.email);
      bodyFormData.append('psw', this.user_enter.psw);
      apiInstance({
        method: 'post',
        url: '/login_JWT.php',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: bodyFormData,
      })
        .then(res => {
          // console.log(res)
          if (res && res.data && res.data.error === false) {
            // 如果後端沒有返回錯誤，則處理登入成功的情況
            alert(res.data.message);
            localStorage.setItem('token', res.data.token);
            this.updateToken(res.data.token);
            this.closeLightbox();
            this.getMemberInfo();
            // 可以在這裡執行登入成功後的操作，比如跳轉到登入頁面或者首頁等
          } else if (res && res.data && res.data.error === true) {
            // 如果後端返回了錯誤，則處理登入失敗的情況
            alert(res.data.message);
          } else {
            // 如果後端返回的數據格式不符合預期，則提醒用戶或開發者檢查問題
            alert('登入失敗：無法解析伺服器響應。');
          }
        })
        .catch(error => {
          console.error('註冊過程中出錯', error);
        });
    },
    register() {
      // 檢查密碼是否一致
      if (!this.user_add.agreeTerms) {
        alert('請勾選隱私權政策');
        return;
      }

      if (this.user_add.psw !== this.user_add.pswConfirmation) {
        alert('密碼和確認密碼不匹配');
        return;
      }

      // 創建 FormData 對象
      const bodyFormData = new FormData();
      bodyFormData.append('name', this.user_add.name);
      bodyFormData.append('email', this.user_add.email);
      bodyFormData.append('psw', this.user_add.psw);

      // 發送請求到後端註冊 API
      apiInstance({
        method: 'post',
        url: '/register.php', // 註冊 API 端點
        headers: { 'Content-Type': 'multipart/form-data' },
        data: bodyFormData,
      })
        .then(res => {
          if (res.data.error) {
            // 如果後端返回錯誤，顯示錯誤訊息
            alert(`註冊失敗: ${res.data.message}`);
          } else {
            // 註冊成功的處理邏輯
            alert(`${res.data.message}`);
            this.closeLightbox(); // 登入成功後，關閉燈箱
            // 可以在這裡執行登入成功後的操作，比如跳轉到登入頁面或者首頁等
          }
        })
        .catch(error => {
          console.error('註冊過程中出錯', error);
        });
    },
    // register() {
    //   // 檢查密碼是否一致
    //   if (!this.user_add.agreeTerms) {
    //     alert('請勾選隱私權政策');
    //     return;
    //   }

    //   if (this.user_add.psw !== this.user_add.pswConfirmation) {
    //     alert('密碼和確認密碼不匹配');
    //     return;
    //   }

    //   // 創建 FormData 對象
    //   const bodyFormData = new FormData();
    //   bodyFormData.append('name', this.user_add.name);
    //   bodyFormData.append('email', this.user_add.email);
    //   bodyFormData.append('psw', this.user_add.psw);

    //   // 發送請求到後端發送驗證郵件 API
    //   apiInstance({
    //     method: 'post',
    //     url: '/sendEmail.php', // 發送驗證郵件 API 端點
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //     data: bodyFormData,
    //   })
    //   .then(res => {
    //     if (res.data.error) {
    //       // 如果後端返回錯誤，顯示錯誤訊息
    //       alert(`發送驗證郵件失敗: ${res.data.message}`);
    //     } else {
    //       // 發送驗證郵件成功的處理邏輯
    //       alert(`${res.data.message}`);
    //       // 在這裡可以做其他處理，例如顯示成功訊息並提示用戶去檢查郵件
    //     }
    //   })
    //   .catch(error => {
    //     console.error('發送驗證郵件過程中出錯', error);
    //   });
    //   },

    signInWithLine() {
      // 根據指定的 client_id、redirect_uri、scope 等參數組合出一個 LINE 登入的連結
      const link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.channel_id}&redirect_uri=${this.redirect_uri}&state=login&scope=openid%20profile`;
      // 將頁面重新導向到該連結
      window.location.href = link;
    },
    async lineLoginRedirect(code) {
      try {
        const tokenResponse = await apiInstance.post(
          'https://api.line.me/oauth2/v2.1/token',
          qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirect_uri,
            client_id: this.channel_id,
            client_secret: this.client_secret,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );
        const accessToken = tokenResponse.data.access_token;
        const idToken = tokenResponse.data.id_token;
        const userInfoResponse = await apiInstance.post(
          'https://api.line.me/oauth2/v2.1/verify',
          qs.stringify({
            id_token: idToken,
            client_id: this.channel_id,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Bearer ' + accessToken,
            },
          },
        );
        const lineUserId = userInfoResponse.data.sub;
        const lineNickname = userInfoResponse.data.name;
        const lineUSerImgURL = userInfoResponse.data.picture;
        const lineAccountTypeID = 1;
        // this.updateToken(accessToken);

        // 這邊寫回資料庫
        const response = await apiInstance.post(`/lineLoginNew.php`, {
          user_id: lineUserId,
          name: lineNickname,
          photo: lineUSerImgURL,
        });
        localStorage.setItem('token', response.data.token);
        this.updateToken(response.data.token);
        // this.updateUserData();
        await this.getMemberInfo();
        this.updateUserData(response.data);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
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

.close-lightbox-button {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
