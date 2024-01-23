<template>
  <div class="notFound">
    <h1>404<span class="h4"> Not Found</span></h1>
    <img
      :src="getImageUrl('headerFooter/logo-mobile-dark.png')"
      :alt="noracamping"
    />

    <button @click="goHome" class="p dark">回到首頁</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({
        name: 'home',
      });
    },
    getImageUrl(paths) {
      return new URL(`../assets/image/${paths}`, import.meta.url).href;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: $dark;
  text-align: center;
  margin: 20px auto;
}
img {
  display: block;
  width: 70%;
  max-width: 300px;
  margin: 0 auto 20px;
}

button {
  display: block;
  background: $blue-2;
  padding: 10px 30px;
  border: none;
  border-radius: $radius;
  margin: 0 auto 20px;
  transform: 0.3s ease-in-out;
  &:hover {
    color: $white01;
    background: $blue-4;
  }
}
</style>
