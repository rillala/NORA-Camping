<script>
// 引入函式庫
import axios from 'axios';
import actionBtn from '@/components/button/actionBtn.vue'
import viewMoreBtn from '@/components/button/viewMoreBtn.vue'

export default {
  components: {
    actionBtn,
    viewMoreBtn,
  },
  data() {
    return {
      things: [
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
    getThingUrl(paths) {
      return new URL(`../assets/image/homeView/movingThings/${paths}`, import.meta.url).href
    },
    getweatherUrl(paths) {
      return new URL(`../assets/image/homeView/weatherMark/${paths}`, import.meta.url).href
    },

  },
  watch: {
    search(newSearch, oldSearch) {
      // console.log(this.search);
      // console.log('new:' + newSearch);
      // console.log('old:' + oldSearch);
    },
    responseData: {
      handler(newcData) {
        console.log(newcData.length);
      },
      //如果畫面一開始就要監聽設定成true
      // immediate: true
      //如果監聽陣列或物件用設定成true
      deep: true
    }
  }
};
</script>

<template>
  <main>
    <section class="Homepage-banner bg-blue-2">
      <div class="banner-text">
        <h1>
          願那些流浪，<br />
          只是體驗而已。<br />
          走吧，去露營！
        </h1>
        <actionBtn class="Reserve-Now" :content="'立即預約'" />
      </div>
      <div class="things-Moving">
        <img v-for="picsrc in things" :src="getThingUrl(`${picsrc.src}.png`)" />
      </div>
    </section>

    <section class="Knowing-nora">

      <div class="KN-mountain-background">
        <img src="@/assets/image/homeView/mountainBgL.png" class="Mountain-left">
        <img src="@/assets/image/homeView/mountainBgR.png" class="Mountain-right">
      </div>

      <div class="KN-content">
        <div class="KN-text">
          <h3>認識野良</h3>
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
      <div class="News-withsearch">
        <h2>最新消息</h2>
        <input type="text" v-model.trim="search">
      </div>
      <div class="News-container">
        <ul>
          <!-- 這邊要把清單for出來 -->
          <li>
            <article>
              <h3>標題</h3>
              <p>文章</p>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <section class="New-products bg-blue-2">
      <h2>野良選物X最新商品</h2>
      <div class="product-container">
      </div>
      <viewMoreBtn :content="'逛逛其他好物'" />
    </section>

    <section class="stray-home">
      <h2>野良之家</h2>
      <div class="stray-home-context">
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
      </div>
      <viewMoreBtn :content="'了解更多'" />
      <actionBtn :content="'報名志工活動'" />
    </section>
  </main>
</template>


<style lang="scss" scoped>
.Homepage-banner {
  height: 700px;

  .banner-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 700px;
    position: relative;
    z-index: 3;
  }

  .things-Moving {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 180px;
    width: 40%;
    height: 700px;
    overflow: hidden;
    z-index: 1;

    @include tablet {
      flex-direction: row;
      left: 0;
      top: 480px;
      width: 100%;
      height: 200px;
    }
  }

  .things-Moving img {
    filter: grayscale(100%);
    width: 100%;
    margin: 30px 0;

    @include tablet {
      width: 50%;
      margin: 0 30px;
    }
  }
}

.Knowing-nora {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.KN-mountain-background {
  display: flex;
  flex-direction: row;
  align-items: end;
  height: 100%;
  width: 110%;
  min-width: 600px;
  justify-content: space-between;
  position: absolute;
  z-index: -100;
  margin: 0 auto;

  img {
    height: 400px;
    width: 300px;
  }
}

.KN-content {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include desktop {
    flex-direction: row;
    align-items: center;
    margin: 50px 0;
  }
}

.KN-text {
  padding: 30px 0;
  text-align: center;

  h3 {
    padding: 30px 0;
    font-weight: bold;
  }

  p {
    line-height: 180%;
    font-size: 20px;
  }

  @include desktop {
    text-align: start;
    margin: 0 50px;
  }
}

.KN-img-contanier {
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 15px;

  img {
    height: 300px;
    width: 75%;
    border-radius: 30px;
    object-fit: cover;
    object-position: center;

    @include desktop {
      height: 300px;
      width: 100%;
    }
  }
}

.KN-weather-box {
  min-width: 200px;
  width: 50%;
  padding: 50px 0;
  margin: 50px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include fade-in(#d5faff, 0.7);

  span {
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
  }

  @include desktop {
    flex-direction: row;

    span {
      font-size: 30px;
    }
  }
}

#Weather {
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
}

#AirTemperature {
  font-size: 30px;
  font-weight: bold;
}

.News {
  height: 700px;
}

.News-withsearch {
  display: flex;
  justify-content: center;
  gap: 25px;

  h2 {
    color: $white01;
  }
}

.News-container {
  border: 1px solid red;
}

.New-products {
  height: 700px;
}

.stray-home {
  height: 700px;
  background-color: #aaa;
}
</style>
