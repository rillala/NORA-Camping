<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';
import apiInstance from '@/plugins/auth';

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
      dateToCamp: 0,

      equipmentData: {},
      campsiteData: {},
    };
  },
  mounted() {
    let reserveId = sessionStorage.getItem('reserveId');
    let startDate = sessionStorage.getItem('startDate');
    let endDate = sessionStorage.getItem('endDate');

    this.dateDifference(startDate);

    this.reserveId = reserveId;

    let time = new Date(parseInt(this.reserveId));
    this.reserveTime = time.toLocaleString();

    let time2 = new Date();
    this.payTime = time2.toLocaleString();

    this.totalPrice = parseInt(sessionStorage.getItem('totalPrice'));

    // campsite detail
    let storedSiteStr = sessionStorage.getItem('selectedSites');

    this.campsiteData = storedSiteStr.split(',').map(item => {
      let [id, rentNum] = item.split(':');
      return {
        reservation_id: reserveId,
        checkin_date: startDate,
        checkout_date: endDate,
        type_id: id,
        reserve_count: Number(rentNum),
      };
    });

    // equipment rental
    let storedEquipmentStr = sessionStorage.getItem('equipmentList');

    if (storedEquipmentStr) {
      this.equipmentData = storedEquipmentStr
        .split(',')
        .filter(item => item) // 移除空字串
        .map(item => {
          let [id, title, price, rentNum] = item.split(':');
          return {
            reservation_id: reserveId,
            equipment_id: Number(id),
            // title: title,
            rental_price: Number(price),
            quantity: Number(rentNum),
            startDate,
            endDate,
          };
        });
    }
    // 儲存進db
    this.addSiteDetailToDb();
    this.addEquipmentToDb();

    // 確認訂單完成並且儲存進資料庫之後, 刪除 sessionStorage 裡所存資料
    sessionStorage.clear();
  },
  methods: {
    dateDifference(date) {
      let startDate = new Date(date);
      let currentDate = new Date();

      // 計算兩個日期之間的天數差異
      return (this.dateToCamp = Math.round(
        (startDate - currentDate) / (1000 * 60 * 60 * 24),
      ));
    },
    formatPrice(price) {
      return '$' + price.toLocaleString('en-US');
    },
    payFailed() {
      this.$router.push('/reservefail');
    },

    // php 傳送資料
    addEquipmentToDb() {
      console.log(this.equipmentData);
      apiInstance
        .post('addEquipmentRental.php', this.equipmentData)
        .then(response => {
          if (!response.data.error && response.data.msg) {
            console.log(response.data.msg);
          } else {
            console.error('No message received', response.data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    addSiteDetailToDb() {
      console.log(this.campsiteData);
      apiInstance
        .post('addSiteReserveDetail.php', this.campsiteData)
        .then(response => {
          if (!response.data.error && response.data.msg) {
            console.log(response.data.msg);
          } else {
            console.error('No message received', response.data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
      <h2>謝謝，<span>我們已收到您的訂單。</span></h2>
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
    <nextPageBtn :text="`回到會員專區`" :path="`/membercampsiteorders`" />
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/reserveConfirm.scss';

.reserve {
  span {
    white-space: nowrap;
  }
}
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
