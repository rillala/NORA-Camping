<template>
  <main class="shop-item-wrap">
    <div class="shop-item-container">
      <loading v-if="nodata"></loading>
      <div v-else class="shop-item-content">
        <h2>{{ responseData.title }}</h2>
        <h3>NT${{ responseData.price }}</h3>
        <div>
          <img :src="responseData.images" alt="responseData.title" />
        </div>
        <p>{{ responseData.description }}</p>
        <p>{{ responseData.id }}</p>

        <addMinusBtn @update:quantity="handleQuantityUpdate"></addMinusBtn>
        <ActionBtn @click.prevent="addIntoCart(responseData.id)" :content="'加入購物車'"></ActionBtn>
        <ActionBtn :content="'直接購買'"></ActionBtn>

        <h2>購物車</h2>
        <div v-if="cartItem">
          <h4>已選擇商品：</h4>
          <img :src="cartItem.images" alt="">
          <p>{{ cartItem.title }} - NT${{ cartItem.price }} x<addMinusBtn @update:quantity="handleQuantityUpdate">
            </addMinusBtn>
          </p>
          <p>{{ `總計${cartItem.price * selectedQuantity}` }}</p>


        </div>

      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { useProductStore } from '@/stores/productStore'; // 用命名辦法 導入 Pinia Store
import { useCartStore } from '@/stores/cartStore';
import addMinusBtn from '@/components/button/addMinusBtn-shop.vue';
import ActionBtn from '@/components/button/actionBtn.vue';
import loading from '@/components/loading.vue';

export default {
  components: {
    addMinusBtn,
    ActionBtn,
    loading,
  },


  data() {
    return {
      selectedQuantity: 0,
      cartItem: null, // 新增 cartItem 屬性用於顯示選擇的商品資訊
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
  methods: {
    handleQuantityUpdate(quantity) {
      // 接收數量更新事件
      this.selectedQuantity = quantity;
      // console.log('changed quantity: ' + this.selectedQuantity);
    },
    async addIntoCart() {
      const cartStore = useCartStore();
      await cartStore.addToCart(this.responseData.id, this.selectedQuantity);
    }
    // addToCart(product) {
    //   const productStore = useProductStore();

    //   // 將商品資料包裝成物件
    //   const cartItem = {
    //     id: product.id,
    //     images: product.images,
    //     title: product.title,
    //     price: product.price,
    //     quantity: this.selectedQuantity,
    //   };
    //   // 將 cartItem 資訊存儲到 data 中
    //   this.cartItem = cartItem;
    //   console.log(cartItem);
    // },
  },
}



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
