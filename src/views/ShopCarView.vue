<script>
// 引入函式庫
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore'; 
import { mapState, mapActions } from 'pinia';


export default {
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(useCartStore, ['removeCartItem', 'setCartQty'])
  },
  computed: {
    ...mapState(useCartStore, ['cartList'])
  },
  created() {
    // const productStore = useProductStore();
    // productStore.axiosGetData();
  },

};
</script>

<template>
  <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
<table v-else>
  <tbody>
    <tr v-for="item in cartList.carts" :key="item.id">
    <td>
      <a href="#" @click.prevent="removeCartItem(item.id)">X</a>
    </td>
    <td>
      <img :src="item.product.images" alt="">
    </td>
    <td>
      <p>{{item.product.title}}</p>
    </td>
    <td>
      <select name="" id="" :value="item.qty" @change="(event) => setCartQty(item.id, event)">
        <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
      </select>
    </td>
    <td>
      $ {{ item.subtatal }}
    </td>
  </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>總金額 NT$ {{cartList.total}}</td>
    </tr>
  </tfoot>
</table>
  
</template>

<style lang="scss" scoped>
  img{
    width: 200px;
  }
</style>
