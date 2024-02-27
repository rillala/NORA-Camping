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
import { getDBImage } from '@/assets/js/common';

export default {
  components: { bannerStepShop, actionBtn, DropDownBtn, RouterLink },
  data() {
    return {};
  },
  created() {
    const cartStore = useCartStore();
    cartStore.getCart();

    const productStore = useProductStore();
    productStore.axiosGetData();
  },

  methods: {
    ...mapActions(useCartStore, [
      'removeCartItem',
      'setCartQty',
      'getCart',
      'saveCartListToLocalStorage',
    ]),
    getDBImage(images) {
      return getDBImage(images);
    },
    handleColorChange(value, productId) {
      const cartStore = useCartStore();
      // 确保传递给方法的是选中的颜色值而不是事件对象
      cartStore.updateProductOption(productId, value, 'color');
    },
    handleSizeChange(value, productId) {
      const cartStore = useCartStore();
      // 确保传递给方法的是选中的尺寸值而不是事件对象
      cartStore.updateProductOption(productId, value, 'size');
    },
    nextStep(nextPath) {
      if (sessionStorage.getItem('isCart1Clicked')) {
        this.$router.push(nextPath);
      } else {
        // 1. 建立此步驟已被選擇過的 isCart1Clicked = true
        sessionStorage.setItem('isCart1Clicked', 'true');
        // 2. 建立記錄步驟數的 currentStep
        let currentStep = parseInt(sessionStorage.getItem('cartStep') || '1');
        currentStep++;
        sessionStorage.setItem('cartStep', currentStep.toString());
        if (nextPath) {
          this.$router.push(nextPath);
        }
      }
    },
  },
  computed: {
    ...mapState(useCartStore, ['cartList']),
    colorOptions() {
      // 檢查是否有colors，並將其從字符串轉換為數組，如果沒有則返回一個只包含預設選項的數組
      return this.cartList.colors
        ? ['顏色', ...this.cartList.colors.split(',')]
        : ['顏色'];
    },
    sizeOptions() {
      // 同上，對sizes進行處理
      return this.cartList.sizes
        ? ['尺寸', ...this.cartList.sizes.split(',')]
        : ['尺寸'];
    },
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
            <tr v-for="item in cartList.carts" :key="item.productId">
              <td>
                <img
                  :src="getDBImage(item.product.images[0])"
                  alt="Product Image"
                />
              </td>
              <td class="select-content">
                <p class="select-product-title">{{ item.product.title }}</p>
                <div class="select">
                  <DropDownBtn
                    v-if="item.product.colors && item.product.colors.length > 0"
                    :options="
                      item.product.colors
                        ? [...item.product.colors.split(',')]
                        : ['顏色']
                    "
                    @change="
                      event =>
                        handleColorChange(event.target.value, item.productId)
                    "
                    :default-value="item.selectedColor"
                  >
                  </DropDownBtn>
                  <DropDownBtn
                    v-if="item.product.sizes && item.product.sizes.length > 0"
                    :options="
                      item.product.sizes
                        ? [...item.product.sizes.split(',')]
                        : ['尺寸']
                    "
                    @change="
                      event =>
                        handleSizeChange(event.target.value, item.productId)
                    "
                    :default-value="item.selectedSize"
                  >
                  </DropDownBtn>
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
                  @change="event => setCartQty(item.productId, event)"
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
                  @click.prevent="removeCartItem(item.productId)"
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
          <actionBtn
            @click="nextStep('/shopPayment')"
            class="cart-placeOrder"
            :content="'前往結帳'"
          ></actionBtn>
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
  }

  .select-content {
    display: flex;
    min-width: 300px;
    justify-content: space-between;
    gap: 20px;
    margin-top: 6px;

    .select-product-title {
      text-align: left;
    }
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
