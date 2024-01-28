<script>
// 引入函式庫
import axios from 'axios';
import actionBtn from '@/components/button/actionBtn.vue';
import viewMoreBtn from '@/components/button/viewMoreBtn.vue';
import productCard from '@/components/shop/productCard.vue';

export default {
  components: {
    actionBtn,
    viewMoreBtn,
    productCard,
  },
  data() {
    return {
      animals: [
        { src: "camp_tent_maru" },
        { src: "camp_tent" },
        { src: "cat_koubakozuwari_gray" },
        { src: "cat_kuroashineko" },
        { src: "dog_akitainu" },
        { src: "dog_corgi_tricolor" },
        { src: "kagu_camp_chair" },
        { src: "neko_ushiro" },
        { src: "takibi" },
        { src: "youkai_jinmenken" },
      ],
      weathers: [
        "hare",
        "hare_kumori",
        "kumori_ame",
        "kumori"
      ],
      search: '',

    };
  },
  mounted() {
    async function weather() {
      try {
        let result = await fetch('https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-FA772AA0-8D0C-4FEF-B569-7DE1EEF2453D')
        let data = await result.json();
        console.log(data);
        const locationWeather = data.records.Station[9].WeatherElement.Weather;
        const airTemperature = data.records.Station[9].WeatherElement.AirTemperature;
        let wea = document.querySelector(`#Weather`).innerHTML = locationWeather;
        let tem = document.querySelector(`#AirTemperature`).innerHTML = airTemperature + "°C";

      } catch (e) {
        console.log(e);
      }
    }
    weather();
  },
  methods: {
    getAnimalUrl(paths) {
      return new URL(`../assets/image/homeView/animalMarquee/${paths}`, import.meta.url).href
    },
    getweatherUrl(paths) {
      return new URL(`../assets/image/homeView/weatherMark/${paths}`, import.meta.url).href
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
  <main>

    <section class="Homepage-banner ">
      <div class="Banner-text">
        <h1>
          願那些流浪，<br>
          只是體驗而已。<br>
          走吧，去露營！
        </h1>
        <actionBtn class="Reserve-Now" :content="'立即預約'" />
      </div>

      <div class="Banner-background bg-blue-2">

        <!-- <div class="Animal-marquee-contanier">
          <img v-for="picsrc in animals" :src="getAnimalUrl(`${picsrc.src}.png`)" />
        </div> -->
      </div>

    </section>

    <section class="Knowing-nora">
      <div class="KN-mountain-background">
        <img src="@/assets/image/homeView/mountainBgL.png" class="Mountain-left">
        <img src="@/assets/image/homeView/mountainBgR.png" class="Mountain-right">
      </div>
      <div class="KN-content">
        <div class="KN-text">
          <h3>認識野良</h3><img class="paw1" src="@/assets/image/campGuide/paw.svg" alt="動物腳掌1">
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
      <div class="KN-weather-box ">
        <span>營地目前天氣</span>
        <div id="Weather"></div>
        <div id="AirTemperature"></div>
      </div>
    </section>

    <section class="News bg-blue-3">

      <div class="News-container">
        <div class="News-Title-search">
          <h3>最新消息</h3>
          <input type="text" placeholder="   搜尋關鍵字" v-model.trim="search">
        </div>
        <div class="News-viewport">
          <ul>
            <li>
              <article class="Article-with-picture">

                <div class="News-text">
                  <div class="title">
                    <h4>2024春季優惠開跑中</h4>
                    <p class="tinyp">2024/1/24</p>
                  </div>
                  <p>探險春季，NORA Camp誠摯邀請您攜帶心愛的寵物一同感受大自然的懷抱！
                    透過我們獨家的「春季寵物露營樂享包」優惠，
                    獲得精心準備的狗狗貓貓歡迎禮 包，內含美味零食、趣味玩具及特別的寵物地圖。
                    優惠僅限春季特定日期，請提前預訂，確保您和寵物共享這春之樂。期待您們一家人一起加入NORA Camp的大家庭，享受春日露營的美好時光！
                  </p>
                </div>

                <div id="News-img">
                  <div class="large-images">
                    <div id="News-large-image">
                      <img src="@/assets/image/homeView/Camping_dog_lake.jpg" alt="消息圖片">
                    </div>
                  </div>

                  <div class="images-row">
                    <div id="News-small-image">
                      <img src="@/assets/image/homeView/Camping_dog_lake.jpg" alt="消息圖片">
                    </div>
                    <div id="News-small-image">
                      <img src="@/assets/image/homeView/Camping_dog_lake.jpg" alt="消息圖片">
                    </div>
                    <div id="News-small-image">
                      <img src="@/assets/image/homeView/Camping_dog_lake.jpg" alt="消息圖片">
                    </div>
                  </div>

                </div>

              </article>
            </li>
            <li>
              <article class="Article-onlytext">

                <div class="News-text">
                  <div class="title">
                    <h4>營地設備維修公告</h4>
                    <p class="tinyp">2024/1/10</p>
                  </div>
                  <p>為提供更良好的露營體驗，我們即將進行狗狗專屬營區烤肉區設備的定期維修。維修時間為下週二上午9時至下午3時。在此期間，狗狗專屬營區的烤肉區域將無法使用。請見諒造成的不便。
                    
                    我們將盡快完成維修，以確保您和您的毛小孩在安全和愉快的環境中度過美好的露營時光。在維修期間，為確保您的安全，請勿進入烤肉區域。如有任何緊急需要使用烤肉設備的情況，請聯繫我們的服務人員，我們將協助您找到合適的解決辦法。
                    感謝您的理解和支持。期待在維修完成後，為您呈獻一個更舒適、更便利的露營環境。如有任何疑問或需要進一步協助，請隨時與我們聯絡。

                  </p>
                </div>

              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="New-products bg-blue-2">
      <h2>野良選物X最新商品</h2>
      <div class="product-container">
        <ul>
          <li>
            <productCard />
          </li>
        </ul>
      </div>
      <viewMoreBtn :content="'逛逛其他好物'" />
    </section>

    <section class="Stray-home">

      <div class="Stray-home-content">
        <div class="SH-text">
          <h2>野良之家</h2>
          <img class="paw1" src="@/assets/image/campGuide/paw.svg" alt="動物腳掌1">
          <p>
            野良露營也是流浪動物的中途之家。
            我們致力於照顧、
            庇護和尋找新的家園給需要幫助的流浪動物
            我們提供免費的志工活動，
            一同為這些可愛的生命奉獻愛心。
            志工活動包括洗狗、打掃籠舍、餵食等，
            讓你有機會親身參與流浪動物的照顧，
            同時建立起與這些可愛生物的深厚連結。
          </p>
          <div class="SH-btn">
            <viewMoreBtn class="SH-btn1" :content="'了解更多'" />
            <actionBtn :content="'報名志工活動'" />
          </div>
        </div>
      </div>

      <div class="SH-tent-container">
        <img src="@/assets/image/homeView/Tent_with_ground.png" alt="帳篷框">

      </div>


      <div class="Stray-home-background">
        <img src="@/assets/image/homeView/Stray_home_bg.png" alt="野良之家背景">
        <div class="The-ground"></div>
      </div>
    </section>
  </main>
</template>


<style lang="scss" scoped>
@import'@/assets/sass/page/homeView.scss';
</style>
