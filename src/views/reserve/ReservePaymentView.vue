<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';

export default {
  components: {
    progressBar,
  },
  mounted() {
    if (confirm('點擊查看交易成功(Y)或失敗(N)的頁面')) {
      this.$router.push('/reservesuccess'); // 是的話，導航到頁面 A
    } else {
      this.$router.push('/reservefail'); // 否的話，導航到頁面 B
    }
  },
};
</script>

<template>
  <section class="equipment">
    <progressBar :activeDiv="4" />
  </section>
</template>

<style lang="scss" scoped></style>
