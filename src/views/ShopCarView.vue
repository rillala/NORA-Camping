<script>
// 引入函式庫
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
import bannerStepShop from '@/components/shop/bannerStep-shop.vue';


export default {
  data() {
    return {};
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
  components: { bannerStepShop }
};
</script>

<template>
  <bannerStepShop></bannerStepShop>
  <div class="cart-wrap">
    <div class="cart-container">
      <div class="cart-background">
        <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
        <table class="cart-list" v-else>
          <tbody>
            <tr>
              <th>圖片</th>
              <th>商品</th>
              <th class="cart-selectColor-desktop">顏色</th>
              <th class="cart-selectSize-desktop">尺寸</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
              <th></th>
            </tr>
            <tr v-for="item in cartList.carts" :key="item.id">
              <td >
                <img :src="item.product.images" alt="">
              </td>
              <td >
                <p>{{ item.product.title }}</p>
              </td>
              <td >顏色</td>
              <td >尺寸</td>
              <td >
                <p>{{ item.product.price }}</p>
              </td>
              <td >
                <select name="" id="" :value="item.qty" @change="(event) => setCartQty(item.id, event)">
                  <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                </select>
              </td>
              <td >
                $ {{ item.subtatal }}
              </td>
              <td >
                <img src="/src/assets/image/shop/icons/cancel.svg" @click.prevent="removeCartItem(item.id)" alt="cancel">
              </td>
            </tr>
          </tbody>
        </table>
        <td>總金額 NT$ {{ cartList.total }}</td>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-wrap {
  width: 100%;
  height: 100%;

  .cart-container {
    max-width: 1200px;
    height: 100%;
    margin: auto;
    padding: 20px;

    .cart-background {
      padding: 8px;
      background-color: $blue-2;
      border-radius: 20px;

      .cart-list {
        background-color: #fff;
        border-radius: 15px
      }
    }

    // .cart-content{
    //   padding: 40px;
    //   border-radius: 30px
    // }
    // .cart-list{
    //   width: 100%;
    //   background-color: #fff;
    //   border-radius: 40px

    // }
  }
}

img {
  width: 30px;
}</style>
