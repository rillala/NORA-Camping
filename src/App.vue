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
    <div id="sidebar"><backToTop id="top-btn"/></div>
    
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

#sidebar{
  position: absolute;
  top: 0;
  left:calc(90% - 50px);
  height: 100%;
  padding: 20px 0;
  z-index:2;
}

#top-btn{
  position: sticky;
  top: 85svh;  
}
</style>
