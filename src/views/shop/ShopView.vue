<script>
// 引入函式庫
import axios from 'axios';
// import { mapState, mapActions } from 'pinia';
import { useProductStore } from '@/stores/productStore'; // 導入 Pinia Store
// import productStore from '@/stores/productStore';
import productCard from '@/components/shop/productCard.vue';
import DropDownBtn from '@/components/button/dropDownBtn.vue';


export default {
  components: {
    productCard,
    DropDownBtn
  },
  data() {
    return {
      count: 10,
      sourceData: [],
      search: '',
      groupOptions: ['選擇類別', 'NORA文青生活', 'NORA品牌服飾', 'NORA營地用品'],
      priceOptions: ['選擇排序', '價格高到低', '價格低到高'],
    };
  },

  computed: {
    // ...mapState(productStore, ['displayData']),
    displayData() {
      const productStore = useProductStore();
      return productStore.displayData;
    },
    responseData() {
      const productStore = useProductStore();
      return productStore.responseData;
    },

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
    // this.axiosGetData();
    const productStore = useProductStore();
    productStore.axiosGetData(); // 在 created 鉤子中調用 Pinia Store 中的方法
  },

  methods: {
    async priceHighToLow() {
      const productStore = useProductStore();
      await productStore.sortByPriceHighToLow();
    },
    async priceLowToHigh() {
      const productStore = useProductStore();
      await productStore.sortByPriceLowToHigh();
    },
    async filterHandle() {
      const productStore = useProductStore();
      productStore.filterProducts(this.search);
    },
    async handleFilterClick() {
      await this.filterHandle(this.search); // 將 input 欄位中的資料作為參數傳遞給 filterHandle 函數
    },
    handleSelection(type) {
      const productStore = useProductStore();
      if (type === '選擇類別') {
        productStore.filterByCategory(type);
      } else if (type === 'NORA文青生活' || type === 'NORA品牌服飾' || type === 'NORA營地用品') {
        productStore.filterByCategory(type);
      } else if (type === '價格高到低') {
        this.priceHighToLow();
      } else if (type === '價格低到高') {
        this.priceLowToHigh();
      }
    },

  },
  watch: {
    category: {
      handler(newcCategory) {
        console.log(newcCategory);
      },
      // 在组件实例创建时，强制立即执行回调，預設false
      immediate: true,
    },
  },
};
</script>

<template>
  <div class="shop-all-wrap">
    <div class="shop-all-container">
      <div class="shop-all-banner">
        <h2>歡慶Nora商城開幕🎪</h2>
        <div class="input-group">
          <input type="text" v-model.trim="search" class="shop-searchbar" placeholder="輸入商品關鍵字" />
          <button @click="handleFilterClick" type="button">確認</button>
        </div>
      </div>
      <div class="shop-select-button">
        <DropDownBtn :options="groupOptions" @change="handleSelection" :default-value="'選擇類別'"></DropDownBtn>
        <DropDownBtn :options="priceOptions" @change="handleSelection" :default-value="'選擇排序'"></DropDownBtn>
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
