<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import setRentalCard from '@/components/reserve/setRentalCard.vue';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';
import { getDBImage } from '@/assets/js/common';
import { transformWithEsbuild } from 'vite';

export default {
  components: {
    progressBar,
    setRentalCard,
    nextPageBtn,
  },
  data() {
    return {
      isNextStepClick: false,
      equipData: [],
      setList: [
        {
          id: 1,
          title: '基本露營兩人套組',
          price: 800,
          info: '雙人用帳篷 x1個,睡袋 x2個,露營墊 x2個,手電筒 x2個,露營椅 x2個,小型營地桌 x1個,小型野餐墊 x1個',
          image: 'setforTwo.png',
          rentNum: 0,
        },
        {
          id: 2,
          title: '基本露營四人套組',
          price: 1200,
          info: '四人用帳篷 x1個,睡袋 x4個,露營墊 x4個,手電筒 x4個,露營椅 x4個,中型營地桌 x1個,中型野餐墊 x1個',
          image: 'setforFour.png',
          rentNum: 0,
        },
        {
          id: 3,
          title: '豪華露營四人套組',
          price: 1700,
          info: '四人用隧道帳篷 x1個,睡袋 x4個,露營墊 x4個,手電筒 x4個,露營椅 x4個,大型營地桌 x1個,烤肉設備 x1組,中型天幕 x1個,中型野餐墊 x1個',
          image: 'setforFourPlus.png',
          rentNum: 0,
        },
      ],
      singleList: [
        {
          id: 4,
          title: '帳篷',
          price: 500,
          info: '適合2-4人使用的防水帳篷，簡易設置。',
          image: '',
          rentNum: 0,
        },
        {
          id: 5,
          title: '睡袋',
          price: 100,
          info: '提供保暖的睡袋，適用於各種氣候條件。',
          image: '',
          rentNum: 0,
        },
        {
          id: 6,
          title: '露營墊',
          price: 50,
          info: '輕便舒適的露營墊，適合放在帳篷內。',
          image: '',
          rentNum: 0,
        },
        {
          id: 7,
          title: '烹飪設備',
          price: 200,
          info: '包括便攜式爐頭、鍋具和基本烹飪工具。',
          image: '',
          rentNum: 0,
        },
        {
          id: 8,
          title: '露營椅',
          price: 80,
          info: '便攜式露營椅，方便在露營地休息或觀賞風景。',
          image: '',
          rentNum: 0,
        },
        {
          id: 9,
          title: '手電筒/頭燈',
          price: 50,
          info: '提供夜間照明所需的手電筒或頭燈。',
          image: '',
          rentNum: 0,
        },
        {
          id: 10,
          title: '野餐墊',
          price: 50,
          info: '適合戶外野餐或休憩的大型野餐墊。',
          image: '',
          rentNum: 0,
        },
        {
          id: 11,
          title: '營地桌',
          price: 100,
          info: '便攜式折疊桌，適合飲食或聚會使用。',
          image: '',
          rentNum: 0,
        },
        {
          id: 12,
          title: 'BBQ烤架',
          price: 300,
          info: '便攜式烤架，適用於戶外燒烤。',
          image: '',
          rentNum: 0,
        },
        {
          id: 13,
          title: '天幕',
          price: 150,
          info: '8-10人用，提供遮陽和雨棚，適合作為露營或活動的臨時遮蔽所。',
          image: '',
          rentNum: 0,
        },
        {
          id: 14,
          title: '焚火爐',
          price: 100,
          info: '30x30cm的焚火台，適合用做小型營火使用，取火或烤棉花糖皆可。',
          image: '',
          rentNum: 0,
        },
        {
          id: 15,
          title: '延長線',
          price: 50,
          info: '5m 防水戶外用延長線。',
          image: '',
          rentNum: 0,
        },
      ],
      rentSum: 0,
    };
  },
  mounted() {
    this.getEquipData();

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
  computed: {
    rentSum() {
      const setListSum = this.setList.reduce((acc, cur) => {
        return (acc += cur.rentNum);
      }, 0);
      const singleListSum = this.singleList.reduce((acc, cur) => {
        return (acc += cur.rentNum);
      }, 0);
      return (this.rentSum = setListSum + singleListSum);
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

    // 連結資料庫相關
    getEquipData() {
      apiInstance
        .get('getEquipment.php')
        .then(response => {
          // console.log(response.data);
          // 給予套組陣列初始值
          let setData = response.data.sets;
          console.log(setData);

          // 給予單項陣列初始值
          let singleData = response.data.singles;
          console.log(singleData);
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
        :image="getImageUrl(setCard.image)"
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
        :image="getImageUrl(`single${singleCard.id}.png`)"
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
