<script>
// 引入函式庫
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore'; // 導入 Pinia Store


export default {
  data() {
    return {

    }
  },
  methods: {},
  computed: {
    getCartList(){
      const cartStore = useCartStore()
      return cartStore.cartList
    }
    
    // displayData() {//全部商品
    //   const productStore = useProductStore();
    //   return productStore.cartItem;
    // },
  },
  created() {
    // const productStore = useProductStore();
    // productStore.axiosGetData();
  },

};
</script>

<template>
  {{ getCartList.total }}
  <!-- <tr v-for="item in cartList.cart">
    <td>
      <a href=""></a>
    </td>
    <td>
      <img src="" alt="">
    </td>
    <td>
      <p>delicious</p>
    </td>
    <td>
      <select name="" id="">
        <option value="">14</option>
      </select>
    </td>
  </tr> -->
</template>

<style lang="scss" scoped></style>
