<script>
// 引入函式庫
import axios from 'axios';
import actionBtn from '@/components/button/actionBtn.vue';
import viewMoreBtn from '@/components/button/viewMoreBtn.vue';
import dogAnimation from '@/components/home/dogAnimation.vue';
import catAnimation from '@/components/home/catAnimation.vue';
import newsArticle from '@/components/home/newsArticle.vue';
import productCard from '@/components/shop/productCard.vue';
import { gsap } from 'gsap';
import { ref } from 'vue';


export default {
  components: {
    actionBtn,
    viewMoreBtn,
    dogAnimation,
    catAnimation,
    newsArticle,
    productCard,
  },
  data() {
    return {
      //banner動畫
      bannerMori: ['riverBg.png', 'riverBg.png'],
      bannerYama: ['mountainBg.png', 'mountainBg.png'],

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
      newsContent: [
        {
          newsTitle: '2024春季優惠開跑中',
          newsDate: '2024/1/24',
          newsText:
            '探險春季，NORA Camp誠摯邀請您攜帶心愛的寵物一同感受大自然的懷抱！透過我們獨家的「春季寵物露營樂享包」優惠，獲得精心準備的狗狗貓貓歡迎禮 包，內含美味零食、趣味玩具及特別的寵物地圖。優惠僅限春季特定日期，請提前預訂，確保您和寵物共享這春之樂。期待您們一家人一起加入NORA Camp的大家庭，享受春日露營的美好時光！',
          smalls: [
            { src: 'Camping_dog_lake.jpg', alt: '消息圖片1' },
            { src: 'knowingnora-pic.jpg', alt: '消息圖片2' },
            { src: 'shelter.jpg', alt: '消息圖片3' },
          ],
          large: { src: '', alt: '' },
        },
        {
          newsTitle: '營地設備維修公告',
          newsDate: '2024/1/10',
          newsText:
            '為提供更良好的露營體驗，我們即將進行狗狗專屬營區烤肉區設備的定期維修。維修時間為下週二上午9時至下午3時。在此期間，狗狗專屬營區的烤肉區域將無法使用。請見諒造成的不便。我們將盡快完成維修，以確保您和您的毛小孩在安全和愉快的環境中度過美好的露營時光。在維修期間，為確保您的安全，請勿進入烤肉區域。如有任何緊急需要使用烤肉設備的情況，請聯繫我們的服務人員，我們將協助您找到合適的解決辦法。感謝您的理解和支持。期待在維修完成後，為您呈獻一個更舒適、更便利的露營環境。如有任何疑問或需要進一步協助，請隨時與我們聯絡。',
          smalls: [],
          large: { src: '', alt: '' },
        },
      ],
    };
  },
  mounted() {
    this.Catin();
    this.Dogin();
    this.moriSlide();
    this.yamaSlide();
    // window.addEventListener('scroll', this.handleScroll);
    this.getWeather();
  },
  methods: {
    //banner的動畫
    getBannerImageUrl(paths) {
      return new URL(
        `../assets/image/homeView/animation/${paths}`,
        import.meta.url,
      ).href;
    },
    Catin() {
      // 取得 catAnimation 組件的 DOM 元素
      const catElement = this.$refs.cat.$el;
      //$el
      // 使用 GSAP 創建動畫
      gsap.from(catElement, {
        x: '100%', // 從右邊畫面外開始
        duration: 3, // 動畫時間(秒)
      });
    },
    Dogin() {
      const dogElement = this.$refs.dog.$el;
      gsap.from(dogElement, {
        x: '100%',
        duration: 1.8,
      });
    },
    moriSlide() {
      gsap.fromTo(
        this.$refs.moriSlider,
        { x: '-100%' },
        {
          x: '0%',
          duration: 25,
          ease: 'linear', //線性
          repeat: -1, //無限播放
        },
      ),
        gsap.fromTo(
          this.$refs.moriSlider,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
          },
        );
    },
    yamaSlide() {
      gsap.fromTo(
        this.$refs.yamaSlider,
        { x: '-100%' },
        {
          x: '0%',
          duration: 30,
          ease: 'linear',
          repeat: -1,
        },
      ),
        gsap.fromTo(
          this.$refs.moriSlider,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
          },
        );
    },

    //捲動偵測，想改用AOS做捲動的特效
    getScrollHeight() {
      return window.scrollY;
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
      // 使用 this.weatherMark拿data中的陣列
      const weatherImages = {
        晴: this.getWeatherImageUrl(this.weatherMark[0]),
        多雲: this.getWeatherImageUrl(this.weatherMark[1]),
        陰: this.getWeatherImageUrl(this.weatherMark[2]),
        雨: this.getWeatherImageUrl(this.weatherMark[3]),
      };

      // 如果 this.weather的內容在 weatherImages 中有對應的圖片，返回該路徑，否則返回預設圖片路徑
      return (
        weatherImages[this.weather] ||
        this.getWeatherImageUrl(this.weatherMark[0])
      );
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
    <catAnimation class="Cat" ref="cat" />
    <dogAnimation class="Dog" ref="dog" />
    <div class="Banner-background bg-blue-1">
      <div class="mori-slider">
        <img v-for="mori in bannerMori" :src="getBannerImageUrl(mori)" alt="Banner背景森林" ref="moriSlider" />
      </div>
      <div class="yama-slider">
        <img v-for="yama in bannerYama" :src="getBannerImageUrl(yama)" alt="Banner背景山" ref="yamaSlider" />
      </div>
    </div>
    <div class="Banner-ground"></div>
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
      <span>營地目前天氣</span>
      <img :src="getWeatherImage()" :alt="weather" v-show="weather !== ''" />
      <!-- weather不是空字串 -->
      <div id="Weather">{{ weather }}</div>
      <div id="AirTemperature">{{ airTemperature }}°C</div>
    </div>
  </section>

  <div id="nora-news"></div>
  <section class="News bg-blue-3">
    <div class="News-container">
      <div class="News-Title-search">
        <h3>野良露營 X 最新消息</h3>
        <div class="search-input">
          <input class="Search-bar" type="text" placeholder="搜尋關鍵字" v-model.trim="search" />
          <span v-if="search !== ''">正在搜尋：</span>{{ search }}
        </div>
      </div>
      <div class="News-viewport">
        <newsArticle class="News-article" v-for="(setArticle, index) in newsContent" :key="setArticle.newsTitle"
          :newsTitle="setArticle.newsTitle" :newsDate="setArticle.newsDate" :newsText="setArticle.newsText"
          :smalls="setArticle.smalls" v-model:large="setArticle.large" />
      </div>
    </div>
  </section>

  <section class="New-products bg-blue-2">
    <h2>野良選物X最新商品</h2>

    <!-- 桌機板左右按鈕 -->
    <div class="New-prod-btn">
      <div id="left" @click="moveLeft">
        <img src="@/assets/image/universe/left-arrow-btn.svg" alt="左按鈕">
      </div>
      <div id="right" @click="moveRight">
        <img src="@/assets/image/universe/right-arrow-btn.svg" alt="右按鈕">
      </div>
    </div>

    <div class="Prod-wapper">
      <div class="New-prod">
        <!-- 這裡先切樣子出來，後面會改成components取資料庫資料-->
        <div class="New-prod-image">
          <img src="@/assets/image/reserve/equipment/single8.png" alt="最新商品圖片" />
        </div>
        <h4>野良NORA折疊椅</h4>
        <p>NTD$900</p>
      </div>
      <div class="New-prod">
        <div class="New-prod-image">
          <img src="@/assets/image/reserve/equipment/single8.png" alt="最新商品圖片" />
        </div>
        <h4>野良NORA折疊椅</h4>
        <p>NTD$900</p>
      </div>
      <div class="New-prod">
        <div class="New-prod-image">
          <img src="@/assets/image/reserve/equipment/single8.png" alt="最新商品圖片" />
        </div>
        <h4>野良NORA折疊椅</h4>
        <p>NTD$900</p>
      </div>
      <div class="New-prod">
        <div class="New-prod-image">
          <img src="@/assets/image/reserve/equipment/single8.png" alt="最新商品圖片" />
        </div>
        <h4>野良NORA折疊椅</h4>
        <p>NTD$900</p>
      </div>
      <div class="New-prod">
        <div class="New-prod-image">
          <img src="@/assets/image/reserve/equipment/single8.png" alt="最新商品圖片" />
        </div>
        <h4>野良NORA折疊椅</h4>
        <p>NTD$900</p>
      </div>
      <div class="New-prod">
        <div class="New-prod-image">
          <img src="@/assets/image/reserve/equipment/single8.png" alt="最新商品圖片" />
        </div>
        <h4>野良NORA折疊椅</h4>
        <p>NTD$900</p>
      </div>
    </div>


    <router-link to="/shop">
      <viewMoreBtn class="See-more-prod" :content="'逛逛其他好物'" />
    </router-link>
  </section>

  <section class="Stray-home">
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

    <div class="SH-tent-container">
      <img src="@/assets/image/homeView/Tent_with_ground.png" alt="帳篷框">
    </div>

    <div class="Stray-home-background">
      <img src="@/assets/image/homeView/Stray_home_bg.png" alt="野良之家背景" />
      <div class="The-ground"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/page/homeView.scss';
</style>
