<script>
export default {

  props: ['content'],
};

</script>

<template>
  <button class="Viewmore-btn" blue-3>
    <span class="h4">{{ content }}</span>
  </button>
</template>

<style lang="scss" scoped>
.Viewmore-btn {
  width: fit-content;
  min-width: 100px;
  height: 10vw;
  min-height: 20px;
  border-radius: 1000px;
  border: 1px solid;
  background-color: $brown-2;

  span {
    padding: 0 10px;
    font-size: 5vw;
    font-weight: bold;
  }

  @include tablet {
    max-width: 200px;
    height: 50px;
    max-height: 100px;

    span {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>