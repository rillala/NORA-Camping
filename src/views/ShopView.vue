<script>
// 引入函式庫
import productCard from '@/components/shop/productCard.vue';
import axios from 'axios';

export default {
  components: {
    productCard
  },
  data() {
    return {
      count: 10,
      sourceData: [],
      search: '',
      displayData: [],
    };
  },
  computed: {
    productCount() {
      return Array.isArray(this.displayData) ? this.displayData.length : 0;
    },
    loading() {
      return this.sourceData.length === 0;
    },
    nodata() {
      return this.productCount === 0;
    },
  },
  created() {
    //建立好vue實體=>可以呼叫vue 裡面的東西
    this.axiosGetData();
  },

  methods: {
    //用fetch將json 檔案匯入
    axiosGetData() {
      //使用axios
      axios.get('https://api.escuelajs.co/api/v1/products')
        .then(res => {
          if (res && res.data) {
            console.log(res.data);
            this.responseData = res.data
            this.displayData = res.data
          }
        })
    },
    handleInput() {
      this.displayData = this.sourceData.filter(item => {
        return item.title.includes(this.search);
      });
    },
  },
};
</script>

<template>
  <div class="shop-all-wrap">
    <div class="shop-all-container">
      <div class="shop-all-banner">
        <h2>歡慶Nora商城開幕!!!</h2>
        <input type="text" v-model.trim="search" @input="handleInput" class="shop-searchbar" />
      </div>
      <div class="shop-filter">
        <label for="type"></label>
        <select name="type" id="type">
          <option value="">選擇類別</option>
          <option value="">Nora文青生活</option>
          <option value="">Nora品牌服飾</option>
          <option value="">Nora營地用品</option>
        </select>
        <label for="rank"></label>
        <select name="rank" id="rank">
          <option value="">選擇排序</option>
          <option value="">價格高到低</option>
          <option value="">價格低到高</option>
        </select>
      </div>

      <div class="shop-all-list">
        <template v-for="product in displayData" :key="product.id">
          <productCard :item="product"></productCard>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/sass/page/shopView.scss';
</style>
