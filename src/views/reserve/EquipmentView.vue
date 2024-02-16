<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import setRentalCard from '@/components/reserve/setRentalCard.vue';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';
import apiInstance from '@/plugins/auth';
import { getDBImage } from '@/assets/js/common';

export default {
  components: {
    progressBar,
    setRentalCard,
    nextPageBtn,
  },
  data() {
    return {
      isNextStepClick: false,
      setList: [],

      singleList: [],
    };
  },
  mounted() {
    this.getEquipData();
  },
  computed: {
    rentSum() {
      const setListSum = this.setList.reduce((acc, cur) => {
        return (acc += cur.rentNum);
      }, 0);
      const singleListSum = this.singleList.reduce((acc, cur) => {
        return (acc += cur.rentNum);
      }, 0);
      return setListSum + singleListSum;
    },
  },
  methods: {
    // 頁面基本函式
    getImageUrl(paths) {
      return new URL(
        `../../assets/image/reserve/equipment/${paths}`,
        import.meta.url,
      ).href;
    },
    getDBImage(paths) {
      return getDBImage(paths);
    },

    // 前往下一步驟:
    goToNextStep(nextPath) {
      if (sessionStorage.getItem('isStep2Clicked')) {
        // 更新選擇的裝備及數量
        this.updateEquipmentRent();
        return;
      } else {
        // 更新選擇的裝備及數量
        sessionStorage.setItem('isStep2Clicked', 'true');
        this.updateEquipmentRent();
        let currentStep = parseInt(
          sessionStorage.getItem('currentStep') || '1',
        );
        currentStep++;
        sessionStorage.setItem('currentStep', currentStep.toString());
        if (nextPath) {
          this.$router.push(nextPath);
        }
      }
    },
    updateEquipmentRent() {
      // 更新或建立 equipmentList
      if (this.rentNum !== 0) {
        let updatedSiteChoseString =
          this.setList
            .filter(item => item.rentNum !== 0)
            .map(
              item =>
                item.id +
                ':' +
                item.title +
                ':' +
                item.price +
                ':' +
                item.rentNum,
            )
            .join(',') +
          ',' +
          this.singleList
            .filter(item => item.rentNum !== 0)
            .map(
              item =>
                item.id +
                ':' +
                item.title +
                ':' +
                item.price +
                ':' +
                item.rentNum,
            )
            .join(',');

        sessionStorage.setItem('equipmentList', updatedSiteChoseString);
      } else {
        sessionStorage.setItem('equipmentList', false);
      }
    },

    // 更新設備選取的數量
    addRentNum(listName, index) {
      // 根據輸入的index值, 修改相對應的rentNum
      this[listName][index].rentNum++;
    },
    minusRentNum(listName, index) {
      // 根據輸入的index值, 修改相對應的rentNum
      if (this[listName][index].rentNum > 0) {
        this[listName][index].rentNum--;
      }
    },
    getRentNum() {
      let storedEquipmentStr = sessionStorage.getItem('equipmentList');

      if (storedEquipmentStr) {
        let equipmentDataArray = storedEquipmentStr
          .split(',')
          .filter(item => item) // 移除空字串
          .map(item => {
            let [id, title, price, rentNum] = item.split(':');
            return {
              id: Number(id),
              title: title,
              price: Number(price),
              rentNum: Number(rentNum),
            };
          });

        // 遍歷解析後的陣列，根據 id 分配到 setList 或 singleList
        equipmentDataArray.forEach(item => {
          let matchedItem =
            this.setList.find(setItem => setItem.id === item.id) ||
            this.singleList.find(singleItem => singleItem.id === item.id);
          if (matchedItem) {
            matchedItem.rentNum = item.rentNum;
          }
        });
      }
    },

    // 連結資料庫相關
    getEquipData() {
      apiInstance
        .get('getEquipment.php')
        .then(response => {
          // console.log(response.data);
          // 給予套組陣列初始值
          let setData = response.data.sets;
          this.setList = setData.map(each => {
            return {
              ...each,
              rentNum: 0,
            };
          });

          // 給予單項陣列初始值
          let singleData = response.data.singles;
          this.singleList = singleData.map(each => {
            return {
              ...each,
              rentNum: 0,
            };
          });

          // 恢復 rentNum 值
          this.getRentNum();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="2" id="progressbar" />
    <div class="intro-container">
      <h4 class="title dark">裝備租借</h4>
      <ul class="intro">
        <li>
          <p class="dark">裝備在租借前會進行檢查和清潔。</p>
        </li>
        <li>
          <p class="dark">
            租借時需於現場支付押金，歸還裝備時若無損壞將全數退還。
          </p>
        </li>
        <li>
          <p class="dark">租借天數為露營總天數。</p>
        </li>
      </ul>
    </div>
    <!--套裝區域-->
    <div class="set">
      <img :src="getImageUrl('chair.svg')" alt="set-section" />
      <h4>套裝租借</h4>
      <span class="tinyp">需要的東西，我們都幫你準備好了！</span>
      <div class="line"></div>
    </div>
    <!--套裝設備卡片-->
    <div id="set-list">
      <setRentalCard
        class="card"
        v-for="(setCard, index) in setList"
        :key="setCard.title"
        :image="getDBImage(setCard.image)"
        :title="setCard.title"
        :price="setCard.price"
        :details="setCard.info"
        :quantity="setCard.rentNum"
        @add-rentNum="addRentNum('setList', index)"
        @minus-rentNum="minusRentNum('setList', index)"
      />
    </div>

    <!--單項區域-->
    <div class="set">
      <img :src="getImageUrl('fire.svg')" alt="single-section" />
      <h4>單項租借</h4>
      <span class="tinyp">還需要甚麼嗎？我們也都有哦！</span>
      <div class="line"></div>
    </div>

    <!--單項設備卡片-->
    <div id="single-list">
      <setRentalCard
        class="card"
        v-for="(singleCard, index) in singleList"
        :key="singleCard.title"
        :image="getDBImage(singleCard.image)"
        :title="singleCard.title"
        :price="singleCard.price"
        :details="singleCard.info"
        :quantity="singleCard.rentNum"
        @add-rentNum="addRentNum('singleList', index)"
        @minus-rentNum="minusRentNum('singleList', index)"
      />
    </div>

    <div class="alert red01 tinyp" v-if="rentSum == 0">
      -您目前沒有租借任何設備-
    </div>

    <!--下個步驟的按鈕-->
    <nextPageBtn
      @click="goToNextStep(`/reserveconfirm`)"
      :text="`前往結帳`"
      :path="`/reserveconfirm`"
    />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/equipment.scss';

#single-list > div {
  @include tablet {
    margin: 10px 0;
  }
}
</style>
