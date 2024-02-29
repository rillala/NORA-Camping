<script>
import axios from 'axios';
import { useProductStore } from '@/stores/productStore'; // 用命名辦法 導入 Pinia Store
import { useCartStore } from '@/stores/cartStore';
import addMinusBtn from '@/components/button/addMinusBtn-shop.vue';
import ActionBtn from '@/components/button/actionBtn.vue';
import loading from '@/components/loading.vue';
import DropDownBtn from '@/components/button/dropDownBtn.vue';
import { getDBImage } from '@/assets/js/common';
import ProductSlider from '@/components/shop/productSlider.vue';

export default {
  components: {
    addMinusBtn,
    ActionBtn,
    loading,
    DropDownBtn,
    ProductSlider
  },

  data() {
    return {
      selectedQuantity: 0,
      currentIndex: 0,
      selectedColor: '',
      selectedSize: '',
    };
  },
  created() {
    // this.axiosGetDataId();
    const productStore = useProductStore();
    const pageId = this.$route.params.id; // 需要使用到 route 的部分, 要回到 .vue這裡定義
    productStore.axiosGetDataId(pageId); // 作為參數丟進去 pinia
  },
  computed: {
    // 使用 store 中的狀態
    responseData() {
      const productStore = useProductStore();
      return productStore.responseData;
    },
    nodata() {
      return Object.keys(this.responseData).length === 0;
    },
    colorOptions() {
      // 檢查是否有colors，並將其從字符串轉換為數組，如果沒有則返回一個只包含預設選項的數組
      return this.responseData.colors ? ['顏色', ...this.responseData.colors.split(',')] : ['顏色'];
    },
    sizeOptions() {
      // 同上，對sizes進行處理
      return this.responseData.sizes ? ['尺寸', ...this.responseData.sizes.split(',')] : ['尺寸'];
    },
  },
  watch: {},
  methods: {
    turntopage() { this.$router.replace({ name: 'shop' }) },
    handleQuantityUpdate(quantity) {
      // 接收數量更新事件
      this.selectedQuantity = quantity;
      // console.log('changed quantity: ' + this.selectedQuantity);
    },
    addIntoCart() {
      const cartStore = useCartStore();
      cartStore.addToCart(this.responseData.product_id, this.selectedQuantity, this.selectedColor, this.selectedSize);

    },
    addAndBuy() {
      const cartStore = useCartStore();
      cartStore.addToCart(this.responseData.product_id, this.selectedQuantity, this.selectedColor, this.selectedSize);
      this.$router.replace('/shopCar');
    },
    prevImage() {
      // 切換到前一張圖片
      this.currentIndex = (this.currentIndex - 1 + this.responseData.images.length) % this.responseData.images.length;
    },
    nextImage() {
      // 切換到下一張圖片
      this.currentIndex = (this.currentIndex + 1) % this.responseData.images.length;
    },

    getDBImage(images) {
      return getDBImage(images)
    },
    updateSelectedColor(e) {
      if (e && e.target) {
        this.selectedColor = e.target.value;
      }
    },
    updateSelectedSize(e) {
      if (e && e.target) {
        this.selectedSize = e.target.value;
      }
    },
  },
}
</script>

<template>
  <main class="shop-item-wrap">
    <div class="shop-item-banner">
      <img class="shop-banner-pic" src="/src/assets/image/shop/商城banner1.png" alt="">
      <svg class="shop-item-title ">
        <text x="50%" y="50%" dy=".35em" text-anchor="middle">
          NORA SHOP
        </text>
      </svg>
    </div>
   
    <div class="shop-item-container">
      <loading v-if="nodata"></loading>
      <div v-else class="shop-item-content">
        <!-- 該如何引進多張圖片，用icon做切換? -->
        <div class="shop-item-top">

          <div class="shop-item-images">
            <img v-if="responseData.images && responseData.images.length > 1" class="shop-arrow-icon" @click="prevImage"
              src="/src/assets/image/universe/left-arrow-btn.svg" alt="Previous Image">
            <div class="shop-item-imagesSlider">
              <img
                :src="getDBImage(responseData.images && responseData.images.length > 0 ? responseData.images[currentIndex] : '')"
                alt="Product Image" />
            </div>
            <img v-if="responseData.images && responseData.images.length > 1" class="shop-arrow-icon" @click="nextImage"
              src="/src/assets/image/universe/right-arrow-btn.svg" alt="Next Image">

          </div>

          <div class="shop-item-words">
            <h2>{{ responseData.title }}</h2>
            <h3>NT${{ responseData.price }}</h3>
            <addMinusBtn @update:quantity="handleQuantityUpdate"></addMinusBtn>
            <div class="shop-item-select">
              <DropDownBtn class="dropDown-select" v-if="colorOptions.length > 1" :options="colorOptions"
                @change="updateSelectedColor" :default-value="'顏色'"></DropDownBtn>

              <DropDownBtn class="dropDown-select" v-if="sizeOptions.length > 1" :options="sizeOptions"
                @change="updateSelectedSize" :default-value="'尺寸'"></DropDownBtn>


            </div>
            <div class="shop-item-actionBtns">
              <ActionBtn class="addCart-btn" @click.prevent="addIntoCart(responseData.product_id)" :content="'加購物車'">
              </ActionBtn>
              <ActionBtn @click.prevent="addAndBuy" :content="'直接購買'"></ActionBtn>

            </div>
          </div>
        </div>
        <section class="shop-item-intro">
          <div class="shop-intro-title">
            <h4>商品詳情</h4>
          </div>
          <p>{{ responseData.description }}</p>
        </section>
      </div>
    </div>
    <ProductSlider style="background-color: #c0a790; background-image: none;"></ProductSlider>
  </main>
