<template>
  <div class="lightbox" @click.stop="isOpen = !isOpen">
    <div class="lightbox-container" v-if="isOpen">
      <div class="lightbox-content" v-on:click.stop>
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
        <form v-if="showRegisterForm">
          <input
            type="text"
            placeholder="請輸入信箱"
            v-model="user_add.account"
          /><br />
          <input
            type="password"
            placeholder="請輸入密碼"
            v-model="user_add.pwd"
          /><br/>
          <input
            type="password"
            placeholder="再次輸入密碼"
            v-model="user_add.pwdConfirmation"
          /><br/>

          <div class="login-news">
            <input
              type="checkbox"
              v-model="user_add.receiveNews"
              id="receiveNews"
            />
            <label for="receiveNews">
              <p>我願意接收野良的最新消息、優惠相關訊息</p>
            </label>
          </div>

          <div class="login-news">
            <input
              type="checkbox"
              v-model="user_add.agreeTerms"
              id="agreeTerms"
            />
            <label for="agreeTerms">
              <p>我同意網站服務條款及隱私權政策</p>
            </label>
          </div>

            <button type="submit" class="main-btn" @click="alert()">立即加入</button>
          </form>

        <!-- 登入頁面 -->
        <form v-else>
          <input
            type="text"
            placeholder="請輸入信箱"
            v-model="user_enter.account"
          /><br/>
          <input
            type="password"
            placeholder="請輸入密碼"
            v-model="user_enter.pwd"
          /><br/>
          <a class="forget-psw">忘記密碼？</a><br/>
          <button class="main-btn" @click='signin'>會員登入</button><br/>
          <button class="sub-btn">以Google登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import { mapActions } from 'pinia';
import userStore from '@/stores/user';
export default {
  props: ['isOpen'],

  data() {
    return {
      showRegisterForm: true,
      user_add: {
        account: '',
        pwd: '',
        pwdConfirmation: '',
        receiveNews: false,
        agreeTerms: false,
      },
      user_enter: {
        account: 'mor_2314',
        pwd: '83r5^_'
      }
    };
  },
created(){
  // 判斷有沒有登入過，如果沒有token等同於沒有登入
  const user = this.checkLogin()
  if(user){
    //有登入資訊轉到首頁
    this.$router.push('/')
  }
  },

  methods:{
    closeLightbox() {
      // alert()
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
    ...mapActions(userStore,['updateToken','updateName', 'checkLogin']),
    signin(){
      this.updateToken(123)
      console.log('login');

      axios.post('https://fakestoreapi.com/auth/login', {
        username: "mor_2314",
        password: "83r5^_"
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(response.data && response.data.token){
          //3
          this.updateToken(response.data.token)
          console.log('login')
          console.log(response.data.token)
          this.$router.push('/membercenter')
        }
      })
      .catch(error => {
        console.error(error);  
        //少一行
        //登入失敗
        //系統維護中
      }) 
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

  @include tablet {
  }
  @include desktop {
  }
}

.lightbox-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);

  z-index: 4;

  @include tablet {
  }

  @include desktop {
  }
}

.lightbox-content {
  position: relative;
  top: calc((100% - 430px) / 2);
  left: calc((100% - 450px) / 2);
  background-color: $white01;
  padding: 20px;
  z-index: 5;
  width: 470px;
  height:500px;
  padding: 40px 50px;

  @include tablet {
  }

  @include desktop {
  }
}

.tab-container {
  display: flex;
  justify-content: center;

  @include tablet {
  }

  @include desktop {
  }
}

.tab-add,
.tab-register {
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-size: 32px;
  padding: 0px 10px;
  margin: 10px 15px 30px;

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
  width:100%;
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
  margin: 10px 0px;
  padding-left: 20px;
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

input[type="checkbox"] {
width: 20px;
height:20px;
}

// label[for="receiveNews"] {
//   height: 16px;
// }

.login-news{
  height: 25px;
}
</style>
