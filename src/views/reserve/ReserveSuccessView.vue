<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';

export default {
  components: {
    nextPageBtn,
  },
  data() {
    return {
      reserveId: '',
      reserveTime: '',
      totalPrice: 0,
      payTime: '',
      isPay: true,
    };
  },
  computed: {
    dateToCamp() {
      let startDate = new Date(sessionStorage.getItem('startDate'));
      startDate.setHours(0, 0, 0, 0); // 只計算天數,先歸零
      // 這邊currentTime測試的時候設為2024/1/1
      let currentDate = new Date(2024, 0, 1);
      currentDate.setHours(0, 0, 0, 0);

      return Math.round((startDate - currentDate) / (1000 * 60 * 60 * 24));
    },
  },
  mounted() {
    this.reserveId = sessionStorage.getItem('reserveId');
    let time = new Date(parseInt(this.reserveId));
    this.reserveTime = time.toLocaleString();

    let time2 = new Date();
    this.payTime = time2.toLocaleString();

    this.totalPrice = parseInt(sessionStorage.getItem('totalPrice'));
  },
  methods: {
    formatPrice(price) {
      return '$' + price.toLocaleString('en-US');
    },
    payFailed() {
      this.$router.push('/reservefail');
    },
  },
};
</script>

<template>
  <main>
    <div class="banner bg-blue-1">
      <div class="banner-top">
        <h1 class="blue-4">立即預約</h1>
        <p class="blue-4">開啟你的野良計畫！</p>
        <p class="slogan blue-4">距離你的行程尚有{{ dateToCamp }}天。</p>
      </div>
      <div class="box">
        <img src="@/assets/image/reserve/flag.png" alt="nore-flag" />
      </div>
    </div>
    <div class="reserve dark">
      <h2>謝謝，我們已收到您的訂單。</h2>
      <div class="reserve-list">
        <div class="title h4">訂單資訊</div>

        <div class="info">
          <div class="box p">
            <div class="item">訂單編號</div>
            <div class="value">{{ reserveId }}</div>
          </div>
          <div class="box p">
            <div class="item">訂單成立時間</div>
            <div class="value">{{ reserveTime }}</div>
          </div>
          <div class="box p">
            <div class="item">訂單金額</div>
            <div class="value">{{ formatPrice(totalPrice) }}</div>
          </div>
        </div>
      </div>

      <div class="rent-list">
        <div class="title h4">付款資訊</div>

        <div class="info">
          <div class="box p">
            <div class="item">付款時間</div>
            <div class="value">{{ payTime }}</div>
          </div>
          <div class="box p">
            <div class="item">付款狀態</div>
            <div class="value">{{ isPay ? '已付款' : payFailed() }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--下個步驟的按鈕-->
    <nextPageBtn
      @click="goToNextStep(`/membercampsiteorders`)"
      :text="`回到會員專區`"
      :path="`/membercampsiteorders`"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/reserveConfirm.scss';

.banner {
  width: 100%;
  height: 200px;
  padding: 20px 0;

  @include tablet {
    height: 300px;
  }

  @include desktop {
    height: 400px;
    padding: 120px 0 0;
  }

  h1 {
    text-align: center;
  }

  p.blue-4 {
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

  p.slogan {
    width: 100%;
    @include desktop {
      margin-top: 20px;
    }
  }

  .box {
    position: relative;
    width: 100%;
    margin-top: -20px;
    overflow: hidden;
    pointer-events: none;
    user-select: none;

    @include tablet {
      margin-top: -80px;
    }

    @include desktop {
      margin: -140px auto 0;
      max-width: 1200px;
    }

    img {
      position: relative;
      left: -2%;
      top: 0;
      width: 104%;
    }
  }
}

.banner-top {
  @include desktop {
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
