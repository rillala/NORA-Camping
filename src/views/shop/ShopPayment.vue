<script>
import BannerStepShop from '@/components/shop/bannerStep-shop.vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
import ActionBtn from '@/components/button/actionBtn.vue';


export default {
  components: { BannerStepShop, ActionBtn },
  data() {
    return {
      orderInfo: {
        payWay: 0,
        payMethod: '信用卡付款',
        carry: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        note: '',
        totalWithPayWay: 0,
        orderId: [],
      },
    }
  },
  methods: {
    ...mapActions(useCartStore, ['getCart']),
    confirmPayment() {
      this.$nextTick(() => {
        // 確保在更新之後獲取正確的 orderInfo.payWay 值
        this.orderInfo.totalWithPayWay = this.totalWithPayWay;
        // 將總計值存儲到 sessionStorage
        sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
        // 跳轉到下一頁，你可以使用 this.$router.push
        this.$router.replace('/ShopOrderSucess')
      });
    },
    confirmCarry(way) {
      this.orderInfo.carry = way
    }, 
  },
  computed: {
    ...mapState(useCartStore, ['cartList']),
    totalWithPayWay() {
      return Number(this.cartList.total) + Number(this.orderInfo.payWay);
    },
  },
  created() {
    const cartStore = useCartStore();
    cartStore.getCart();

    const productStore = useProductStore();
    productStore.axiosGetData();

    const storedOrderInfo = sessionStorage.getItem('orderInfo');

    if (storedOrderInfo) {
      // 將 session storage 中的資料轉換為對應的數據格式
      const parsedOrderInfo = JSON.parse(storedOrderInfo);

      // 更新組件數據
      this.orderInfo = {
        ...this.orderInfo,
        ...parsedOrderInfo,
      };
    }
  },

}
</script>
<template>
  <BannerStepShop></BannerStepShop>
  <section class="shop-payment-wrap">
    <div class="shop-payment-container">
      <form class="shop-payment-forms">
        <h2>訂單資訊</h2>
        <div class="shop-payment-box">
          <div class="shop-payment-formhead"></div>
          <table class="shop-payment-item">
            <tr>
              <th>商品</th>
              <th>小計</th>
            </tr>
            <tr v-for="item in cartList.carts" :key="item.productId">
              <td>{{ item.product.title }}-{{ item.selectedColor }}-{{ item.selectedSize }}-×{{ item.qty }}</td>
              <td>NT${{ item.subtotal }}</td>
            </tr>
            <tr class="shop-payment-aggregately">
              <td>合計</td>
              <td>NT${{ cartList.total }}</td>
            </tr>
            <div class="shop-payment-carry">
              <h4>運送方式</h4>
              <div class="carry-option">
                <label for="self-pick"><input @change="confirmCarry('自行取貨')" name="sendWay" type="radio" id="self-pick"
                    value="0" v-model="this.orderInfo.payWay">自行取貨</label>
                <label for="sendHome"><input @change="confirmCarry('宅配')" name="sendWay" type="radio" id="sendHome"
                    value="100" v-model="this.orderInfo.payWay">宅配: NT$100</label>
                <label for="sendStore"><input @change="confirmCarry('超商取貨')" name="sendWay" type="radio" id="sendStore"
                    value="60" v-model="this.orderInfo.payWay">超商取貨: NT$60</label>
              </div>
            </div>
            <div class="shop-payment-carry">
              <h4>支付方式</h4>
              <div class="carry-option">
                <label for="creditCard"><input name="creditCard" type="radio" id="creditCard" value="信用卡付款"
                    v-model="payMethod" required>信用卡付款</label>
              </div>
            </div>
            <h4 class="shop-payment-total">總計: NT$ {{ totalWithPayWay }}</h4>
          </table>
        </div>


        <h2>訂購資訊</h2>
        <div class="shop-payment-box">
          <div class="shop-payment-formhead"></div>
          <table class="shop-payment-inputs">
            <tr>
              <td>
                <p>姓名</p>
              </td>
              <td><input type="name" name="name" placeholder="請輸入姓名" v-model="orderInfo.name" required></td>
            </tr>
            <tr>
              <td>
                <p>手機</p>
              </td>
              <td><input type="text" maxlength="11" placeholder="請輸入手機號碼" v-model="orderInfo.phone" /></td>
            </tr>
            <tr>
              <td>
                <p>信箱</p>
              </td>
              <td><input type="text" name="email" placeholder="例:123@gmail.com" v-model="orderInfo.email" required></td>
            </tr>
            <tr>
              <td>
                <p>地址</p>
              </td>
              <td><input type="text" v-model="orderInfo.address" required></td>
            </tr>
            <tr>
              <td>
                <p>備註</p>
              </td>
              <td><textarea name="" id="" cols="25" rows="4" v-model="orderInfo.note"></textarea></td>
            </tr>
          </table>
        </div>
        <ActionBtn @click="confirmPayment" :content="'確認付款'"></ActionBtn>

      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.shop-payment-wrap {
  width: 100%;
  height: 100%;

  .shop-payment-container {
    max-width: 1200px;
    height: 100%;
    margin: auto;
    padding: 20px;

    .shop-payment-forms {
      display: flex;
      flex-flow: column;
      gap: 20px;
      align-items: center;
      max-width: 800px;
      margin: auto;
      padding: 20px;
      border-radius: 50px;

      .shop-payment-list {
        width: 100%;
        border: 5px solid $light-gray;
        border-radius: 40px;
      }

      .shop-payment-box {
        width: 100%;
        border: 1px solid $dark-gray;
        border-radius: 40px;
        background-color: #fff;

        .shop-payment-item {
          width: 90%;
          margin: 20px auto;

          tr {
            height: 20px;
            border-bottom: 1px solid $light-gray;
          }

          td {
            height: 20px;
            line-height: 200%;
          }

          .shop-payment-aggregately {
            border-bottom: none;
          }

          .shop-payment-carry {
            width: 100%;
            margin: 40px;
            text-align: center;
            background-color: $blue-2;
            border-radius: 20px;

            h4 {
              padding-top: 20px;
            }

            .carry-option {
              padding: 20px 0;
            }
          }

          .shop-payment-total {
            margin: 20px auto;
            margin-left: 16%;
            text-align: center;
            width: 80%;
            border-bottom: 1px solid $light-gray;
          }
        }

      }
    }
  }
}

.shop-payment-formhead {
  width: 100%;
  height: 40px;
  background-color: $blue-3;
  border-radius: 50px 50px 0 0;
}

.shop-payment-inputs {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 8px auto;

  tr,
  td {
    line-height: 200%;
    padding: 4px 20px;
    vertical-align: middle;
  }
}
</style>