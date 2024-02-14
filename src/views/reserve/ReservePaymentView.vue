<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';
import nextPageBtn from '@/components/reserve/nextPageBtn.vue';

export default {
  components: {
    progressBar,
    nextPageBtn,
  },
  data() {
    return {
      reserveData: {
        totalPrice: 0, // 訂單金額
        name: '', // 訂購人姓名
        phone: '', // 訂購人電話
        email: '', // 訂購人 email
        address: '', // 訂購人地址
      },

      creditCardData: {
        creditCardParts: ['', '', '', ''], // 信用卡號碼
        expMonth: '', // 信用卡有效期限
        expYear: '', // 信用卡安全碼
      },

      expInput: '',
    };
  },
  mounted() {
    this.reserveData.totalPrice = parseInt(
      sessionStorage.getItem('totalPrice'),
    );
  },
  watch: {
    expInput(newVal) {
      let month = false;
      let year = false;

      if (newVal.length == 5 && newVal.indexOf('/') > 0) {
        let arr = newVal.split('/');

        if (parseInt(arr[0]) <= 12) {
          month = true;
          this.creditCardData.expMonth = arr[0];
        }
        if (parseInt(arr[1])) {
          year = true;
          this.creditCardData.expYear = arr[1];
        }
      }
    },
  },
  methods: {
    checkout() {
      if (confirm('點擊查看交易成功(Y)或失敗(N)的頁面')) {
        this.$router.push('/reservesuccess'); // 是的話，導航到頁面 A
      } else {
        this.$router.push('/reservefail'); // 否的話，導航到頁面 B
      }
    },
    formatPrice(price) {
      return '$' + price.toLocaleString('en-US');
    },
    moveFocus(index) {
      if (
        this.creditCardData.creditCardParts[index].length === 4 &&
        index < 3
      ) {
        // 當當前輸入框輸入達到4位數字且不是最後一個輸入框時，移動焦點到下一個輸入框
        this.$refs[`part${index + 1}`][0].focus();
      }
    },
    // 驗證輸入資料格式相關

    // php 相關
    addReserveToDb() {
      if (this.siteData.type_id === '0') {
        alert('營位種類必選喔!!!');
        return;
      }

      apiInstance
        .post('campSiteAdd.php', this.siteData)
        .then(response => {
          if (!response.data.error) {
            alert(response.data.msg);
            this.getSitesPHP();
            this.clearForm(); // 假設您有一個 clearForm 方法來清空表單
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
                v-for="(item, index) in creditCardData.creditCardParts"
                :key="index"
                type="text"
                v-model="creditCardData.creditCardParts[index]"
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
                type="number"
                class="input"
                placeholder="MM/YY"
                v-model="expInput"
              />
            </div>
            <div class="second">
              <div class="item">安全碼</div>
              <input type="number" class="input" maxlength="3" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <nextPageBtn @click="checkout()" :text="`確認付款`" />
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/reservePayment.scss';
</style>