</template>

<style lang="scss" scoped>
//banner 字體
@import url("https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap");

svg {
  font-family: "Spicy Rice", sans-serif;
  width: 100%;
  height: 100%;
}

svg text {
  animation: stroke 5s infinite alternate;
  stroke-width: 2;
  stroke: #C0A790;
  font-size: 40px;

  @include tablet{
    font-size: 64px;
  }
  @include desktop{
    font-size: 80px;
  }
}

@keyframes stroke {
  0% {
    fill: rgba(192, 167, 144, 0);
    stroke: rgba(192, 167, 144, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 2;
  }

  70% {
    fill: rgba(192, 167, 144, 0);
    stroke: rgba(192, 167, 144, 1);
  }

  80% {
    fill: rgba(192, 167, 144, 0);
    stroke: rgba(192, 167, 144, 1);
    stroke-width: 3;
  }

  100% {
    fill: rgba(192, 167, 144, 1);
    stroke: rgba(192, 167, 144, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

// ----------------------------------------------------------------
.shop-item-wrap {
  width: 100%;
  height: 100%;

  .shop-item-banner {
    position: relative;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		gap: 24px;
		width: 100%;
		height: 240px;
		overflow: hidden;

    .shop-banner-pic {
      width: 100%;
      height: 100%;
      aspect-ratio: 2000 / 1300;

      @include desktop {
        height: auto;
        aspect-ratio: 2000 / 480;
      }
    }

    .shop-item-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }


  .shop-item-container {
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 20px;


    .shop-item-content {
      display: flex;
      flex-flow: column;
      align-items: center;
      gap: 20px;
      width: 100%;

      .shop-item-top {
        display: flex;
        flex-flow: column;
        align-items: center;
        gap: 20px;
        text-align: center;


        .shop-item-words {
          display: flex;
          flex-flow: column;
          gap: 20px;
          align-items: center;

          .shop-item-select {
            display: flex;
            gap: 8px;
          }
        }

        @include desktop {
          text-align: left;
        }

        @include desktop {
          .shop-item-words {
            width: 50%;
            align-items: flex-start;
            gap: 40px;
          }
        }
      }

      @include desktop {
        .shop-item-top {
          display: flex;
          flex-flow: row;
          align-items: flex-start;
          gap: 40px;
        }

        .shop-item-images {
          width: 50%;
        }
      }

      .shop-item-images {
        display: flex;
        align-items: center;
        gap: 8px;

        .shop-arrow-icon {
          width: 50px;
          height: 50px;
        }

        .shop-item-imagesSlider {
          width: 100%;

          img {
            width: 80%;
            aspect-ratio: 1 / 1;
            vertical-align: middle;
            border: solid 5px $yellow-3;
            border-radius: 10px;
            @include tablet{
              width: 60%;
            }
            @include desktop{
              width: 80%;
            }
          }
        }
      }

      .shop-item-actionBtns {
        display: flex;
        gap: 8px;

        .addCart-btn {
          background-color: $blue-2;
        }
      }

      .shop-item-intro {
        width: 100%;
        background-color: $yellow-1;
        margin-top: 20px;
        border-radius: 20px;

        p {
          padding: 20px;
        }

        .shop-intro-title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          background-color: $yellow-2;
          border-radius: 20px 20px 0 0;

        }
      }
    }
  }

  @include desktop {
    .shop-item-container {
      max-width: 1200px;
      height: 100%;
      margin: auto;
      padding: 40px;
    }
  }
}</style>
