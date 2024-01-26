<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';

export default {
  components: {
    progressBar,
    nextPageBtn,
  },
  data() {
    return {
      isNextStepClick: false,
      // 從 sessionStorage 裡存取的值:
      startDate: '',
      endDate: '',
      stayDuration: 0,
      hasDiscount: false,
      selectedSites: [],
      chosenZone: '',
      equipmentList: [],
    };
  },
  created() {
    // 營地日期及種類數量:存取 sessionStorage 的值
    this.startDate = sessionStorage.getItem('startDate') || 'error noStartDate';
    this.endDate = sessionStorage.getItem('endDate') || 'error noEndDate';
    this.stayDuration =
      sessionStorage.getItem('stayDuration') || 'error noStayDuration';

    // 這邊要注意 sessionSotrage 裡的直接為"字串類型", 因此 Boolean 需要經過轉換
    let hasDiscountStored = sessionStorage.getItem('hasDiscount');
    this.hasDiscount = hasDiscountStored === 'true';
    this.chosenZone =
      sessionStorage.getItem('chosenZone') == 'cat' ? '貓區' : '狗區';

    // 轉換 siteDataArray->對應的營區名稱和數量
    let storedDataString = sessionStorage.getItem('selectedSites');
    let siteDataArray = [];

    if (storedDataString) {
      siteDataArray = storedDataString.split(',').map(item => {
        let [id, count] = item.split(':').map(Number);

        let area = ''; // 用於儲存轉換後的區域名稱
        let price = 0; // 每種營區種類的價錢
        switch (id) {
          case 1:
          case 4:
            area = '草地區';
            price = 1000;
            break;
          case 2:
          case 5:
            area = '棧板區';
            price = 1200;
            break;
          case 3:
          case 6:
            area = '雨棚區';
            price = 1500;
            break;
        }

        return { id, count, area, price }; // 返回包含轉換後區域名稱的物件
      });
    }
    this.selectedSites = siteDataArray;

    // 讀取 equipmentList

    let storedEquipmentStr = sessionStorage.getItem('equipmentList');
    if (storedEquipmentStr.length > 2) {
      let siteDataArray = storedEquipmentStr
        .split(',')
        .filter(item => item) // 移除空字串
        .map(item => {
          let parts = item.split(':');
          // 確保 parts 長度是 4，避免解構賦值時出錯
          if (parts.length === 4) {
            let [id, title, price, rentNum] = parts;
            return {
              id: Number(id),
              title,
              price: Number(price),
              rentNum: Number(rentNum),
            };
          }
          return null;
        })
        .filter(item => item != null); // 移除無效的項目

      this.equipmentList = siteDataArray;
    } else {
      this.equipmentList = false;
    }
  },
  computed: {
    siteCountSum() {
      return this.selectedSites.reduce((acc, cur) => acc + cur.count, 0);
    },
    sitePriceSum() {
      return this.selectedSites.reduce(
        (acc, cur) => acc + cur.count * cur.price * this.stayDuration,
        0,
      );
    },
    discountPrice() {
      return this.hasDiscount ? 500 : 0;
    },
    siteTotalPrice() {
      return this.sitePriceSum - this.discountPrice * this.siteCountSum;
    },
    equipmentTotalPrice() {
      if (this.equipmentList) {
        return this.equipmentList.reduce(
          (acc, cur) => acc + cur.rentNum * cur.price,
          0,
        );
      }
    },

    totalPrice() {
      if (this.equipmentList) {
        return this.siteTotalPrice + this.equipmentTotalPrice;
      } else {
        return this.siteTotalPrice;
      }
    },
  },
  methods: {
    goToNextStep(nextPath) {
      if (sessionStorage.getItem('isStep3Clicked')) {
        return;
      } else {
        let currentStep = parseInt(
          sessionStorage.getItem('currentStep') || '1',
        );
        currentStep++;
        sessionStorage.setItem('currentStep', currentStep.toString());
        if (nextPath) {
          this.$router.push(nextPath);
        }
        sessionStorage.setItem('isStep3Clicked', 'true');
      }
    },
    formatPrice(price) {
      return '$' + price.toLocaleString('en-US');
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="3" />
    <div class="reserve dark">
      <h2>營地預約訂單</h2>
      <div class="reserve-list">
        <div class="title h4">營位資訊</div>

        <div class="info">
          <div class="box p">
            <div class="item">入營日期</div>
            <div class="value">{{ startDate }}</div>
          </div>
          <div class="box p">
            <div class="item">拔營日期</div>
            <div class="value">{{ endDate }}</div>
          </div>
          <div class="box p">
            <div class="item">露營天數</div>
            <div class="value">{{ stayDuration }}晚</div>
          </div>
          <div class="box p">
            <div class="item">第一天是否為夜衝</div>
            <div class="value">{{ hasDiscount ? '是' : '否' }}</div>
          </div>
          <div class="zone box p">
            <div class="item">營區</div>
            <div class="value">{{ chosenZone }}</div>
          </div>
          <div class="site box p" v-for="site in selectedSites">
            <div class="item">營位</div>
            <div class="value">
              {{ site.area }}｜{{ site.count }}帳｜{{
                formatPrice(site.price * site.count * stayDuration)
              }}
            </div>
          </div>
          <div class="box p">
            <div class="item">營位總數</div>
            <div class="value">{{ siteCountSum }}帳</div>
          </div>
          <div class="box p">
            <div class="item">營位預約小計</div>
            <div class="value">
              {{ formatPrice(sitePriceSum) }}
              <span v-if="hasDiscount">
                - {{ formatPrice(discountPrice) }} x
                {{ siteCountSum }}(夜衝優惠) =
                {{ formatPrice(siteTotalPrice) }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="rent-list" v-if="equipmentList">
        <div class="title h4">租借設備</div>

        <div class="info">
          <div class="box p" v-for="item in equipmentList">
            <div class="item">{{ item.title }}</div>
            <div class="value">
              {{ formatPrice(item.price * item.rentNum) }}｜{{ item.rentNum }}組
            </div>
          </div>
          <div class="box p">
            <div class="item">設備租借小計</div>
            <div class="value">{{ formatPrice(equipmentTotalPrice) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="total-price h2">
      總計 <br class="mobile" />NT{{ formatPrice(totalPrice) }}
    </div>

    <!--下個步驟的按鈕-->
    <nextPageBtn
      @click="goToNextStep(`/reservepayment`)"
      :text="`前往付款`"
      :path="`/reservepayment`"
    />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/reserveConfirm.scss';
</style>
