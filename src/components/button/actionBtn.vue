<script>
export default {
  props: ['content'],
};
</script>

<template>
  <button class="action-btn-01" blue-3>
    <span class="h4">{{ content }}</span>
  </button>
</template>

<style lang="scss" scoped>
.action-btn-01 {
  width: 200px;
  height: 50px;
  border-radius: 30px;
  border: 1px solid $blue-3;
  background-color: $blue-3;

  span {
    font-weight: bold;
  }
}

.action-btn-01:hover {
  color: $dark;
  border: 1px solid $dark;
  background-color: $blue-2;
}
</style>
