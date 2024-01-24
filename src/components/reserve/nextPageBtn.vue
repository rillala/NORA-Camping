<script>
export default {
  props: ['text', 'path'],
};
</script>

<template>
  <div class="next">
    <RouterLink :to="path" id="confirm-btn" class="white01 bg-blue-3">{{
      text
    }}</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.next {
  width: 100%;
  padding: 10px 0 20px;
  @include desktop {
    margin: 0 auto 40px;
  }
}

#confirm-btn {
  width: 280px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $radius;

  text-decoration: none;
  text-align: center;
  @include font-style(24px, 700, 1%, 125%);

  @include tablet {
    width: 600px;
    height: 75px;
    @include font-style(32px, 700, 1%, 125%);
  }
}
</style>
