<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心_營地訂單</h1>
    </div>
  </div>

  <nav>
    <ul class="nav-list">
      <li>
        <router-link to="/membercenter" class="memberlink"
          >會員資料</router-link
        >
      </li>
      <li>
        <router-link to="/memberorderhistory" class="memberlink"
          >商品訂單</router-link
        >
      </li>
      <li>
        <router-link to="/membercampsiteorders" class="memberlink member-page"
          >營地訂單</router-link
        >
      </li>
    </ul>
  </nav>

  <div class="order-box">
    <table class="order-container">
      <thead>
        <tr>
          <th class="table-title">訂單編號</th>
          <th class="table-title">入營日期</th>
          <th class="table-title responsive-cell-01">拔營日期</th>
          <th class="table-title responsive-cell-01" v-if="!isSmallScreen">
            訂單金額
          </th>
          <th class="table-title">訂單狀態</th>
          <th class="table-title">查看詳情</th>
          <th class="table-title">取消訂單</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders"
          :key="order.orderInfo.reservation_id"
        >
          <td class="table-content">{{ order.orderInfo.reservation_id }}</td>
          <td class="table-content">{{ order.orderInfo.checkin_date }}</td>
          <td class="table-content">{{ order.orderInfo.checkout_date }}</td>
          <td class="table-content responsive-cell-01" v-if="!isSmallScreen">
            {{ order.orderInfo.total_price }}
          </td>
          <td class="table-content">
            {{
              order.orderInfo.reserve_status == 0
                ? '已取消'
                : order.orderInfo.reserve_status == 1
                  ? '尚未入住'
                  : '已完成'
            }}
          </td>
          <td class="table-content">
            <button class="btn-view-details" @click="getOrderDetails(index)">
              查看
            </button>
          </td>
          <td class="table-content">
            <button
              class="btn-cancel"
              @click="cancelOrder(order.orderInfo.reservation_id)"
            >
              取消
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 營地明細燈箱，使用 v-if 控制顯示 -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="content-title">營地明細</h3>
      <!-- 顯示選中訂單明細 -->
      <table>
        <thead>
          <th>入營日期</th>
          <th>拔營日期</th>
          <th>是否夜衝</th>
          <th>訂單狀態</th>
        </thead>
        <tbody>
          <tr>
            <td>{{ selectedOrder.checkin_date }}</td>
            <td>{{ selectedOrder.checkout_date }}</td>
            <td>{{ selectedOrder.has_discount == 1 ? '是' : '否' }}</td>
            <td>
              {{
                selectedOrder.reserve_status == 0
                  ? '已取消'
                  : selectedOrder.reserve_status == 1
                    ? '尚未入住'
                    : '已完成'
              }}
            </td>
          </tr>
        </tbody>
        <thead>
          <h5 class="detail-title">營位預定明細</h5>
          <tr>
            <th>營區</th>
            <th>營位種類</th>
            <th>數量</th>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in selectedSite">
            <td>{{ changeZoneStr(order.type_id) }}</td>
            <td>{{ changetypeStr(order.type_id) }}</td>
            <td>{{ order.reserve_count }}</td>
          </tr>
        </tbody>
        <thead v-if="selectedEquip.length > 0">
          <h5 class="detail-title">設備預定明細</h5>
          <tr>
            <th>品項編號</th>
            <th>品項名稱</th>
            <th>數量</th>
          </tr>
        </thead>
        <tbody v-if="selectedEquip.length > 0">
          <tr v-for="order in selectedEquip">
            <td>{{ order.equipment_id }}</td>
            <td>{{ order.title }}</td>
            <td>{{ order.quantity }}</td>
          </tr>
        </tbody>
      </table>
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
      orders: [], // 從資料庫獲取的訂單數據
      showModal: false,
      selectedOrder: null,
      selectedSite: null,
      selectedEquip: null,
      memberId: -1,

      isSmallScreen: false,
    };
  },
  computed: {
    ...mapState(userStore, ['memberInfo']),
  },

  async mounted() {
    await this.getMemberInfo();
    // 确保 getMemberInfo 完成后执行
    this.memberId = this.memberInfo.member_id;
    console.log(this.memberId);
    this.getOrders();
  },
  methods: {
    ...mapActions(userStore, [
      'updateToken',
      'updateUserData',
      'getMemberInfo',
    ]),
    //取得訂單
    getOrders() {
      let member = new FormData();
      let memberId = this.memberId;
      console.log(memberId);
      member.append('memberId', memberId);

      apiInstance
        .post('getReserveMember.php', member)
        .then(response => {
          this.orders = response.data.all;
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    //關閉燈箱
    closeModal() {
      this.showModal = false;
    },
    //開啟燈箱
    openModal(index) {
      this.showModal = true;
      this.selectedOrder = this.orders[index].orderInfo;

      this.selectedSite = this.orders[index].siteInfo;
      console.log(this.selectedSite);

      if (this.orders[index].rentInfo) {
        this.selectedEquip = this.orders[index].rentInfo;
        console.log(this.selectedEquip);
      }
    },

    // 查看訂單明細
    getOrderDetails(index) {
      console.log(index);
      this.openModal(index);
    },

    // 取消訂單
    cancelOrder(reserveId) {
      if (confirm('您確定要取消這個訂單嗎?')) {
        let cancel = 0;
        let editItem = new FormData();
        editItem.append('tablename', 'campsite_reservations');
        editItem.append('status', cancel);
        editItem.append('id', reserveId);
        console.log(editItem);

        apiInstance
          .post('editStatus.php', editItem)
          .then(response => {
            if (!response.data.error) {
              alert('訂單已取消!如有任何疑問請聯絡我們。');
              this.getOrders();
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    },

    // 資料重整
    changetypeStr(type) {
      let typeStr = '';
      switch (parseInt(type)) {
        case 1:
        case 4:
          typeStr = '草地區';
          break;
        case 2:
        case 5:
          typeStr = '棧板區';
          break;
        case 3:
        case 6:
          typeStr = '雨棚區';
          break;
        default:
          typeStr = '錯誤，無分區編號';
      }
      return typeStr;
    },
    changeZoneStr(type) {
      let zoneStr = '';
      switch (parseInt(type)) {
        case 1:
        case 2:
        case 3:
          zoneStr = '貓區';
          break;
        case 4:
        case 5:
        case 6:
          zoneStr = '狗區';
          break;
        default:
          zoneStr = '錯誤，無分區編號';
      }
      return zoneStr;
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  font-family: 'Inter', sans-serif;
}
.member-page {
  font-weight: bold;
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

.responsive-cell-01 {
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
  white-space: nowrap;
  @include tablet {
    font-size: 16px;
    width: calc(100% / 6);
  }
  @include desktop {
    font-size: 16px;
    width: calc(100% / 6);
  }
  .btn-view-details {
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

  .btn-cancel {
    background-color: $light-gray;
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

th,
td {
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

.item {
  margin: 10px;
  font-size: 16px;
}
.content-title {
  text-align: center;
  margin-bottom: 10px;
}

.detail-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
