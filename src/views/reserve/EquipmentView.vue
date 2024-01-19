<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';

export default {
  components: {
    progressBar,
  },
  data() {
    return {
      isNextStepClick: false,
      search: '',
      productData: [],
      displayData: [],
    };
  },
  created() {
    // this.fetchData()
    this.axiosGetData();
  },
  // 串API假裝一下設備卡片
  methods: {
    goToNextStep(nextPath) {
      if (sessionStorage.getItem('isStep2Clicked')) {
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
        sessionStorage.setItem('isStep2Clicked', 'true');
      }
    },
    axiosGetData() {
      // 使用 axios 抓取商品資料.json
      axios.get('https://fakestoreapi.com/products').then(res => {
        if (res && res.data) {
          this.productData = res.data;
          this.displayData = res.data;
        }
      });
    },
    filterHandle() {
      this.displayData = this.productData.filter(item => {
        // console.log(item);
        return item.title.includes(this.search);
      });
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="2" />
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
  </section>

  <!--以下都是測試用, 不是正式code-->
  <button @click="goToNextStep">要按過這個才可以進入下一步驟:3確認畫面</button>

  <!--下面抓API測試-->
  <input type="text" v-model="search" @input="filterHandle" />
  <div class="card-list">
    <div v-for="card in displayData" class="card">
      <div class="title">{{ card.title }}</div>
      <img :src="card.image" :alt="card.title" width="150px" />
      <p class="price">{{ card.price }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/equipment.scss';

.card-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
