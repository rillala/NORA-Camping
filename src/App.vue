<script setup>
import { RouterLink, RouterView } from 'vue-router';
import headerCom from '@/components/header.vue';
import footerCom from '@/components/footer.vue';
</script>

<template>
  <headerCom />
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/reserve">LinkTest</RouterLink>
    </nav>
  </header>
  
  <RouterView />
  <footerCom />
</template>

<style lang="scss">
</style>
