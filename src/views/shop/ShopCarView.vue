<script>
// 引入函式庫
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';
import { mapState, mapActions } from 'pinia';
import bannerStepShop from '@/components/shop/bannerStep-shop.vue';
import actionBtn from '@/components/button/actionBtn.vue';
import DropDownBtn from '@/components/button/dropDownBtn.vue';
import { RouterLink } from 'vue-router';

export default {
  components: { bannerStepShop, actionBtn, DropDownBtn, RouterLink },
  data() {
    return {
      selectColor:['顏色','黑色', '白色', '綠色','藍色'],
      selectSize:['尺寸','XS', 'S', 'M', 'L', 'XL'],
    };
  },
  created() {
    const cartStore = useCartStore();
    cartStore.getCart();

    const productStore = useProductStore();
    productStore.axiosGetData();
  },
  methods: {
    ...mapActions(useCartStore, ['removeCartItem', 'setCartQty', 'getCart']),
    handleSelection(type) {
      // 在這裡觸發相應的事件
      if (type === '黑色') {
        console.log('黑色')
      }else if(type === '白色'){
        console.log('白色');
      }else if (type === '綠色'){
        console.log('綠色');
      }else if(type === '藍色'){
        console.log('藍色');
      }else if(type === 'XS'){
        console.log('XS');
      }else if(type === 'S'){
        console.log('S');
      }else if(type === 'M'){
        console.log('M');
      }else if(type === 'L'){
        console.log('L');
      }else if(type === 'XL'){
        console.log('XL');
      }
    },
  },
  computed: {
    ...mapState(useCartStore, ['cartList']),
  },
  watch: {},
};
</script>

<template>
  <bannerStepShop :activeDiv="1" />
  <div class="cart-wrap">
    <div class="cart-container">
      <div class="cart-background">
        <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
        <table class="cart-list" v-else>
          <tbody>
            <tr>
              <th style="border-radius: 15px 0 0 0"></th>
              <th>商品</th>
              <th class="cart-selectColor-desktop">color</th>
              <th class="cart-selectSize-desktop">size</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
              <th style="border-radius: 0 15px 0 0"></th>
            </tr>
            <tr v-for="item in cartList.carts" :key="item.id">
              <td>
                <img :src="item.product.images" alt="" />
              </td>
              <td class="select-content">
                <p class="footerp">{{ item.product.title }}</p>
                <div class="select">
                  <DropDownBtn :options="selectColor" @change="handleSelection" :default-value="'顏色'"></DropDownBtn>
                  <DropDownBtn :options="selectSize" @change="handleSelection" :default-value="'尺寸'"></DropDownBtn>
                </div>
              </td>
              <td>
                <p>{{ item.product.price }}</p>
              </td>
              <td>
                <select
                  name=""
                  id=""
                  :value="item.qty"
                  @change="event => setCartQty(item.id, event)"
                >
                  <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                </select>
              </td>
              <td>
                <p>$ {{ item.subtotal }}</p>
              </td>
              <td>
                <img
                  class="cart-cancel"
                  src="/src/assets/image/shop/icons/cancel.svg"
                  @click.prevent="removeCartItem(item.id)"
                  alt="cancel"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p class="cart-total">總金額 NT$ {{ cartList.total }}</p>
        <div class="cart-buttons">
          <router-link to="shop">
            <actionBtn
              class="cart-keepShoping"
              :content="'繼續購物'"
            ></actionBtn>
          </router-link>
          <RouterLink to="shopPayment"><actionBtn class="cart-placeOrder" :content="'前往結帳'"></actionBtn></RouterLink>
          
        </div>
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
    padding: 20px 4px;

    .cart-background {
      padding: 10px 8px;
      background-color: $blue-2;
      border-radius: 20px;

      .cart-list {
        width: 100%;
        background-color: #fff;
        border-radius: 15px;
      }

      .cart-total {
        margin: 20px 0;
        text-align: center;
      }

      tr {
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
      }

      tr:nth-child(1) {
        border-radius: 20px 20px 0 0;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
      }

      tr:last-child {
        border-radius: 0 0 15px 15px;
      }

      th {
        width: 25vw;
        line-height: 200%;
        background-color: $light-gray;
      }

      td {
        text-align: center;
        vertical-align: middle;
        padding: 8px 2px;
      }
    }
  }
}

.cart-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cart-keepShoping {
  background-color: $blue-1;
  border: none;
}

img {
  width: 30px;
  vertical-align: middle;
}

@include desktop {
  img {
    width: 50px;
  }
}

.cart-cancel {
  width: 15px;
  height: 15px;
}

@include desktop {
  .cart-cancel {
    width: 20px;
    height: 20px;
  }

  .select {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .select-content {
    display: flex;
    margin-top: 6px;
  }
}

/* select color size */
.select-title {
  display: flex;
}

.select {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.cart-selectColor-desktop {
  display: none;
}

.cart-selectSize-desktop {
  display: none;
}
</style>
