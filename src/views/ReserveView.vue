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
    return {};
  },
  methods: {
    goToNextStep(nextPath) {
      if (sessionStorage.getItem('isStep1Clicked')) {
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
        sessionStorage.setItem('isStep1Clicked', 'true');
      }
    },
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="1" />
  </section>
  <RouterLink to="/equipment" @click="goToNextStep"
    >要按過這個才可以進入下一步驟:2租借設備</RouterLink
  >
</template>

<style lang="scss" scoped></style>
