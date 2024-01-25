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
      isNextStepClick: false,
    };
  },
  methods: {
    goToNextStep(nextPath) {
      if (sessionStorage.getItem('isStep3Clicked')) {
        return;
      } else {
        let currentStep = parseInt(
          sessionStorage.getItem('currentStep') || '1',
        );
        currentStep++;
        sessionStorage.setItem('currentStep', currentStep.toString());
        if (nextPath) {
          this.$router.push(nextPath);
        }
        sessionStorage.setItem('isStep3Clicked', 'true');
      }
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="3" />
    <div class="reserve dark">
      <h2>營地預約訂單</h2>
      <div class="reserve-list">
        <div class="title">營位資訊</div>
        <div class="box">
          <div class="item">入營日期</div>
          <div class="value">拔營日期</div>
        </div>
        <div class="box">
          <div class="item">露營天數</div>
          <div class="value">第一天是否為夜衝</div>
        </div>
        <div class="zone box">
          <div class="item">營區</div>
          <div class="value"></div>
        </div>
        <div class="site box">
          <div class="item">營位</div>
          <div class="value"></div>
        </div>
        <div class="box">
          <div class="item">營位總數</div>
          <div class="value"></div>
        </div>
        <div class="box">
          <div class="item">營位預約小計</div>
          <div class="value"></div>
        </div>
        <div class="box">
          <div class="item"></div>
          <div class="value"></div>
        </div>
        <div class="box">
          <div class="item"></div>
          <div class="value"></div>
        </div>
      </div>
    </div>
    <div class="rent dark"></div>

    <!--下個步驟的按鈕-->
    <nextPageBtn
      @click="goToNextStep(`/reservepayment`)"
      :text="`前往付款`"
      :path="`/reservepayment`"
    />
  </section>
</template>

<style lang="scss" scoped></style>
