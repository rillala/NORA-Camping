<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';
import apiInstance from '@/plugins/auth';

export default {
  components: {
    progressBar,
    nextPageBtn,
  },
  data() {
    return {
      reserveData: {
        reservation_id: 0,
        member_id: 1,

        name: '', // 訂購人姓名
        phone: '', // 訂購人電話
        email: '', // 訂購人 email
        address: '', // 訂購人地址

        checkin_date: '',
        checkout_date: '',
        has_discount: false,
        camp_price: 0,
        equipment_price: 0,
        totalPrice: 0, // 訂單金額
      },
      equipmentData: {},
      campsiteData: {},

      creditCardParts: ['', '', '', ''], // 信用卡號碼
      expInput: '',
      secureCode: '',

      isName: false,
      isPhone: false,
      isEmail: false,
      isAddress: false,
    };
  },
  mounted() {
    if (!sessionStorage.getItem('reserveData')) {
      // 第一次填寫付款資料, 需要取出所有資料
      this.getData();
    } else {
      // 非第一次填寫, 直接取出物件資料
      this.reserveData = JSON.parse(sessionStorage.getItem('reserveData'));
      this.equipmentData = JSON.parse(sessionStorage.getItem('equipmentData'));
      this.equipmentData = JSON.parse(sessionStorage.getItem('campsiteData'));
    }
  },
  watch: {
    'reserveData.name'(newVal) {
      if (newVal.length > 0) {
        this.isName = true;
      }
    },
    'reserveData.phone'(newVal) {
      if (newVal.length == 10) {
        this.isPhone = true;
      }
    },
    'reserveData.email'(newVal) {
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmail = pattern.test(newVal);
    },
    'reserveData.address'(newVal) {
      let pattern =
        /^(臺北市|台北市|新北市|桃園市|臺中市|台中市|臺南市|台南市|高雄市|基隆市|新竹市|新竹縣|苗栗縣|彰化縣|南投縣|雲林縣|嘉義市|嘉義縣|屏東縣|宜蘭縣|花蓮縣|臺東縣|台東縣|澎湖縣|金門縣|連江縣).+$/;

      this.isAddress = pattern.test(newVal);
    },
  },
  methods: {
    getData() {
      let reserveId = sessionStorage.getItem('reserveId');
      let startDate = sessionStorage.getItem('startDate');
      let endDate = sessionStorage.getItem('endDate');
      let hasDiscount = JSON.parse(sessionStorage.getItem('hasDiscount'));

      // reserveData 裡的資料
      this.reserveData.reservation_id = reserveId;
      // this.reserveData.member_id = ;
      this.reserveData.checkin_date = startDate;
      this.reserveData.checkout_date = endDate;

      if (hasDiscount) {
        this.reserveData.has_discount = hasDiscount;
      }

      this.reserveData.camp_price = parseInt(
        sessionStorage.getItem('campPrice'),
      );

      this.reserveData.equipment_price = parseInt(
        sessionStorage.getItem('equipmentPrice'),
      );

      this.reserveData.totalPrice = parseInt(
        sessionStorage.getItem('totalPrice'),
      );

      // campsiteData 裡的資料
      let storedSiteStr = sessionStorage.getItem('selectedSites');

      this.campsiteData = storedSiteStr.split(',').map(item => {
        let [id, rentNum] = item.split(':');
        return {
          reservation_id: reserveId,
          checkin_date: startDate,
          checkout_date: endDate,
          type_id: id,
          reserve_count: Number(rentNum),
        };
      });

      // equipmentData 裡的資料
      let storedEquipmentStr = sessionStorage.getItem('equipmentList');

      if (storedEquipmentStr) {
        this.equipmentData = storedEquipmentStr
          .split(',')
          .filter(item => item) // 移除空字串
          .map(item => {
            let [id, title, price, rentNum] = item.split(':');
            return {
              reservation_id: reserveId,
              equipment_id: Number(id),
              // title: title,
              rental_price: Number(price),
              quantity: Number(rentNum),
            };
          });
      }
    },
    formatPrice(price) {
      return '$' + price.toLocaleString('en-US');
    },
    moveFocus(index) {
      if (this.creditCardParts[index].length === 4 && index < 3) {
        // 當當前輸入框輸入達到4位數字且不是最後一個輸入框時，移動焦點到下一個輸入框
        this.$refs[`part${index + 1}`][0].focus();
      }
    },
    formatExpirationDate() {
      let value = this.expInput;

      // 移除除數字和斜線外的所有字符
      value = value.replace(/[^\d/]|^[/]*$/g, '');
      // 自動添加斜線
      if (value.length > 2 && !value.includes('/')) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      // 限制長度最多為 5 個字符 (MM/YY)
      value = value.slice(0, 5);

      this.expInput = value;
    },

    // 確認訂購資料格式是否正確
    checkOut() {
      // 將條件放入一個陣列，便於遍歷檢查
      const conditions = [
        this.isName,
        this.isPhone,
        this.isEmail,
        this.isAddress,
      ];

      // 用於標記條件名稱的陣列，僅為顯示警告信息時使用
      const conditionNames = ['姓名', '手機', 'Email', '地址'];

      // 遍歷條件進行檢查
      for (let i = 0; i < conditions.length; i++) {
        if (!conditions[i]) {
          alert(`請確認訂購人資訊: ${conditionNames[i]} 欄位輸入是否正確`);
          return; // 退出方法
        }
      }

      // 如果所有條件都為 true
      this.checkCreditCard();
    },

    // 儲存目前輸入資訊
    storeToSession() {
      sessionStorage.setItem('reserveData', this.reserveData);
      sessionStorage.setItem('equipmentData', this.equipmentData);
    },

    // 驗證輸入信用卡是否正確
    // 檢驗信用卡資訊
    // 測試持卡人姓名:TEST TEST
    // 測試卡號:1111222233334444
    // 有效期限:12/34
    // 安全碼:123

    async checkCreditCard() {
      let cardNumber = this.creditCardParts.join('');
      if (
        cardNumber === '1111222233334444' &&
        this.expInput === '12/34' &&
        this.secureCode === '123'
      ) {
        try {
          // 依序執行異步操作
          await this.addReserveToDb();
          await this.addSiteDetailToDb();
          if (this.equipmentData.length > 0) {
            await this.addEquipmentToDb();
          }
          // 如果所有操作都成功，則導航到成功頁面
          this.$router.push('/reservesuccess');
        } catch (error) {
          // 如果發生異常，保存當前信息到 sessionStorage 並導航到失敗頁面
          console.error('Error:', error);
          this.storeToSession();
          this.$router.push('/reservefail');
        }
      } else {
        // 信用卡驗證失敗的處理
        this.storeToSession();
        this.$router.push('/reservefail');
      }
    },

    // php 傳送資料
    addReserveToDb() {
      console.log(this.reserveData);
      apiInstance
        .post('addReservation.php', this.reserveData)
        .then(response => {
          if (!response.data.error && response.data.msg) {
            alert(response.data.msg);
          } else {
            console.error('No message received', response.data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    addEquipmentToDb() {
      console.log(this.equipmentData);
      apiInstance
        .post('addEquipmentRental.php', this.equipmentData)
        .then(response => {
          if (!response.data.error && response.data.msg) {
            alert(response.data.msg);
          } else {
            console.error('No message received', response.data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    addSiteDetailToDb() {
      console.log(this.campsiteData);
      apiInstance
        .post('addSiteReserveDetail.php', this.campsiteData)
        .then(response => {
          if (!response.data.error && response.data.msg) {
            alert(response.data.msg);
          } else {
            console.error('No message received', response.data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="4" />

    <div class="reserve dark">
      <h2>訂購資訊</h2>

      <div class="reserve-list">
        <div class="title h4">訂單資訊</div>

        <div class="info">
          <div class="box p price">
            <div class="item">訂單金額</div>
            <div class="value">{{ formatPrice(reserveData.totalPrice) }}</div>
          </div>
        </div>
      </div>

      <div class="reserve-list">
        <div class="title h4">訂購人資訊</div>

        <div class="info">
          <div class="box p">
            <div class="item">姓名</div>
            <input type="text" class="input" v-model="reserveData.name" />
          </div>
          <div class="box p">
            <div class="item">手機</div>
            <input type="tel" class="input" v-model="reserveData.phone" />
          </div>
          <div class="box p">
            <div class="item">email</div>
            <input type="email" class="input" v-model="reserveData.email" />
          </div>
          <div class="box p">
            <div class="item">地址</div>
            <input type="text" class="input" v-model="reserveData.address" />
          </div>
        </div>
      </div>

      <div class="reserve-list">
        <div class="payment">
          <div class="title h4">付款資訊</div>
          <div class="card">
            <img src="@/assets/image/reserve/visa.png" alt="visa" />
            <img src="@/assets/image/reserve/master.png" alt="master" />
            <img src="@/assets/image/reserve/ae.png" alt="AE" />
            <img src="@/assets/image/reserve/apply.png" alt="Apply Pay" />
          </div>
        </div>

        <div class="info">
          <div class="box p">
            <div class="item">持卡人姓名</div>
            <input type="text" class="input" />
          </div>
          <div class="box p">
            <div class="item">信用卡號</div>
            <div class="card-box">
              <input
                class="card-input"
                v-for="(item, index) in creditCardParts"
                :key="index"
                type="text"
                v-model="creditCardParts[index]"
                maxlength="4"
                @input="moveFocus(index)"
                :ref="`part${index}`"
                placeholder="####"
              />
            </div>
          </div>
          <div class="box p deadline">
            <div class="first">
              <div class="item">有效期限</div>
              <input
                type="text"
                class="input"
                placeholder="MM/YY"
                v-model="expInput"
                @input="formatExpirationDate"
              />
            </div>
            <div class="second">
              <div class="item">安全碼</div>
              <input
                type="text"
                class="input"
                maxlength="3"
                v-model="secureCode"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <nextPageBtn @click="checkOut()" :text="`確認付款`" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/reservePayment.scss';
</style>
