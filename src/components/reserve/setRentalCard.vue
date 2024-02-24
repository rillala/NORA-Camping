<script>
export default {
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
  methods: {
    formatInfo(info) {
      const newInfo = info.split(',');
      let formatted = '';
      for (let i = 0; i < newInfo.length; i++) {
        formatted += `<span class="explain">${newInfo[i]}</span>`;
        if (i < newInfo.length - 1) {
          formatted += ' | ';
        }
      }
      return formatted;
    },
    formatPrice(price) {
      return price.toLocaleString('en-US');
    },
    getImageUrl(paths) {
      return new URL(`../../assets/image/${paths}`, import.meta.url).href;
    },

    // 按鈕數量相關

    add() {
      this.$emit('add-rentNum');
    },
    minus() {
      if (this.quantity > 0) {
        this.$emit('minus-rentNum');
      }
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
      <div class="btn quantity-btn">
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
    // height: 300px;
    max-height: 50svh;
    background: $white01;
    border: 5px solid $white01;
    border-radius: $radius - $padding;
    overflow: hidden;

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

.quantity-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 235px;
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
}
</style>
