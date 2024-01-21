<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import setRentalCard from '@/components/reserve/setRentalCard.vue';

export default {
  components: {
    progressBar,
    setRentalCard,
  },
  data() {
    return {
      isNextStepClick: false,
      search: '',
      productData: [],
      displayData: [],
      products: [
        // 假設每個商品物件都有 id 和 quantity
        { id: 1, title: 'id1', buyNum: 0 /* 其他商品資訊 */ },
        { id: 2, title: 'id2', buyNum: 0 /* 其他商品資訊 */ },
        // ... 更多商品
      ],
    };
  },
  created() {
    // this.fetchData()
    // this.axiosGetData();
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
    getImageUrl(paths) {
      return new URL(`../assets/image/${paths}`, import.meta.url).href;
    },
    // axiosGetData() {
    //   // 使用 axios 抓取商品資料.json
    //   axios.get('https://fakestoreapi.com/products').then(res => {
    //     if (res && res.data) {
    //       this.productData = res.data;
    //       this.displayData = res.data;
    //     }
    //   });
    // },
    // filterHandle() {
    //   this.displayData = this.productData.filter(item => {
    //     // console.log(item);
    //     return item.title.includes(this.search);
    //   });
    // },
    updateQuantity(productId, newQuantity) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.buyNum = newQuantity;
        console.log(`${product.id} :: ${product.buyNum}`);
      }
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

    <!--商品卡片測試-->
    <div v-for="product in products" :key="product.id" class="set-list">
      <setRentalCard
        :product="product"
        @update-quantity="updateQuantity(product.id, $event)"
        class="set-card"
      />
    </div>

    <!--下個步驟的按鈕-->
    <RouterLink to="/reserveconfirm" @click="goToNextStep"
      >要按過這個才可以進入下一步驟:3確認畫面</RouterLink
    >
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/equipment.scss';

.card-list {
  display: flex;
  flex-wrap: wrap;
}

.set-list {
  width: 100%;
  padding: 20px;
}
.set-card + .set-card {
  padding-top: 20px;
}
</style>
