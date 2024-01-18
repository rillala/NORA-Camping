<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import progressBar from '@/components/reserve/bannerStep.vue';

export default {
  components:{
    progressBar,
  }
};
</script>

<template>
  <section class="equipment">
  <progressBar :activeDiv="4"/>


  </section>
  
</template>

<style lang="scss" scoped>
</style>
