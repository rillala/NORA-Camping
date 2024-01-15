<script setup>
import { RouterLink, RouterView } from "vue-router";
import headerCom from '@/components/header.vue'
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
</template>

<style lang="scss">
@use "@/assets/sass/style.scss"
</style>
