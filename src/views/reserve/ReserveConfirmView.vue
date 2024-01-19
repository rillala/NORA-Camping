<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';

export default {
  components: {
    progressBar,
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
  </section>
  <button @click="goToNextStep">要按過這個才可以進入下一步驟:4付款頁面</button>
</template>

<style lang="scss" scoped></style>
