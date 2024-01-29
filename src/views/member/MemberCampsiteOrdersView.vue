<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心_營地訂單</h1>
    </div>
  </div>

  <nav>
    <ul class="nav-list">
      <li><router-link to="/membercenter" class="memberlink">會員資料</router-link></li>
      <li><router-link to="/memberorderhistory" class="memberlink">訂單歷史</router-link></li>
      <li><router-link to="/membercampsiteorders" class="memberlink member-page">營地訂單</router-link></li>
    </ul>
  </nav>

  <div class="order-box">
    <table class="order-container">
      <thead>
        <tr>
          <th class="table-title">訂單日期</th>
          <th class="table-title">訂單編號</th>
          <th class="table-title responsive-cell-01" v-if="!isSmallScreen">訂單金額</th>
          <th class="table-title" >訂單狀態</th>
          <th class="table-title">查看詳情</th>
          <th class="table-title">取消訂單</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="table-content">{{ truncatedDate(order.orderDate) }}</td>
          <td class="table-content">{{ order.orderNumber }}</td>
          <td class="table-content responsive-cell-01" v-if="!isSmallScreen">{{ order.orderAmount }}</td>
          <td class="table-content">{{ order.orderStatus }}</td>
          <td class="table-content"><button class="btn-view-details" @click="viewDetails(order)">查看</button></td>
          <td class="table-content"><button class="btn-cancel" @click="cancelOrder(order)">取消</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      orders: [ {
          id: 1,
          orderDate: '2023/12/01',
          orderNumber: '#111111',
          orderAmount: '$291',
          shippingMethod: '宅配',
          orderStatus: '完成',
        },
        {
          id: 2,
          orderDate: '2023/12/01',
          orderNumber: '#111112',
          orderAmount: '$391',
          shippingMethod: '超商取貨',
          orderStatus: '完成',
        },
        {
          id: 3,
          orderDate: '2023/12/01',
          orderNumber: '#111113',
          orderAmount: '$291',
          shippingMethod: '宅配',
          orderStatus: '完成',
        },
      ],// 從資料庫獲取的訂單數據
      
      isSmallScreen: false,
    };
  },
  mounted() {
    // 模擬從資料庫中獲取訂單數據的操作
    this.fetchOrdersFromDatabase();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  
  methods: {
    fetchOrdersFromDatabase() {
      // 實際從資料庫中獲取數據的邏輯
      // 可以使用 API 請求或其他方式
      // 將獲取到的數據賦值給 this.orders
      // this.orders = 資料庫中的訂單數據;
    },
    viewDetails(order) {
      // 實作查看詳情的邏輯
      console.log('查看詳情', order);
    },
    cancelOrder(order) {
      // 實作取消訂單的邏輯
      console.log('取消訂單', order);
    },

    checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 480; 
    },

    truncatedDate(fullDate) {
      return fullDate.slice(5); // 截取月份和日期部分，忽略年份
    }
  },
};
</script>

<style lang="scss" scoped>
*{
  font-family: 'Inter', sans-serif;
}
.member-page {
  font-weight: bold; 
}

nav ul{
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.memberlink {
  text-decoration: none;
  color:$blue-3;
  font-size: 26px;
  padding:10px;
  white-space: nowrap;
}

.memberlink:hover{
  color:$blue-4;
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

.order-container{
  margin:auto;
  margin-bottom: 10px;
  @include tablet {
    max-width: 800px;
  }
    @include desktop {
    max-width: 800px;
  }
}
.responsive-cell-01{
  display: none;

  @include tablet {
    background-color: red;
    display: inline-block; 
    width: calc(100% / 6);
  }
  @include desktop {
    display:inline-block; 
    display: inline-block; 
    width: calc(100% / 6);
  }
}
.table-title, .table-content{
  text-align:center;
  font-size: 14px;
  border: 1px solid #ddd; 
  padding: 8px;
  width: calc(100% / 5);
  white-space: nowrap;
  @include tablet {
    font-size: 16px;
    width: calc(100% /6);
  }
  @include desktop {
    font-size: 16px;
    width: calc(100% /6);
  }
  .btn-view-details{
    background-color: $blue-3;
    border: none;
    padding: 6px 10px;
    border-radius: 50px;
    margin-left: auto;
    @include tablet {
      padding: 6px 15px;
    }
    @include desktop {
      padding: 6px 15px;
    }
  }

  .btn-cancel{
    background-color:$light-gray;
    border: none;
    padding: 6px 10px;
    border-radius: 50px;
    margin-left: auto;

    @include tablet {
      padding: 6px 15px;
    }
    @include desktop {
      padding: 6px 15px;
    }
  }
}
</style>
