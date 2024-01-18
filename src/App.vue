<script setup>
import { RouterLink, RouterView } from 'vue-router';
import headerCom from '@/components/header.vue';
import footerCom from '@/components/footer.vue';
import backToTop from '@/components/button/backToTop.vue';
</script>

<template>
  <headerCom />
  <div id="content-wrap">
    <RouterView />
    <backToTop id="top-btn"/>
  </div>
  
  <footerCom />
  
</template>

<style lang="scss">
// body{
//   margin: 0;
//   padding: 0;
// }
#content-wrap{
  position: relative;
}

#top-btn{
  position: sticky;
  bottom: 15%;
  margin-bottom: 20px;
  left:calc(90% - 50px)
}
</style>
