<script>
export default {
  props: ['content'],
};
</script>

<!-- 新增點擊事件的emit -->
<!-- 導入元件後，在頁面上新增所需的事件 
<actionBtn :content="'buttonContent'" @clickEvent="要執行的fuction" />
-->
<script setup>
const emit = defineEmits([
  'clickEvent'
]);
</script>

<template>
  <button class="action-btn-01" blue-3 @click="emit('clickEvent')">
    <span>{{ content }}</span>
  </button>
</template>

<style lang="scss" scoped>
.action-btn-01 {
  width: fit-content;
  height: 10vw;
  min-height: 20px;
  border-radius: 1000px;
  border: 1px solid $blue-3;
  background-color: $blue-3;

  span {
    font-size: 5vw;
    font-weight: bold;
  }

  @include tablet {
    max-width: 200px;
    height: 50px;
    max-height: 100px;

    span {
      padding: 0 10px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
