<script>
// 引入函式庫
import axios from 'axios';

export default {
  data() {
    return {
      count: 10,
      sourceData: [],
      search: '',
      displayData: [],
    }
  },
  computed: {
    productCount() {
      return Array.isArray(this.displayData) ? this.displayData.length : 0;
    },
    loading() {
      return this.sourceData.length === 0;
    },
    nodata() {
      return this.productCount === 0;
    }
  },
  created() {
    //建立好vue實體=>可以呼叫vue 裡面的東西
    this.fetchData();

  },
  mounted() {//以渲染dom物件，如果使用第三方gsap

  },
  methods: {//用fetch將json 檔案匯入
    fetchData() {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(json => {
          // console.log(json)
          this.sourceData = json
          this.displayData = json
        })
    },
    handleInput() {
      this.displayData = this.sourceData.filter((item) => {
        return item.title.includes(this.search)
      })
    }
  }
}


</script>

<template>
  <div class="shop-all-wrap">
    <div class="shop-all-container">
      <div class="shop-all-banner">
        <h2>歡慶Nora商城開幕!!!</h2>
        <input type="text" v-model.trim="search" @input="handleInput" class="shop-searchbar">
      </div>
      <div class="shop-filter">

        <label for="type"></label>
        <select name="type" id="type">
          <option value="">選擇類別</option>
          <option value="">Nora文青生活</option>
          <option value="">Nora品牌服飾</option>
          <option value="">Nora營地用品</option>
        </select>
        <label for="rank"></label>
        <select name="rank" id="rank">
          <option value="">選擇排序</option>
          <option value="">價格高到低</option>
          <option value="">價格低到高</option>
        </select>
      </div>  
      <ul class="shop-all-list">
        <li v-for="item in displayData" ::key="item.id" class="shop-all-card">
          <img loading="lazy" :src="item.image" :alt="item.title">
          <article class="shop-card-content">
            <p class="shop-card-title">{{ item.title }}</p>
            <p class="shop-card-price">${{ item.price }}</p>
            <span v-for="num in parseInt(item.rating.rate)">★</span>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-all-wrap {
  width: 100%;
  height: 100%;
  background-color: $blue-1;

  .shop-all-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 20px;
    .shop-all-banner{
      width: 100%;
      height: 200px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      background-color: $blue-3;
      border-radius: 30px;
      
      .shop-searchbar{
        width: 200px;
      }
    }

    .shop-all-list {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      margin-top: 20px;
      @include desktop {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }

      .shop-all-card {
        display: flex;
        flex-flow: column;
        gap: 20px;
        width: 100%;
        height: 100%;
        padding: 16px;
        aspect-ratio: 285 / 340;
        border: 2px solid $dark-gray;
        border-radius: 50px;
        background-color: #fff;

        img {
          width: 100%;
          aspect-ratio: 1/1;
          padding: 16px;
          border: 2px solid $dark-gray;
          border-radius: 45px;
        }

        .shop-card-title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }

  @include tablet {
    .shop-all-list {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  @include desktop {
    .shop-all-container {
      max-width: 1200px;
    }
  }
}</style>
