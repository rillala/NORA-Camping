<script>
// 引入函式庫
import axios from 'axios';
import apiInstance from '@/plugins/auth';
import actionBtn from '@/components/button/actionBtn.vue';
import viewMoreBtn from '@/components/button/viewMoreBtn.vue';
import bannerAnimation from '@/components/home/bannerAnimation.vue';
import dogAnimation from '@/components/home/dogAnimation.vue';
import catAnimation from '@/components/home/catAnimation.vue';
import newsArticle from '@/components/home/newsArticle.vue';
import productCard from '@/components/shop/productCard.vue';
import { gsap } from 'gsap';
import { getDBImage } from '@/assets/js/common';
import ProductSlider from '@/components/shop/productSlider.vue';
import { useProductStore } from '@/stores/productStore'; // 導入 Pinia Store

export default {
  components: {
    actionBtn,
    viewMoreBtn,
    bannerAnimation,
    dogAnimation,
    catAnimation,
    newsArticle,
    productCard,
    ProductSlider,
  },
  data() {
    return {
      //時鐘
      currentTime: '',
      //天氣和溫度
      weather: '',
      airTemperature: '',
      //天氣圖片
      weatherMark: [
        'hare.png',
        'hare_kumori.png',
        'kumori.png',
        'kumori_ame.png',
        'umbrella.png',
        'kaminari.png',
      ],

      //最新消息搜尋和內容
      search: '',
      // newsContent: [
      //   {
      //     newsTitle: '',
      //     newsDate: '',
      //     newsText:
      //       '',
      //     small1: { src: '', alt: '消息圖片1' },
      //     small2: { src: '', alt: '消息圖片2' },
      //     small3: { src: '', alt: '消息圖片3' },
      //     large: { src: '', alt: '' },
      //   },
      // ],
      newsList: [], //放資料庫的資料
      searchList: [], //搜尋後顯示資料
      newProds: [
        {
          prodPicSrc: 'single8.png',
          prodPicAlt: '商品圖片',
          prodTitle: '野良NORA折疊椅',
          prodPrice: 'NTD$900',
        },
        {
          prodPicSrc: 'single8.png',
          prodPicAlt: '商品圖片',
          prodTitle: '野良NORA折疊椅',
          prodPrice: 'NTD$900',
        },
        {
          prodPicSrc: 'single8.png',
          prodPicAlt: '商品圖片',
          prodTitle: '野良NORA折疊椅',
          prodPrice: 'NTD$900',
        },
        {
          prodPicSrc: 'single8.png',
          prodPicAlt: '商品圖片',
          prodTitle: '野良NORA折疊椅',
          prodPrice: 'NTD$900',
        },
        {
          prodPicSrc: 'single8.png',
          prodPicAlt: '商品圖片',
          prodTitle: '野良NORA折疊椅',
          prodPrice: 'NTD$900',
        },
        {
          prodPicSrc: 'single8.png',
          prodPicAlt: '商品圖片',
          prodTitle: '野良NORA折疊椅',
          prodPrice: 'NTD$900',
        },
      ],
      curIndex: 0,
      slideWidth: 300,
    };
  },
  mounted() {
    this.updateTime();
    // 每秒更新一次時間
    this.timer = setInterval(this.updateTime, 1000);
    //觸發天氣API
    this.getWeather();
    //觸發章節觀察
    this.sectionObserve();
    //觸發最新消息讀取資料庫
    this.getNewsPhp();
    //獲得商品列
    const productStore = useProductStore();
    productStore.axiosGetData();
  },
  computed: {
    wrapLeft() {
      return `-${this.curIndex * this.slideWidth}px`;
    },
  },
  methods: {
    //時鐘
    updateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString();
      const day = now.getDate().toString();
      const hour = now.getHours().toString().padStart(2, '0');
      const minute = now.getMinutes().toString().padStart(2, '0');
      const second = now.getSeconds().toString().padStart(2, '0');

      this.currentTime = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    },
    //串接氣象API取得資料
    async getWeather() {
      try {
        let result = await fetch(
          'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-FA772AA0-8D0C-4FEF-B569-7DE1EEF2453D',
        );
        let data = await result.json();

        this.weather = data.records.Station[9].WeatherElement.Weather;
        this.airTemperature = Math.round(
          data.records.Station[9].WeatherElement.AirTemperature,
        );
        //數據取得第9筆的天氣和溫度
      } catch (e) {
        console.log(e);
      }
    },
    //天氣圖片路徑
    getWeatherImageUrl(paths) {
      return new URL(
        `../assets/image/homeView/weatherMark/${paths}`,
        import.meta.url,
      ).href;
    },
    //顯示對應天氣圖片
    getWeatherImage() {
      switch (true) {
        case this.weather.includes('晴'):
          return this.getWeatherImageUrl(this.weatherMark[0]);
        case this.weather.includes('多雲'):
          return (
            this.getWeatherImageUrl(this.weatherMark[1]) ||
            this.getWeatherImageUrl(this.weatherMark[0])
          );
        case this.weather.includes('陰'):
        case this.weather.includes('靄'):
        case this.weather.includes('霧'):
          return (
            this.getWeatherImageUrl(this.weatherMark[2]) ||
            this.getWeatherImageUrl(this.weatherMark[0])
          );
        case this.weather.includes('雨'):
          return (
            this.getWeatherImageUrl(this.weatherMark[3]) ||
            this.getWeatherImageUrl(this.weatherMark[0])
          );
        default:
          // 如果沒有匹配的天氣條件，返回預設圖片路徑
          return this.getWeatherImageUrl(this.weatherMark[0]);
      }
    },

    //讀取最新消息
    getNewsPhp() {
      apiInstance
        .get('./getNewsForHomeView.php')
        .then(response => {
          this.newsList = response.data;
          this.searchList = this.newsList;
          // this.newsContent = response.data;
          console.log(this.newsList);
          console.log(this.searchList);
          // console.log(this.newsContent);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    //最新消息搜尋
    handleSearch() {
      if (this.search === '') {
        this.newsList = this.searchList;
      } else {
        this.newsList = this.searchList.filter(setArticle => {
          //搜尋範圍包含標題和內文
          return (
            setArticle.title.includes(this.search) ||
            setArticle.content.includes(this.search)
          );
        });
      }
    },

    //最新消息圖片路徑
    getDBImage(paths) {
      // console.log(paths);
      return getDBImage(paths);
    },

    //暫時借用的圖片路徑
    getNewProdImageUrl(paths) {
      return new URL(
        `../assets/image/reserve/equipment/${paths}`,
        import.meta.url,
      ).href;
    },
    //最新商品往左往右
    moveLeft() {
      this.curIndex--;
      console.log(this.curIndex);
    },
    moveRight() {
      this.curIndex++;
      console.log(this.curIndex);
    },
    //貓狗的動畫
    Catin() {
      // 取得 catAnimation 組件的 DOM 元素
      const catElement = this.$refs.cat.$el;
      //$el是訪問 Vue conponent 裡面元素的方法
      // 使用 GSAP 創建動畫
      gsap.to(catElement, {
        x: '-81%', // 從右邊畫面外開始
        duration: 3, // 動畫時間(秒)
      });
    },
    Dogin() {
      const dogElement = this.$refs.dog.$el;
      gsap.to(dogElement, {
        x: '-75%',
        duration: 1.8,
      });
    },
    //野良之家章節觀察
    sectionObserve() {
      const options = {
        root: null, // 根節點，null表示整個視窗
        threshold: 0.5, // 可見比例大於50%時觸發回調
      };
      //IntersectionObserver 觀察API
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 如果部分進入視窗，執行相應的邏輯
            this.handleSectionIntersection(entry.target);
          }
        });
      }, options);

      //開始觀察
      observer.observe(this.$refs.shelter);
    },
    //觀察動作
    handleSectionIntersection(section) {
      // 根據進入視窗的部分執行指定程式
      if (section === this.$refs.shelter) {
        // 當捲動到section3時執行特定程式
        // console.log("已捲動到野良之家");
        this.Catin();
        this.Dogin();
      }
    },
  },
  watch: {
    search(newSearch, oldSearch) {
      console.log(this.search);
      console.log('new:' + newSearch);
      console.log('old:' + oldSearch);
    },
    responseData: {
      handler(newcData) {
        console.log(newcData.length);
      },
      //如果畫面一開始就要監聽設定成true
      // immediate: true
      //如果監聽陣列或物件用設定成true
      deep: true,
    },
  },
  beforeUnmount() {
    //卸載時消除計時器
    clearInterval(this.timer);
  },
};
</script>

