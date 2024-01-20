<script setup>
import { RouterLink, RouterView } from 'vue-router';
import headerCom from '@/components/header.vue';
import footerCom from '@/components/footer.vue';
import backToTop from '@/components/button/backToTop.vue';
</script>

<template>
  <headerCom />
  <div id="app-content-wrap">
    <RouterView />
    <div id="app-sidebar">
      <backToTop id="app-top-btn" />
    </div>
  </div>
  <footerCom />
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app-content-wrap {
  position: relative;
}

#app-sidebar {
  position: absolute;
  top: 0;
  left: calc(90% - 50px);
  height: 100%;
  padding: 20px 0;
  z-index: 2;
}

#app-top-btn {
  position: sticky;
  top: 85svh;
}
</style>
