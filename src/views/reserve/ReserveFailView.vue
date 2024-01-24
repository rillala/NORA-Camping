<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';

export default {
  components: {
    nextPageBtn,
  },
};
</script>

<template>
  <div class="failed">
    <div class="banner bg-dark-gray">
      <div class="banner-top">
        <h1 class="dark">立即預約</h1>
        <p class="dark">開啟你的野良計畫！</p>
      </div>
      <p class="note">很抱歉，您的訂單未能成功處理。</p>
    </div>
    <div class="warning dark">
      <p class="main"><span>非常抱歉，</span><span>您的訂單付款失敗。</span></p>
      <p>請重新預約，並再次嘗試：</p>
      <ul>
        <li class="p">
          確認您輸入的信用卡資訊正確無誤，包括卡號、有效期和安全碼。
        </li>
        <li class="p">確保您的信用卡未達到信用額度或未過期。</li>
        <li class="p">
          檢查您的銀行或信用卡公司是否有任何未解決的問題或限制。
        </li>
        <li class="p">嘗試使用不同的支付方式或另一張信用卡。</li>
      </ul>
      <p class="contact">
        如果問題仍然存在，請聯繫您的銀行或信用卡公司了解更多信息，或者聯繫我們，
        我們非常樂意提供協助。
      </p>
    </div>

    <nextPageBtn :text="`回到確認預定畫面`" :path="`/reserveconfirm`" />
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 200px;
  padding: 20px 0;

  @include tablet {
    height: 250px;
  }

  @include desktop {
    padding: 60px 0 0;
  }

  h1 {
    text-align: center;
  }

  p.dark {
    text-align: center;
    @include font-style(24px, 900, 10%, 120%);

    @include tablet {
      @include font-style(40px, 900, 10%, 120%);
      margin-top: 5px;
    }

    @include desktop {
      margin: 0 0 10px 10px;
    }
  }

  .note {
    margin-top: 40px;
    text-align: center;
    font-weight: 700;
    color: $dark;
  }
}

.banner-top {
  @include desktop {
    max-width: 1200px;
    display: flex;
    align-items: end;
    justify-content: center;
    margin: 0 auto;
  }
}

.warning {
  width: 100%;
  padding: 20px 20px 0;

  @include tablet {
    max-width: 600px;
    margin: 0 auto;
  }
  @include desktop {
    padding: 40px 40px 0 40px;
    max-width: 1200px;
  }

  .main {
    margin: 0 0 10px;
    white-space: wrap;
    @include font-style(24px, 900, 10%, 120%);

    @include tablet {
      margin: 20px 0 10px;
    }
    span {
      white-space: nowrap;
    }
  }

  li {
    margin-left: 20px;
    list-style: disc;
  }

  .contact {
    margin: 10px 0;
    padding: 10px;
    @include tablet {
      margin: 20px 0;
    }
  }
}
</style>
