<template>
  <main class="shop-item-wrap">
    <div class="shop-item-container">
      <div v-if="nodata">nodata</div>
      <div v-else class="shop-item-content">
        <h2>{{ responseData.title }}</h2>
        <h3>NT${{ responseData.price }}</h3>
        <div>
          <img :src="responseData.images" alt="responseData.title" />
        </div>
        <p>{{ responseData.description }}</p>

        <DropDownBtn></DropDownBtn>
        <addMinusBtn></addMinusBtn>
        <ActionBtn :content="'加入購物車'"></ActionBtn>
        <ActionBtn :content="'直接購買'"></ActionBtn>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { useProductStore } from '@/stores/productStore'; // 用命名辦法 導入 Pinia Store
import addMinusBtn from '@/components/button/addMinusBtn.vue';
import ActionBtn from '@/components/button/actionBtn.vue';
import DropDownBtn from '@/components/button/dropDownBtn.vue';
export default {
  components: {
    addMinusBtn,
    ActionBtn,
    DropDownBtn,
  },

  data() {
    return {
      //   responseData: {}, 這邊已經在 pinia 中定義了, 在下方的 computed 裡調用
    };
  },
  created() {
    // this.axiosGetDataId();
    const productStore = useProductStore();
    const pageId = this.$route.params.id; // 需要使用到 route 的部分, 要回到 .vue這裡定義
    productStore.axiosGetDataId(pageId); // 作為參數丟進去 pinia
  },
  computed: {
    // 使用 store 中的狀態
    responseData() {
      const productStore = useProductStore();
      return productStore.responseData;
    },
    nodata() {
      return Object.keys(this.responseData).length === 0;
    },
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.shop-item-wrap {
  width: 100%;
  height: 100%;
  background-color: $blue-1;

  .shop-item-container {
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 20px;

    .shop-item-content {
      display: flex;
      flex-flow: column;
      align-items: center;
      gap: 20px;
    }
  }
}

img {
  width: 100px;
}
</style>
