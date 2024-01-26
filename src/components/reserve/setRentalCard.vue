<script>
import addMinusBtn from '@/components/button/addMinusBtn.vue';

export default {
  components: {
    addMinusBtn,
  },
  props: {
    product: Object,
    quantity: Number,
    image: {
      type: String,
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
      // quantity: 0, // 租借初始數量
    };
  },
  methods: {
    getQuantity(newQuantity) {
      // this.quantity = newQuantity;
      this.$emit('update-quantity', newQuantity);
    },
    formatInfo(info) {
      const newInfo = info.split(',');
      let formatted = '';
      for (let i = 0; i < newInfo.length; i++) {
        formatted += `<span style="white-space: nowrap;">${newInfo[i]}</span>`;
        if (i < newInfo.length - 1) {
          formatted += ' | ';
        }
      }
      return formatted;
    },
    formatPrice(price) {
      return price.toLocaleString('en-US');
    },
  },
};
</script>

<template>
  <div class="set-rental-card bg-blue-2">
    <!-- 單一圖片顯示 -->
    <div class="product-image">
      <img :src="image" :alt="title" />
    </div>

    <div class="top">
      <p class="product-title dark">{{ title }}</p>
      <p class="product-price dark">${{ formatPrice(price) }}/次</p>
    </div>

    <!-- 商品介紹 -->
    <div class="product-details dark">
      <p class="tinyp" v-html="formatInfo(details)"></p>
    </div>
    <!-- 數量選擇器 -->
    <div class="box">
      <addMinusBtn
        :quantity="quantity"
        @update:quantity="getQuantity"
        class="btn"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$padding: 15px; // 定義外層padding

.set-rental-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: $radius;
  padding: $padding;
  display: flex;
  flex-direction: column;

  .product-image {
    width: 100%;
    max-height: 50svh;
    border: 5px solid $white01;
    border-radius: $radius - $padding;
    overflow: hidden;

    @include tablet {
      // height: 230px;
    }

    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: cover;
      object-position: middle;
    }
  }
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  @include tablet {
    margin: 10px;
  }
  .product-title {
    @include font-style(20px, 700, 10%, 125%);

    @include tablet {
      @include font-style(24px, 700, 10%, 125%);
    }

    @include desktop {
      @include font-style(20px, 700, 10%, 125%);
    }
  }
  .product-price {
    font-weight: bold;
    @include desktop {
      @include font-style(16px, 700, 10%, 125%);
    }
  }
}

.product-details {
  margin: -5px 5px 10px;

  @include tablet {
    margin: 0 10px 15px;
  }

  @include desktop {
    margin: 0 10px 10px;
  }
}
.box {
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  align-items: end;
}
</style>
