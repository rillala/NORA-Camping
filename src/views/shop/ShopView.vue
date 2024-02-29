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
      currentPage: 1, // 當前頁碼
      itemsPerPage: 24, // 每頁顯示的商品數量
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
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.displayData.length / this.itemsPerPage);
    },
    // 根據當前頁碼計算當前頁面顯示的商品
    paginatedData() {
      let start = (this.currentPage - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.displayData.slice(start, end);
    },
    // 生成分頁按鈕的頁碼
    pages() {
      let pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
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
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
    <div class="shop-all-banner">
      <img class="shop-banner-pic" src="/src/assets/image/shop/商城banner1.png" alt="">
      <h2 class="shop-all-title">NORA品牌專區，打造屬於你的品牌風格</h2>
      <div class="input-group">
        <input type="text" v-model.trim="search" class="shop-searchbar" placeholder="輸入商品關鍵字" />
        <button class="search-shop" @click="handleFilterClick" type="button"><svg width="25px" height="25px"
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M22 22L20 20" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg></button>
      </div>
    </div>
    <div class="shop-all-container">
      <div class="shop-select-button">
        <DropDownBtn :options="groupOptions" @change="handleSelection" :default-value="'選擇類別'"></DropDownBtn>
        <DropDownBtn :options="priceOptions" @change="handleSelection" :default-value="'選擇排序'"></DropDownBtn>
      </div>



      <div class="shop-all-list">
        <template v-for="product in paginatedData" :key="product.id">
          <productCard v-if="product.state === 1" :item="product"></productCard>
        </template>
      </div>
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage <= 1">上一頁</button>
        <!-- 數字分頁按鈕 -->
        <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ 'active': currentPage === page }">
          {{ page }}
        </button>
        <button @click="nextPage" :disabled="currentPage >= totalPages">下一頁</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/shopView.scss';

.pagination-controls button.active {
  color: white;
  background-color: $blue-3;
}
</style>
