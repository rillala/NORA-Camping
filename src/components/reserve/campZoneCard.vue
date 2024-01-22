<!--用原本的設備各別卡片做修改-->

<script>
import addMinusBtn from '@/components/button/addMinusBtn.vue';

export default {
  components: {
    addMinusBtn,
  },
  props: {
    product: Object,
    quantity: Number,
    images: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quantity: 0, // 租借初始數量
      activeImageIndex: 0,
    };
  },
  methods: {
    getQuantity(newQuantity) {
      this.quantity = newQuantity;
      this.$emit('update-quantity', newQuantity);
    },
    nextImage() {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
    },
    prevImage() {
      this.activeImageIndex =
        (this.activeImageIndex - 1 + this.images.length) % this.images.length;
    },
  },
};
</script>

<template>
  <div class="set-rental-card">
    <!-- 輪播圖片框 -->
    <div class="carousel">
      <button class="carousel-button left" @click="prevImage">&#10094;</button>
      <div class="carousel-images">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          :alt="`Image ${index + 1}`"
          v-show="index === activeImageIndex"
        />
      </div>
      <button class="carousel-button right" @click="nextImage">&#10095;</button>
    </div>

    <!-- 商品標題 -->
    <h2 class="product-title">{{ title }}</h2>

    <!-- 商品價錢 -->
    <p class="product-price">價格: {{ price }}</p>

    <!-- 商品介紹 -->
    <div class="product-details">
      <p>{{ details }}</p>
    </div>
    <!-- 數量選擇器 -->
    <addMinusBtn :quantity="quantity" @update:quantity="getQuantity" />
  </div>
</template>

<style lang="scss"></style>

<!--
父層商品卡片測試: props傳資訊
 <ProductCard
 :images="productImages"
 :title="productTitle"
 :price="productPrice"
 :details="productDetails"
/>

-->
