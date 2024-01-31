<script>
// 引入函式庫
import axios from 'axios';
import { useCartStore } from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
import bannerStepShop from '@/components/shop/bannerStep-shop.vue';
import actionBtn from '@/components/button/actionBtn.vue';


export default {
  components: { bannerStepShop, actionBtn },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useCartStore, ['removeCartItem', 'setCartQty'])
  },
  computed: {
    ...mapState(useCartStore, ['cartList'])
  },
  watch: {

  },
  created() {
  },
  mounted() {
    // 初始化时，将 localStorage 中的值同步到 cartList
    // const storedCartList = localStorage.getItem('cartList');
    // if (storedCartList) {
    //   const parsedCartList = JSON.parse(storedCartList);
    //   useCartStore().cartList.carts = parsedCartList;
    // }
  },
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
                <img :src="item.product.images" alt="">
              </td>
              <td class="select-content">
                <p class="footerp">{{ item.product.title }}</p>
                <div class="select">
                  <p class="select-item">顏色</p>
                  <p class="select-item">尺寸</p>
                </div>
              </td>
              <td>
                <p>{{ item.product.price }}</p>
              </td>
              <td>
                <select name="" id="" :value="item.qty" @change="(event) => setCartQty(item.id, event)">
                  <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                </select>
              </td>
              <td>
                <p>$ {{ item.subtotal }}</p>
              </td>
              <td>
                <img class="cart-cancel" src="/src/assets/image/shop/icons/cancel.svg"
                  @click.prevent="removeCartItem(item.id)" alt="cancel">
              </td>
            </tr>

          </tbody>
        </table>
        <p class="cart-total">總金額 NT$ {{ cartList.total }}</p>
        <div class="cart-buttons">
          <router-link to="shop">
            <actionBtn class="cart-keepShoping" :content="'繼續購物'"></actionBtn>
          </router-link>

          <actionBtn class="cart-placeOrder" :content="'前往結帳'"></actionBtn>
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
        padding: 4px 2px;
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
}

.select p {
  background-color: rgb(127, 255, 148);
  border-radius: 5px;
  padding: 3px 5px;
  font-size: 14px;
  width: 50px;
}

.select p:nth-child(1) {
  margin-right: 5px;
}

.cart-selectColor-desktop {
  display: none;
}

.cart-selectSize-desktop {
  display: none;
}</style>
