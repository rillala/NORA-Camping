<script>
export default {
  name: 'addMinusBtn',
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    add() {
      this.quantity++;
      this.$emit('update:quantity', this.quantity);
    },
    minus() {
      if (this.quantity > 0) {
        this.quantity--;
        this.$emit('update:quantity', this.quantity);
      }
    },
    getImageUrl(paths) {
      return new URL(`../../assets/image/${paths}`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <div class="quantity-btn">
    <button @click="minus" class="minus bg-blue-2">
      <div class="minus-icon bg-blue-4"></div>
    </button>

    <div class="box">
      <p class="blue-4">{{ quantity }}</p>
    </div>

    <button @click="add" class="add bg-blue-2">
      <div class="minus-icon bg-blue-4"></div>
      <div class="add-icon bg-blue-4"></div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.quantity-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 235px;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid $blue-4;
  .minus-icon {
    width: 20px;
    height: 3px;
    border-radius: 2px;
  }
  .add-icon {
    position: absolute;
    translate: 90deg;
    width: 3px;
    height: 20px;
    border-radius: 2px;
  }
}
.box {
  width: 110px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $white01;
  border-radius: $radius;
  margin: 0 20px;
  p {
    @include font-style(28px, 700, 10%, auto);
  }
}
</style>

<!--使用方法:
    <template>
  //其他代碼 //
  <YourQuantitySelectorComponent @update:quantity="handleQuantityChange" />
  //其他代碼 //
</template>

<script>
import YourQuantitySelectorComponent from '@/components/YourQuantitySelectorComponent.vue';

export default {
  components: {
    YourQuantitySelectorComponent,
  },
  methods: {
    handleQuantityChange(newQuantity) {
      console.log('新的數量是：', newQuantity);
      // 你可以在這裡進行其他處理，比如更新數據等
    },
  },
};
</script>

-->
