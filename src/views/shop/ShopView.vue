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
      groupOptions: ['選擇類別', 'Nora文青生活','Nora品牌服飾','Nora營地用品'],
      priceOptions: ['選擇排序','價格高到低','價格低到高'],
    };
  },

  computed: {
    // ...mapState(productStore, ['displayData']),
    displayData() {
      const productStore = useProductStore();
      return productStore.displayData;
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
    async priceHighToLow(){
      const productStore = useProductStore();
      await productStore.sortByPriceHighToLow();
    },
    async priceLowToHigh(){
      const productStore = useProductStore();
      await productStore.sortByPriceLowToHigh();
    },

    filterHandle() {
      this.displayData = this.responseData.filter(item => {
        // console.log(item);
        return item.title.includes(this.search);
      });
    },
    handleSelection(type) {
      // 在這裡觸發相應的事件
      if (type === '選擇類別') {
        console.log('選擇類別')
      } else if (type === 'Nora文青生活') {
        // 處理 color 的事件
        console.log('Nora文青生活');
      }else if (type === '價格高到低'){
        this.priceHighToLow()
      }else if (type === '價格低到高'){
        this.priceLowToHigh()
      }
    },
  },
  watch: {
    // 每当 search 改变时，这个函数就会执行
    search(newSearch, oldsearch) {
      console.log('new:' + newSearch);
      console.log('old:' + oldsearch);
      this.filterHandle();
    },
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
        <input
          type="text"
          v-model.trim="search"
          @input="handleInput"
          class="shop-searchbar"
        />
      </div>
      <div class="shop-select-button">
        <DropDownBtn :options="groupOptions" @change="handleSelection" :default-value="'選擇類別'"></DropDownBtn>
        <DropDownBtn :options="priceOptions" @change="handleSelection" :default-value="'選擇排序'"></DropDownBtn>
      </div>
      


      <div class="shop-all-list">
        <template v-for="product in displayData" :key="product.id">
          <productCard :item="product"></productCard>
          <productCard :item="product"></productCard>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/shopView.scss';
</style>