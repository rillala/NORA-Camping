<script>
import axios from 'axios';
import { useProductStore } from '@/stores/productStore'; // 用命名辦法 導入 Pinia Store
import { useCartStore } from '@/stores/cartStore';
import addMinusBtn from '@/components/button/addMinusBtn-shop.vue';
import ActionBtn from '@/components/button/actionBtn.vue';
import loading from '@/components/loading.vue';
import DropDownBtn from '@/components/button/dropDownBtn.vue';
import { getDBImage } from '@/assets/js/common';


export default {
  components: {
    addMinusBtn,
    ActionBtn,
    loading,
    DropDownBtn
  },


  data() {
    return {
      selectedQuantity: 0,
      currentIndex: 0,//還沒用到，如果多張圖片可能用到
      selectColor: ['顏色', '黑色', '白色', '綠色', '藍色'],
      selectSize: ['尺寸', 'XS', 'S', 'M', 'L', 'XL'],
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
    async addIntoCart() {
      const cartStore = useCartStore();
      await cartStore.addToCart(this.responseData.product_id, this.selectedQuantity);
      alert('商品已加入購物車')
    },
    async addAndBuy() {
      const cartStore = useCartStore();
      await cartStore.addToCart(this.responseData.product_id, this.selectedQuantity);
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
    handleSelection(type) {

      // 未完成，需要將所選擇的size和color放到購物車結帳，在存入資料庫
      if (type === '黑色') {
        console.log('黑色')
      } else if (type === '白色') {
        console.log('白色');
      } else if (type === '綠色') {
        console.log('綠色');
      } else if (type === '藍色') {
        console.log('藍色');
      } else if (type === 'XS') {
        console.log('XS');
      } else if (type === 'S') {
        console.log('S');
      } else if (type === 'M') {
        console.log('M');
      } else if (type === 'L') {
        console.log('L');
      } else if (type === 'XL') {
        console.log('XL');
      }
    },
    getDBImage(images) {
      return getDBImage(images)
    }
  },
}
</script>

<template>
  {{ this.responseData }}
  <main class="shop-item-wrap">
    <div class="shop-item-container">
      <loading v-if="nodata"></loading>
      <div v-else class="shop-item-content">
        <!-- 該如何引進多張圖片，用icon做切換? -->
        <div class="shop-item-top">

          <div class="shop-item-images">
            <img v-if="responseData.images.length > 1" class="shop-arrow-icon" @click="prevImage"
              src="/src/assets/image/universe/left-arrow-btn.svg" alt="Previous Image">
            <div class="shop-item-imagesSlider">
              <img :src="getDBImage(responseData.images[currentIndex])" alt="Product Image" />
            </div>
            <img v-if="responseData.images.length > 1" class="shop-arrow-icon" @click="nextImage"
              src="/src/assets/image/universe/right-arrow-btn.svg" alt="Next Image">
          </div>

          <div class="shop-item-words">
            <h2>{{ responseData.title }}</h2>
            <h3>NT${{ responseData.price }}</h3>
            <addMinusBtn @update:quantity="handleQuantityUpdate"></addMinusBtn>
            <div class="shop-item-select">
              <DropDownBtn v-if="colorOptions.length > 1" :options="colorOptions" @change="handleSelection" :default-value="'顏色'"></DropDownBtn>
              <DropDownBtn v-if="sizeOptions.length > 1" :options="sizeOptions" @change="handleSelection" :default-value="'尺寸'"></DropDownBtn>

            </div>
            <div class="shop-item-actionBtns">
              <ActionBtn class="addCart-btn" @click.prevent="addIntoCart(responseData.id)" :content="'加購物車'"></ActionBtn>
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
        <div class="shop-item-rec">Nora 推薦加購</div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.shop-item-wrap {
  width: 100%;
  height: 100%;

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
            width: 100%;
            aspect-ratio: 1 / 1;
            vertical-align: middle;
            border: solid 5px $yellow-3;
            border-radius: 10px;
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
}
</style>
