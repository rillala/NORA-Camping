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
  <div class="quantity-btn bg-white01">
    <button @click="minus" class="minus bg-dark-gray">
      <div class="minus-icon bg-dark"></div>
    </button>

    <div class="box">
      <p class="dark">{{ quantity }}</p>
    </div>

    <button @click="add" class="add bg-dark-gray">
      <img :src="getImageUrl('universe/add-btn.png')" alt="add" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.quantity-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 50px;
  border: 1px solid $dark-gray;
  border-radius: $radius;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  .minus-icon {
    width: 10px;
    height: 2px;
  }
}
.box {
  width: 40px;
  text-align: center;
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