<template>
  <section class="Homepage-banner">
    <div class="Banner-text">
      <h1>
        願那些流浪，<br />
        只是體驗而已。<br />
        走吧，去露營！
      </h1>
      <router-link to="/reserve">
        <actionBtn class="Reserve-Now" :content="'立即預約'" />
      </router-link>
    </div>

    <div class="Banner-background bg-blue-1">
      <bannerAnimation />
    </div>
  </section>

  <section class="Knowing-nora" ref="knowingNora">
    <div class="KN-mountain-background">
      <img src="@/assets/image/homeView/mountainBgL.png" class="Mountain-left" />
      <img src="@/assets/image/homeView/mountainBgR.png" class="Mountain-right" />
    </div>
    <div class="KN-content">
      <div class="KN-text">
        <h3>認識野良</h3>
        <img class="paw1" src="@/assets/image/campGuide/paw.svg" alt="動物腳掌1" />
        <p>
          "野良" 這一詞在日文中指流浪動物，
          我們將這一概念融入露營體驗中，創造出一個充滿活力和溫馨的環境。
          在這裡，露營者可以根據自己的喜好選擇狗派或貓派，
          從而決定所需的露營道具和行程安排。
          野良露營致力於為露營愛好者提供一個獨特且充滿愛心的露營體驗，
          不僅讓人們更接近大自然，也讓流浪動物得到關愛和新家。
          我們期待創造出一個既有趣又有意義的露營文化 。
        </p>
      </div>
      <div class="KN-img-contanier">
        <img src="@/assets/image/homeView/knowingnora-pic.jpg" />
      </div>
    </div>
    <div class="KN-weather-box">
      <div class="time-box">
        <span>營地目前天氣</span>
        <p>{{ currentTime }}</p>
      </div>
      <img :src="getWeatherImage()" :alt="weather" v-show="weather !== ''" />
      <!-- weather不是空字串 -->
      <div id="Weather">{{ weather }}</div>
      <div id="AirTemperature">{{ airTemperature }}°C</div>
    </div>
  </section>

  <section class="News bg-yellow-2">
    <div class="News-container">
      <div class="News-Title-search">
        <h3>野良露營 X 最新消息</h3>
        <div class="search-input">
          <input class="Search-bar" type="text" placeholder="搜尋關鍵字" v-model.trim="search" @input="handleSearch" />
          <span v-if="search !== ''">正在搜尋：{{ search }}</span>
        </div>
      </div>
      <!-- <div class="News-viewport">
        <newsArticle class="News-article" v-for="(setArticle, index) in newsContent" :key="setArticle.newsTitle"
      <div class="News-viewport">
        <newsArticle v-for="(setArticle, index) in newsContent" :key="setArticle.newsTitle"
          :newsTitle="setArticle.newsTitle" :newsDate="setArticle.newsDate" :newsText="setArticle.newsText"
          :small1="setArticle.small1" :small2="setArticle.small2" :small3="setArticle.small3"
          v-model:large="setArticle.large" />
      </div> -->

      <div class="News-viewport">
        <newsArticle class="News-article" v-for="(setArticle, index) in newsList" :key="index" :title="setArticle.title"
          :publish_date="setArticle.publish_date" :content="setArticle.content" :img1="setArticle.img1"
          :img2="setArticle.img2" :img3="setArticle.img3" v-model:large="setArticle.large" />
      </div>
    </div>
  </section>

  <section class="New-products bg-brown-2">
    <!-- <h2>野良選物X最新商品</h2> -->
    <!-- 桌機板左右按鈕 -->
    <!-- <div class="New-prod-btn">
      <button id="left" @click="moveLeft" :disabled="curIndex <= 0">
        <img src="@/assets/image/universe/left-arrow-btn.svg" alt="左按鈕">
      </button>
      <button id="right" @click="moveRight" :disabled="curIndex >= 2">
        <img src="@/assets/image/universe/right-arrow-btn.svg" alt="右按鈕">
      </button>
    </div> -->
    <!-- 抓axios後的商品資料陣列 -->
    <!-- <div class="Prod-wapper" :style="{ left: wrapLeft }">
      <div class=" New-prod" v-for=" prods  in  newProds ">
        <div class="New-prod-image">
          <img :src="getNewProdImageUrl(prods.prodPicSrc)" :alt="prods.prodPicSrc" />
        </div>
        <h4>{{ prods.prodTitle }}</h4>
        <p>{{ prods.prodPrice }}</p>
      </div>
    </div> -->

    <ProductSlider></ProductSlider>
    <!-- <router-link to="/shop">
      <viewMoreBtn class="See-more-prod" :content="'逛逛其他好物'" />
    </router-link> -->
  </section>

  <section class="Stray-home" ref="shelter">
    <div class="Stray-home-content">
      <div class="SH-text">
        <h2>野良之家</h2>
        <img class="paw1" src="@/assets/image/campGuide/paw.svg" alt="動物腳掌1" />
        <p>
          野良露營也是流浪動物的中途之家。 我們致力於照顧、
          庇護和尋找新的家園給需要幫助的流浪動物 我們提供免費的志工活動，
          一同為這些可愛的生命奉獻愛心。 志工活動包括洗狗、打掃籠舍、餵食等，
          讓你有機會親身參與流浪動物的照顧，
          同時建立起與這些可愛生物的深厚連結。
        </p>
        <div class="SH-btn">
          <router-link to="/shelter">
            <viewMoreBtn class="SH-btn1" :content="'了解更多'" />
          </router-link>
          <router-link to="/shelter">
            <actionBtn class="SH-btn1" :content="'報名志工活動'" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="Stray-home-background">
      <img src="@/assets/image/homeView/Stray_home_bg.png" alt="野良之家背景" />
      <catAnimation class="Cat" ref="cat" />
      <dogAnimation class="Dog" ref="dog" />
      <div class="The-ground"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/homeView.scss';
</style>
