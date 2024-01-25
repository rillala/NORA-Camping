<script>
// 引入函式庫
import axios from 'axios';
// import { mapState, mapActions } from 'pinia';
import { useProductStore } from '@/stores/productStore'; // 導入 Pinia Store
// import productStore from '@/stores/productStore';
import productCard from '@/components/shop/productCard.vue';
import dropDownBtn from '@/components/button/dropDownBtn.vue';

export default {
  components: {
    productCard,
    dropDownBtn,
  },
  data() {
    return {
      count: 10,
      sourceData: [],
      search: '',
      // displayData: [],
      groupOptions: [
        { value: '1', label: '選擇類別' },
        { value: '2', label: 'Nora文青生活' },
        { value: '3', label: 'Nora品牌服飾' },
        { value: '4', label: 'Nora營地用品' },
      ],
      selectedValue1: '', // 預設選擇的值
      priceOptions: [
        { value: '5', label: '選擇排序' },
        { value: '6', label: '價格高到低' },
        { value: '7', label: '價格低到高' },
      ],
      selectedValue2: '', // 預設選擇的值
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
    // ...mapActions(productStore, ['axiosGetData']),

    filterHandle() {
      this.displayData = this.responseData.filter(item => {
        // console.log(item);
        return item.title.includes(this.search);
      });
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
      <div class="drop-down-button">
        <dropDownBtn
          :options="groupOptions"
          v-model="selectedValue1"
          :defaultValue="1"
          >{{ selectedValue }}</dropDownBtn
        >
        <dropDownBtn
          :options="priceOptions"
          v-model="selectedValue2"
          :defaultValue="5"
          >{{ selectedValue }}</dropDownBtn
        >
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
