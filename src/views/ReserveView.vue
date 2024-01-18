<script>
// 引入函式庫
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
// import progressBar from '@/components/reserve/bannerStep.vue';
import equipmentPage from '@/views/reserve/EquipmentView.vue';

export default {
  components:{
    // progressBar,
    equipmentPage,
  }
};
</script>

<template>
  <section class="equipment">
  <!--暫時把租借設備頁面導進來這頁開發-->
  <equipmentPage />
  <!-- <progressBar :activeDiv="1"/> -->

 



  </section>
  
</template>

<style lang="scss" scoped>
</style>
