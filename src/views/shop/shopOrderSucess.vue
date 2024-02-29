<script>
import BannerStepShop from '@/components/shop/bannerStep-shop.vue';
import { useCartStore } from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
import ActionBtn from '@/components/button/actionBtn.vue';
import apiInstance from '@/plugins/auth';


export default {
  components: { BannerStepShop, ActionBtn },
  data() {
    return {
      orderInfo: {},
      orders: '',
      cartListInSucess: null,
    };
  },
  methods: {
    ...mapActions(useCartStore, ['removeCart', 'getCart']),
    
    getOrders() {
      apiInstance.get("/getOrders.php")
        .then(response => {
          this.orders = response.data[0];
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
  },
  computed: {
    ...mapState(useCartStore, ['cartList']),
  },
  created() {
    this.cartListInSucess = this.cartList;
    this.getCart()
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
    this.getOrders();
    sessionStorage.removeItem('orderInfo');
    localStorage.removeItem('cartList');
    this.$nextTick(() => {
    this.removeCart();  // 清空 Pinia 中的購物車
  });
  },
};
</script>

<template>
  <BannerStepShop :activeDiv="3"></BannerStepShop>
  <section class="shop-orderSucess-wrap">
    <div class="step3">
      <div class="title">
        <h2>謝謝</h2>
        <h2>我們已收到您的訂單</h2>
      </div>
      <div class="buy-content">
        <div class="content-title">
          <h3>訂單詳細資料</h3>
        </div>
        <div class="between number">
          <h4>訂單編號:</h4>
          <p>{{ this.orders.order_id }}</p>
        </div>
        <div class="buy-information">
          <div
            v-for="item in cartListInSucess.carts"
            :key="item.id"
            class="between buy-list"
          >
            <h4>
              {{ item.product.title }} {{ `-${item.selectedColor}`
              }}{{ `-${item.selectedSize}` }} X {{ item.qty }}
            </h4>
            <p>NT$ {{ item.subtotal }}</p>
          </div>
          <div class="between buy-total">
            <h4>合計:</h4>
            <p>NT$ {{ cartListInSucess.total }}</p>
          </div>
          <div class="between buy-migrate">
            <h4>付款方式:</h4>
            <p>{{ orderInfo.payment }}</p>
          </div>
          <div class="between buy-way">
            <h4>運送方式:</h4>
            <p>{{ orderInfo.carry }} NT$ {{ orderInfo.payWay }}</p>
          </div>
          <div class="between buy-result">
            <h3>總計:</h3>
            <h3>NT$ {{ orderInfo.totalWithPayWay }}</h3>
          </div>
          <div class="content-title">
            <h3>訂購人資料</h3>
          </div>
          <div class="between buyer">
            <h4>姓名:</h4>
            <p>{{ orderInfo.name }}</p>
          </div>
          <div class="between buyer">
            <h4>電話:</h4>
            <p>{{ orderInfo.phone }}</p>
          </div>
          <div class="between buyer">
            <h4>Email:</h4>
            <p>{{ orderInfo.email }}</p>
          </div>
          <div class="locate-title">
            <h4>帳單地址</h4>
            <p>{{ orderInfo.address }}</p>
            <h4>備註</h4>
            <p>{{ orderInfo.note }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="backButton">
      <router-link to="shop"
        ><ActionBtn :content="'返回首頁'"></ActionBtn>
      </router-link>
      <router-link to="memberorderhistory"
        ><ActionBtn :content="'查看訂單'"></ActionBtn>
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.shop-orderSucess-wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.between {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
}

.step3 {
  max-width: 1200px;
  background-color: $blue-1;
  margin: 40px auto;
  padding: 24px 35px;
  border-radius: 50px;
}

.step3 .title {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 25px;
}

.step3 .title h2 {
  font-weight: bold;
}

.buy-content {
  padding: 20px 50px;
  background-color: $blue-1;
  border-radius: 18px;
}

.content-title {
  font-weight: bold;
  margin-bottom: 20px;

  h3 {
    font-weight: bold;
  }
}

.buy-result {
  font-size: 20px;
}

.locate-title h4 {
  font-weight: bold;
  margin-block: 16px;
}

.locate-title input {
  color: $light-gray;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #000;
  width: 100%;
}

.backButton {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 40px;
}
</style>
