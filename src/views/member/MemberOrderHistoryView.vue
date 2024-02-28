<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心_商品訂單</h1>
    </div>
  </div>

  <nav>
    <ul class="nav-list">
      <li>
        <router-link to="/membercenter" class="memberlink">會員資料</router-link>
      </li>
      <li>
        <router-link to="/memberorderhistory" class="memberlink member-page">商品訂單</router-link>
      </li>
      <li>
        <router-link to="/membercampsiteorders" class="memberlink">營地訂單</router-link>
      </li>
    </ul>
  </nav>

  <div class="order-box">
    <table class="order-container">
      <thead>
        <tr>
          <th class="table-title">訂單日期</th>
          <th class="table-title">訂單編號</th>
          <th class="table-title responsive-cell-01">
            總金額
          </th>
          <th class="table-title">運送方式</th>
          <th class="table-title responsive-cell-02">
            訂單狀態
          </th>
          <th class="table-title">查看詳情</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id">
          <td class="table-content">{{ order.order_date }}</td>
          <td class="table-content">{{ order.order_id }}</td>
          <td class="table-content responsive-cell-01">
            {{ order.total_amount }}
          </td>
          <td class="table-content">{{ order.delivery_method }}</td>
          <td class="table-content responsive-cell-02">
            {{ order.order_status }}
          </td>
          <td class="table-content">
            <button class="btn-view-details" @click="getOrderDetails(order.order_id)">
              查看
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 訂單明細燈箱，使用 v-if 控制显示 -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="content-title">訂單明細</h3>
      <!-- 显示选中订单的明细 -->
      <table>
        <thead>
          <tr>
            <th class="product-name">商品名稱</th>
            <th class="color">顏色</th>
            <th>尺寸</th>
            <th>單價</th>
            <th>數量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detail in selectedOrderDetails" :key="detail.title">
          <td>{{ detail.title }}</td>
          <td>{{ detail.color }}</td>
          <td>{{ detail.size }}</td>
          <td>{{detail.unit_price}} </td>
          <td>{{ detail.quantity }}</td>
          <td>{{ detail.subtotal }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 显示总金额、配送方式等信息 -->
      <p class="item">總金額: {{ this.orders[0].total_amount }}</p>
      <p class="item">配送方式:{{ this.orders[0].delivery_method }}</p>
      <p class="item">支付方式: {{ this.orders[0].payment }}</p>
      <p class="item">訂單狀態: {{ this.orders[0].order_status }}</p>
      <div class="button-container">
        <button @click="closeModal">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import apiInstance from '@/plugins/auth';
import userStore from '@/stores/user';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      orders: [

      ], // 從資料庫獲取的訂單數據
      showModal: false,
      selectedOrder: null,
      selectedOrderDetails: [],
    };
  },
  methods: {
    //取得訂單
    getOrders() {
      const memberId = this.memberInfo.member_id;
      apiInstance.get(`./getMemberOrders.php?member_id=${memberId}`)
        .then(response => {
          this.orders = response.data; // 假设后端返回的格式是一个订单数组
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    //取得訂單明細
    getOrderDetails(orderId) {
      apiInstance.get(`./getMemberOrderDetails.php?order_id=${orderId}`)
        .then(response => {
          this.selectedOrderDetails = response.data; // 假设后端返回的格式是订单详情数组
          this.showModal = true; // 打开模态框
        })
        .catch(error => {
          console.error("Error getting order details:", error);
        });
    },
    //關閉燈箱
    closeModal() {
      this.showModal = false;
    },
    //開啟燈箱
    openModal() {
      this.showModal = true;
    }
  },
  computed: {
    ...mapState(userStore, ['memberInfo']),
  },
  created() {
    const memberStore = userStore();
    memberStore.getMemberInfo();

    this.getOrders();
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Inter', sans-serif;
}

.member-page {
  font-weight: bold;
  color: $blue-4;
}

nav ul {
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.memberlink {
  text-decoration: none;
  color: $blue-3;
  font-size: 26px;
  padding: 10px;
  white-space: nowrap;
}

.memberlink:hover {
  color: $blue-4;
}

.title-wrap {
  padding-top: 70px;
  margin-left: 80px;
  color: $blue-4;
}

.banner-bgc {
  background-color: $blue-1;
  height: 200px;
  width: 100%;
}

.order-container {
  margin: auto;
  margin-bottom: 10px;

  @include tablet {
    max-width: 800px;
  }

  @include desktop {
    max-width: 800px;
  }
}

.responsive-cell-01,
.responsive-cell-02 {
  @include only-mobile {
    display: none;
  }
}

.table-title,
.table-content {
  text-align: center;
  font-size: 14px;
  border: 1px solid #ddd;
  padding: 8px;
  width: calc(100% / 5);
  @include font-style(16px, 400, 1%, 160%);

  white-space: nowrap;

  @include tablet {
    font-size: 16px;
    width: calc(100% / 7);
  }

  @include desktop {
    font-size: 16px;
    width: calc(100% / 7);
  }

  .btn-view-details {
    background-color: $blue-3;
    border: none;
    padding: 6px 10px;
    border-radius: $radius;
    margin-left: auto;
    @include font-style(16px, 400, 1%, 160%);

    @include tablet {
      padding: 6px 15px;
    }

    @include desktop {
      padding: 6px 15px;
    }
  }
  .btn-view-details:hover{
    background-color:$blue-4;
  }
  .btn-cancel {
    background-color: $light-gray;
    border: none;
    padding: 6px 10px;
    border-radius:$radius;
    margin-left: auto;

    @include tablet {
      padding: 6px 15px;
    }

    @include desktop {
      padding: 6px 15px;
    }
  }
}
.modal-overlay {
  position: fixed; /* 或者是 absolute，依據需求 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  align-items: center; /* 垂直置中 */
  justify-content: center; /* 水平置中 */
}

.modal-content {
  background-color: #fff; /* 白色背景 */
  padding: 20px;
  border-radius: 5px; /* 圓角邊框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  width: 50%; /* 彈窗寬度 */
  max-width: 640px; /* 最大寬度 */
}

table {
  width: 100%; /* 表格寬度為彈窗寬度 */
  border-collapse: collapse; /* 去除表格間距 */
}

th, td {
  text-align: left;
  padding: 10px; /* 表格內填充 */
  border-bottom: 1px solid #ddd; /* 表格行之間的分割線 */
}

button {
  background-color: $blue-3; 
  color: $white01;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer; 
  border-radius: $radius; 
  
}

button:hover {
  background-color: $blue-4; 
}
.button-container {
  display: flex;
  justify-content: flex-end; /* 這將使得按鈕靠右對齊 */
}

.item{
  margin:10px;
  font-size:16px;
}
.content-title{
  text-align: center;
  margin-bottom: 10px;
}
</style>
