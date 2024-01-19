<template>
  <div class="lightbox" @click.stop="isOpen=!isOpen" >
    <div class="lightbox-container" v-if="isOpen" >
      <div class="lightbox-content" v-on:click.stop>
        <!-- 切換表單的按鈕 -->
        <div class="tab-container" >
          <button class="tab-add" @click="showRegisterForm = true" :class="{ active: showRegisterForm }">註冊會員</button>
          <button class="tab-register" @click="showRegisterForm = false" :class="{ active: !showRegisterForm }">會員登入</button>
        </div>

        <!-- 註冊頁面 -->
        <form v-if="showRegisterForm">
            <input type="text" placeholder="請輸入信箱" v-model="user_add.account"><br>
            <input type="password" placeholder="請輸入密碼" v-model="user_add.pwd"><br>
            <input type="password" placeholder="再次輸入密碼" v-model="user_add.pwdConfirmation"><br>

            <div class="login-news">
              <input type="checkbox" v-model="user_add.receiveNews" id="receiveNews">
              <label for="receiveNews">
                <p>我願意接收野良的最新消息、優惠相關訊息</p>
              </label>
            </div>

            <div class="login-news">
              <input type="checkbox" v-model="user_add.agreeTerms" id="agreeTerms">
              <label for="agreeTerms">
                <p>我同意網站服務條款及隱私權政策</p>
              </label>
            </div>

            <button type="submit" class="main-btn">立即加入</button>
          </form>

        <!-- 登入頁面 -->
        <div v-else>
          <input type="text" placeholder="請輸入信箱" v-model="user_enter.account"><br>
          <input type="password" placeholder="請輸入密碼" v-model="user_enter.pwd"><br>
          <a class="forget-psw">忘記密碼？</a><br>
          <!-- <router-link to="/" class="main-btn">會員登入</router-link><br> -->
          <button class="main-btn">會員登入</button>
          <button class="sub-btn">以Google登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['isOpen'],

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
    closeLightbox() {
      // alert()
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }
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
  z-index:3;

  @include tablet{

  }
  @include desktop{

  }
}

.lightbox-container{
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:  rgba(0, 0, 0, 0.7); 

  z-index: 4;

  @include tablet{

  }

  @include desktop{
  
  }
}

.lightbox-content {
  position:relative;
  top: calc((100% - 430px)/2);
  left: calc((100% - 450px)/2);
  background-color:$white01;
  padding: 20px;
  height: 430px;
  width: 450px;
  z-index: 5; 

  @include tablet{

  }

  @include desktop{

  }
}

.tab-container{
  display: flex;
  justify-content: center; 

  @include tablet{

  }

  @include desktop{

  }
}

.tab-add,
.tab-register {
  background-color: transparent; 
  border: none; 
  text-decoration: none;
  font-size: 32px;
  padding: 0px 20px;
  margin: 10px 15px;

  @include tablet{

  }

  @include desktop{

  }

}
.tab-add.active, .tab-register.active {
  border-bottom: 2px solid$blue-3
}

p{
  font-size: 16px;
}

input {
  padding: 10px 90px 10px 0px;
  font-size: 20px;
  border: none; 
  border-bottom: 1px solid #000; 
  outline: none;
  background-color: transparent; 
}

.login-news{
  display: flex;
  margin: 10px 0px;
  padding-left:20px
}

.main-btn{
background-color:$blue-3;
color: #fff;
font-size: 24px;
border-radius: 50px;
border: none; 
padding: 10px 25px;
margin-top:10px;
text-decoration:none;

}

.sub-btn{
background-color:$blue-2;
color:#000;
font-size: 24px;
border-radius: 50px;
border: none; 
padding: 10px 25px;
margin-top:20px;
}

.forget-psw{
  display: inline-block;
  text-align: end;
  margin-top: 20px;
  font-size: 16px;
}
</style>
