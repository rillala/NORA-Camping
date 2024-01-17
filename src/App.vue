<script setup>
import { RouterLink, RouterView } from 'vue-router';
import headerCom from '@/components/header.vue';
import footerCom from '@/components/footer.vue';
</script>

<template>
  <headerCom />
  <RouterView />
  <footerCom />
</template>

<style lang="scss">
// body{
//   margin: 0;
//   padding: 0;
// }
</style>
