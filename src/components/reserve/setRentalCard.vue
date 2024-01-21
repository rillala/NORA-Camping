<script>
import addMinusBtn from '@/components/button/addMinusBtn.vue';

export default {
  components: {
    addMinusBtn,
  },
  props: {
    product: Object,
    quantity: Number,
  },
  data() {
    return {
      quantity: 0, // 租借初始數量
    };
  },
  methods: {
    getQuantity(newQuantity) {
      this.quantity = newQuantity;
    },
  },
};
</script>

<template>
  <div class="set-rental-card">
    <!-- 商品信息展示 -->
    <!-- ... -->
    <!-- 數量選擇器 -->
    <addMinusBtn
      :quantity="quantity"
      @update:quantity="$emit('update-quantity', $event)"
    />
  </div>
</template>

<style lang="scss"></style>
