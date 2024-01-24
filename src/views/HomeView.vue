<script>
// 引入函式庫
import axios from 'axios';
import actionBtn from '@/components/button/actionBtn.vue';
import viewMoreBtn from '@/components/button/viewMoreBtn.vue';

export default {
  components: {
    actionBtn,
    viewMoreBtn,
  },
  data() {
    return {
      things: [
        { src: 'camp_tent_maru' },
        { src: 'camp_tent' },
        { src: 'cat_koubakozuwari_gray' },
        { src: 'cat_kuroashineko' },
        { src: 'dog_akitainu' },
        { src: 'dog_corgi_tricolor' },
        { src: 'kagu_camp_chair' },
        { src: 'neko_ushiro' },
        { src: 'takibi' },
        { src: 'youkai_jinmenken' },
      ],
      weathers: [
        { src: 'hare' },
        { src: 'hare_kumori.png' },
        { src: 'kumori_ame.png' },
        { src: 'kumori.png' },
      ],
      search: '',
    };
  },
  methods: {
    getImageUrl(paths) {
      return new URL(
        `../assets/image/homeView/movingThings/${paths}`,
        import.meta.url,
      ).href;
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
      deep: true,
    },
  },
};
</script>

<template>
  <div class="Homepage-wrap">
    <div class="Homepage-banner bg-blue-2">
      <div class="banner-text">
        <h1>
          願那些流浪，<br />
          只是體驗而已。<br />
          走吧，去露營！
        </h1>
        <actionBtn class="Reserve-Now" :content="'立即預約'" />
      </div>
      <div class="things-Moving">
        <img v-for="picsrc in things" :src="getImageUrl(`${picsrc.src}.png`)" />
      </div>
    </div>

    <div class="Knowing-nora">
      <div class="KN-content">
        <h4>認識野良</h4>
        <p>
          "野良" 這一詞在日文中指流浪動物，
          我們將這一概念融入露營體驗中，創造出一個充滿活力和溫馨的環境。
          在這裡，露營者可以根據自己的喜好選擇狗派或貓派，
          從而決定所需的露營道具和行程安排。
          野良露營致力於為露營愛好者提供一個獨特且充滿愛心的露營體驗，
          不僅讓人們更接近大自然，也讓流浪動物得到關愛和新家。
          我們期待創造出一個既有趣又有意義的露營文化 。
        </p>
        <div class="img-contanier">
          <img src="@/assets/image/homeView/knowingnora-pic.jpg" />
        </div>
        <div class="Weather-box bg-blue-2">
          <h4>營地目前天氣</h4>
          <img src="" />
          <p>天氣</p>
          <div id="weatherMark"></div>
          <p>溫度</p>
          <div id="weatherTemperature"></div>
        </div>
      </div>
    </div>
    <div class="News bg-blue-3">
      <div class="News-withsearch">
        <h2>最新消息</h2>
        <input type="text" v-model.trim="search" />
      </div>
      <div class="News-container white01">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div class="New-products bg-blue-2">
      <h2>野良選物X最新商品</h2>
      <div class="product-container"></div>
      <viewMoreBtn :content="'逛逛其他好物'" />
    </div>
    <div class="stray-home">
      <h2>野良之家</h2>
    </div>
  </div>
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
  display: block;
  height: 100%;
  margin: 20px;

  .KN-content {
    text-align: center;
    margin: 20px 0;
  }

  .img-contanier {
    width: 90%;
    margin: 20px auto;
    height: 400px;
    background-color: $blue-1;
    object-fit: cover;
    overflow: hidden;
  }

  .img-contanier img {
    object-position: 50% 50%;
    // display: none;
    height: 100%;
  }

  .Weather-box {
    text-align: center;
    width: 70%;
    margin: 20px auto;
    height: 300px;
    border-radius: 30px;
  }
}

.News {
  height: 700px;

  .News-container {
    height: 500px;
    width: 90%;
    background-color: #fff;
  }
}

.New-products {
  height: 700px;
}

.stray-home {
  height: 700px;
  background-color: #aaa;
}
</style>
